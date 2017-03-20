/**
 * 判断浏览器是否支持localStorage
 * @return {Boolean} [description]
 */
function isLocalStorageSupported() {
    var storage = window.localStorage;
    try {
        storage.setItem('testKey', 'testValue');
        storage.removeItem('testKey');
        return true;
    } catch (error) {
        return false;
    }
}

/**
 * 判断浏览器是否支持sessionStorage
 * @return {Boolean} [description]
 */
function isSessionStorageSupported() {
    var storage = window.sessionStorage;
    try {
        storage.setItem('testKey', 'testValue');
        storage.removeItem('testKey');
        return true;
    } catch (error) {
        return false;
    }
}


/**
 * 检测场景、操作系统、浏览器
 * @return {obj} [description]
 */
function detectUa () {
    var _ua = navigator.userAgent.toLowerCase(),
        _scene = 9,                //场景
        _os = 9,                   //操作系统
        _browser = 9,              //浏览器: 默认9:其他浏览器
        _browsername = 'other',    //浏览器名字
        _version,                  //浏览器版本号
        _core;                     //内核

    /**
     * 区分场景： 1:iphone浏览器, 2:android浏览器, 3:weixin, 4: iPhone app内，5: android app内, 6:iPad, 7:ipod 9:其他
     */
    if (_ua.match(/MicroMessenger/i) == 'micromessenger') {
        _scene = 3;//微信
    } else if (_ua.indexOf('feiniuapp') > -1) {
        var userAgent = _ua.split(' ');
        for (var i = 0; i < userAgent.length; i++) {
            if (userAgent[i].indexOf('feiniuapp') > -1) {
                var yixunAgent = userAgent[i].split('/');
                var agent = yixunAgent[1].toLowerCase();
                if (agent == 'android') {
                    _scene = 5;//android APP
                } else if (agent == 'iphone') {
                    _scene = 4;//iphone APP
                }
            }
        }
    } else {

        if ($.os.ipad) {
            _scene = 6; //ipad
        } else if ($.os.ipod){
            _scene = 7; //ipod
        } else if ($.os.ios) {
            _scene = 1;
        } else if ($.os.android) {
            _scene = 2;
        } else {
            _scene = 9;
        }
    }
    //以下代码不知道有什么用，暂时先保留
    // else if ($.url.getParam('osType') && $.url.getParam('osType') != '') {
    //     if (_ua.match(/MicroMessenger/i) == 'micromessenger') {
    //         //微信
    //         _scene = 3;
    //     }
    //     return $.url.getParam('osType');
    // }


    /**
     * 区分操作系统：1:ios，2：android，3:windows phone, 4：webos，5：blackberry，6：bb10,7：rimtbletos,9:other
     */
    var _osName = [null, 'ios', 'android', 'wp', 'webos', 'blackberry', 'bb10', 'rimtabletos', null, 'other'];
    var wp = _ua.indexOf("Windows Phone") > -1;
    if(wp) {
        _os = 3;
    } else if ($.os.ios) {
        _os = 1;
    } else if($.os.android) {
        _os = 2;
    } else if ($.os.webos) {
        _os = 4;
    } else if ($.os.blackberry) {
        _os = 5;
    } else if ($.os.bb10) {
        _os = 6;
    } else if ($.os.rimtabletos) {
        _os = 7;
    } else {
        _os = 9;
    }

    /**
     * 区分浏览器代号_broswer、版本号_version及名称_broswername
     */
    var regObj = { //次序不可调整，从特例浏览器到普遍的safari
        baidu: ['baidubrowser\\/([\\d.]+)'],
        twothree: ['2345browser\\/([\\d.]+)'],
        qq: ['qqbrowser\\/([\\d.]+)'],
        uc: ['ucbrowser\\/([\\d.]+)'],
        sogou: ['sogou.*\\/([\\d.]+)'],
        ie: ['msie ([\\d.]+)'],
        firefox: ['firefox\\/([\\d.]+)', 'fxios\\/([\\d.]+)'],
        chrome: ['chrome\\/([\\d.]+)', 'crios\\/([\\d.]+)'],
        safari: ['version\\/(\\d\\.?\\d+.?)mobile.+safari']
    }
    var browerIndex = { //浏览器代号_browser: 如下（备注：默认9代表其他浏览器）
        safari: 1,
        chrome: 2,
        firefox: 3,
        ie: 5,
        qq: 6,
        twothree: 7,
        baidu: 8,
        uc:10,
        sogou: 11
    }
    $.each(regObj, function(index, value) {
        $.each(value, function(k, v) {
            var regEx = new RegExp(v, 'gi');
            // alert(regEx);
            var res = regEx.exec(_ua);
            // alert(res)
            if (res) {
                _browser = browerIndex[index];
                _browsername = index;
                _version = res[1];
                return false;
            }
        });
        if (_browser != 9) {//已经匹配到相应的浏览器，则跳出循环
            return false;
        }
    })

    /**
     * 检测浏览器内核:1:safari 2:chrome 3:firefox 4:webview 5:ie
     */
    if ($.browser.safari) {
        _core = 1;
    } else if ($.browser.chrome) {
        _core = 2;
    } else if ($.browser.firefox) {
        _core = 3;
    } else if ($.browser.webview) {
        _core = 4;
    } else if ($.browser.ie) {
        _core = 5;
    }

    return {
        ua: _ua,
        os: _os,                     //浏览器操作系统:1:ios，2：android，3:windows phone, 4：webos，5：blackberry，6：bb10,7：rimtbletos,9:other
        osname: _osName[_os],
        broswer: _browser,
        browser: _browser,           //browerIndex中浏览器对应的数字，如1表示safari
        browsername: _browsername,   //browerIndex中浏览器的名称，如safari
        version: _version,           //浏览器版本号
        scene: _scene,               //场景:1:iphone浏览器, 2:android浏览器, 3:weixin, 4: iPhone app内，5: android app内, 6:iPad, 7:ipod 9:其他
        core: _core                  //浏览器内核:1:safari 2:chrome 3:firefox 4:webview 5:ie
    };
}

export default function _init(){
    var ret = {};
    return $.extend(true, ret, {detectUa: detectUa(), isLocalStorageSupported: isLocalStorageSupported(), isSessionStorageSupported: isSessionStorageSupported()});
}
