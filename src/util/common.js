import url from "./url";
import cookie from "./cookie";
import {config} from "../config/config";
import * as token from "./token";
import getDeviceId from "./device";
import _init from "./checkCompatibility";


//系统公用配置
$.config = config;

//cookie 公用类
$.cookie = cookie;

// 获取浏览器兼容信息
$.cmpt = _init();

// URL 公用类
$.url = url;

//事件节流
$.throttle = function(fn, interval) {

  var doing = false;
  return function() {
    if (doing) { return; }
    doing = true;

    fn.apply(this, arguments);

    setTimeout(function() {
      doing = false;
    }, interval);
  };
};

// 如果不支持localStorage则用cookie替代
if ($.cmpt.isLocalStorageSupported) {
  $.localStorage = window.localStorage;
} else {
  $.localStorage = {};
  $.localStorage.setItem = $.cookie.add;
  $.localStorage.getItem = $.cookie.get;
  $.localStorage.removeItem = $.cookie.del;
}

if ($.cmpt.detectUa.browser == 6) {
  // QQ浏览器不支持sessionStorage
  $.cmpt.isSessionStorageSupported = false;
}

// 给html加上全局class以区分设备
$('html').addClass('device-' + $.cmpt.detectUa.osname);

/**
 * 检测基本数据类型和内置对象
 * @param o
 */
$.typeOf = function (o) {
  var _toString = Object.prototype.toString;

  var _type = {
    "undefined": "undefined",
    "number": "number",
    "boolean": "boolean",
    "string": "string",
    "[object Function]": "function",
    "[object RegExp]": "regexp",
    "[object Date]": "date",
    "[object Error]": "error"
  };
  return _type[typeof o] || _type[_toString.call(o)] || (o ? "object" : "null");
}
/**
 * 判断是否为空
 */
$.isNull = function(o) {
  return o == undefined || o == "undefined" || (o + '').indexOf("undefined") > -1 || o == null || o == '';
};

/**
 * 判断是否是空对象
 * @param e 对象
 * @returns {boolean}
 */
$.isEmptyObject = function (e) {
  var t;
  for (t in e)
    return !1;
  return !0
};

/**
 * jsonparse
 */
$.parseJSON = function (str) {
  try {
    return JSON.parse(str);
  } catch (e) {
    return (new Function('try{return ' + str + '}catch(e){return undefined}'))();
  }
};


$.checkLoginCookie = function() {
  // App下不检测登录环境
  if (config.osType == 1 || config.osType == 2 || config.osType == 9) {
    return 1;
  }
  var loginEnv = $.cookie.getH5('loginEnv');
  if ($.isNull(loginEnv)) {
    return 1;
  }
  if (loginEnv == 'preview' || loginEnv == 'online' || loginEnv == 'm' || config.environment == 'preview' || config.environment == 'online' || config.environment == 'm') {
    if (loginEnv == config.environment) {
      return 1;
    } else {
      var msg = '登录环境发生变化：已登录环境' + loginEnv + '，当前环境' + config.environment;
      console.warn(msg);
      window._checkLoginCookie_msg = msg;
      $.logOut();
      return 0;
    }
  } else {
    return 1;
  }
};
$.isWeixin = function() {
  //判断是否在微信内
  var ua = navigator.userAgent.toLowerCase();
  var isWeixin = ua.indexOf('micromessenger') != -1;
  return isWeixin;
}

$.logOut = function() {
  $.cookie.delH5("loginEnv", "/", config.cookieDomain);
  $.cookie.delH5("cartNum", "/", config.cookieDomain);
  $.cookie.delH5("islogin", "/", config.cookieDomain);
  $.cookie.delH5("islogin", "/", 'm.feiniu.com'); //用于容错，勿删
  $.cookie.delH5("username", "/", config.cookieDomain);
  $.cookie.delH5("username", "/", 'm.feiniu.com'); //用于容错，勿删
  $.cookie.delH5("mem_guid", "/", config.cookieDomain);
  $.cookie.delH5("mem_guid", "/", 'm.feiniu.com'); //用于容错，勿删
  $.cookie.delH5("accountType", "/", config.cookieDomain);
  $.cookie.delH5("accountType", "/", 'm.feiniu.com'); //用于容错，勿删
}
/**
 * 格式化日期
 * @param date
 * @param format
 * @returns {*}
 */
$.formatDate = function(date, format){
  var o = {
    "M+": date.getMonth() + 1, //月份
    "d+": date.getDate(), //日
    "h+": date.getHours(), //小时
    "m+": date.getMinutes(), //分
    "s+": date.getSeconds(), //秒
    "q+": Math.floor((date.getMonth() + 3) / 3) //季度
  };
  if (/(y+)/.test(format)) format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(format)) format = format.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return format;
}


//更新vvip状态
$.updateVvipStatus = function() {
  var expire = new Date();
  expire.setHours(24, 0, 0, 0); //设置过期时间为当天晚上24点
  var expireUTC = expire.toUTCString(); //cookie设置的时间为世界协调时间 (UTC)，北京时间比其快8小时
  $.cookie.addH5("update_vvipstatus", 1, "/", expireUTC, config.cookieDomain, 1);
}

$.localStorage = {
  getItem : function(key){
    if (typeof localStorage === 'object') {
      try {
        return JSON.parse(localStorage.getItem(key));
      } catch (e) {
        $.toast('本站无痕浏览模式,请关闭后再试!');
      }
    }
  },
  setItem : function(key,value){
    if (typeof localStorage === 'object') {
      try {
        return localStorage.setItem(key,JSON.stringify(value));
      } catch (e) {
        $.toast('请关闭[无痕浏览]模式后再试!');
      }
    }
  },
  removeItem : function(key){
    if (typeof localStorage === 'object') {
      try {
        return localStorage.removeItem(key);
      } catch (e) {
        $.toast('请关闭[无痕浏览]模式后再试!');
      }
    }
  },
  getUseSize : function(){
    if (typeof localStorage === 'object') {
      try {
        return JSON.stringify(localStorage).length;
      } catch (e) {
        $.toast('请关闭[无痕浏览]模式后再试!');
      }
    }
  }
};

$.merge = function() {
  if (arguments.length > 0) {
    var re = arguments[0];
    for (var i = 1; i < arguments.length; i++) {
      var o = arguments[i];
      for (var p in o) {
        if (o[p] != undefined) {
          re[p] = o[p];
        }
      }
    }
    return re;
  }
  return undefined;
};

$.getToken = function(successCallback, failCallback, isForce) {
  //todo 暂时去掉了  性能上报
  token.default.getToken(function(data) {
    if (data.errorCode == 0) {
      successCallback && successCallback();
    } else {
      if (typeof failCallback == 'function') {
        failCallback && failCallback(data);
      } else {
        $.toast('token获取失败,请检查您的网络！');
      }

    }
  }, isForce);
}

//设置device_id
window.device_id = $.cookie.getH5('device_id') || '';
if (!window.device_id) {
  window.device_id = getDeviceId();
  $.cookie.addH5('device_id', window.device_id, '/', 365 * 24 * 3600, config.cookieDomain);
}

/**
 * 设置 siteid  如果没有  默认上海
 * @type {*|string}
 */
window.siteid = $.cookie.getH5('siteid') || '';
if (!window.siteid) {
  $.cookie.addH5('siteid', "CS000016-0-0-0", '/', 365 * 24 * 3600, config.cookieDomain);
}


