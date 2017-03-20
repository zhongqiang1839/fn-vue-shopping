// https://github.com/shelljs/shelljs
require('./check-versions')()
require('shelljs/global')

var path = require('path')
var config = require('../config')
var ora = require('ora')
var webpack = require('webpack')

var fs = require('hexo-fs');
var chalk = require('chalk');
var swig = require('swig');
var moment = require('moment');
var spawn = require('../deploy/spawn');


var swigHelpers = {
  now: function(format) {
    return moment().format(format);
  }
};


var pushGithub = function(args) {

  var deploy_dir = path.join(__dirname, '../deploy_git');
  var dist_dir = path.join(__dirname, '../dist');

  var message = commitMessage(args);
  var verbose = true;

  if (!config.deploy.repository) {
  	var help = '';

  	help += 'You have to configure the deployment settings in  config/index.js first!\n\n';
  	help += 'Example:\n';
  	help += '  deploy:\n';
  	help += '    repository: https://github.com/zhongqiang1839/zhongqiang1839.github.io.git\n';
  	help += '    repo: <repository url>\n';
  	help += '    branch: [master]\n';
  	help += '    message: [message]\n\n';

  	console.log(help);
  	return;
  }

  function git() {

    var len = arguments.length;
    var args = new Array(len);

    for (var i = 0; i < len; i++) {
      args[i] = arguments[i];
    }

    return spawn('git', args, {
      cwd: deploy_dir,
      verbose: verbose
    });

  }

  function setup() {
    var userName = config.deploy.branch;
    var userEmail = config.deploy.email;

    // Create a placeholder for the first commit
    return fs.writeFile(path.join(deploy_dir, 'placeholder'), '').then(function() {
      return git('init');
    }).then(function() {
      return userName && git('config', 'user.name', userName);
    }).then(function() {
      return userEmail && git('config', 'user.email', userEmail);
    }).then(function() {
      return git('add', '-A');
    }).then(function() {
      return git('commit', '-m', 'First commit');
    });
  }

  function push(repo) {
    return git('add', '-A').then(function() {
      return git('commit', '-m', message).catch(function() {
        // Do nothing. It's OK if nothing to commit.
      });
    }).then(function() {
      return git('push', '-u', repo.url, 'HEAD:' + repo.branch, '--force');
    });
  }

  return fs.exists(deploy_dir).then(function(exist) {
    if (exist) return;

    console.log('Setting up Git deployment...');
    return setup();
  }).then(function() {
    console.log('Clearing .deploy_git folder...');
    return fs.emptyDir(deploy_dir);
  }).then(function() {
    console.log('Copying files from public folder...');
    return fs.copyDir(dist_dir, deploy_dir);
  }).then(function() {
    return [{
      url: config.deploy.repository,
      branch: config.deploy.branch
    }];
  }).each(function(repo) {
    return push(repo);
  });
};

function commitMessage() {
  var message = 'Site updated: {{ now(\'YYYY-MM-DD HH:mm:ss\') }}';
  return swig.compile(message)(swigHelpers);
}

pushGithub();
