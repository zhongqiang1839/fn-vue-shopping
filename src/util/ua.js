/**
 * 区分浏览器引擎、浏览器、操作系统等
 * returns {Object} 客户端浏览器引擎、浏览器、操作系统信息、场景
 */
var _scene = 9,//场景  iphone浏览器:1, android浏览器: 2,  weixin:3, iPhone app内4，android app内5, 其他:9
  _os = 9,	//操作系统 IOS:1, android:2, windowsPhone:3, 其他:9
  _broswer,//浏览器 safari:1, 其他:9
  _ua = navigator.userAgent;

//alert(_ua);
if (_ua.indexOf("Mobile") > -1 && window.screen.width < 800) {
//判断是否是手机
  if (_ua.indexOf("iPhone") > -1) {
    _scene = 1;
    _os = 1;
    if (/AppleWebKit\/(\S+)/.test(_ua)) {
      if (_ua.indexOf("iPad") > -1) {
        //iPad
        _scene = 9;
        _os = 9;
      }
      if (/Version\/(\S+)/.test(_ua) && /Safari\//.test(_ua)) {
        //safari
        _broswer = 1;
        if (/baidubrowser\/(\S+)/.test(_ua)) {
          //baidu
          _broswer = 9;
        }
      }
    }
  }
  else if (_ua.indexOf("iPod") > -1) {
    _scene = 9;
    _os = 9;
  }
  else if (_ua.indexOf("NokiaN") > -1) {
    _scene = 9;
    _os = 9;
  }
  else if (_ua.indexOf("Android") > -1 || _ua.indexOf("Linux") > -1) {
    _scene = 2;

    _os = 2;
  }
  else if (_ua.indexOf("Windows Phone") > -1) {
    _scene = 9;
    _os = 3;
  }

}

if (_ua.toLowerCase().match(/MicroMessenger/i) == 'micromessenger') {
  //是否在微信场景
  _scene = 3;
}


var os = {
  ua: _ua,
  os: _os,
  broswer: _broswer,
  scene: _scene
}

export default os;
