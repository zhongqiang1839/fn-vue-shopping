import {config} from '../config/config';

let cookie = {
    cookiePrefix : 'th5_',
    cookieIOSPrefix:'ios_',
  siteIdArray : {
    '1' : 'CS000016-0-0-0',//上海
    '2' : 'CS000018-0-0-0',//江苏
    '3' : 'CS000019-0-0-0',//浙江
    '4' : 'CS000017-0-0-0',//安徽
    '5'  :  'CS000020-0-0-0',//山东省
    '6'  :  'CS000004-0-0-0',//山西省
    '7'  :  'CS000026-0-0-0',//广东省
    '8'  :  'CS000027-0-0-0',//广西壮族自治区
    '9'  :  'CS000028-0-0-0',//云南省
    '10'  :  'CS000021-0-0-0',//内蒙古自治区东(东西之分，CS000032西)
    '11'  :  'CS000022-0-0-0',//天津市
    '12'  :  'CS000023-0-0-0',//北京市
    '13'  :  'CS000005-0-0-0',//四川省
    '14'  :  'CS000006-0-0-0',//宁夏回族自治区
    '15'  :  'CS000007-0-0-0',//甘肃省
    '16'  :  'CS000001-0-0-0',//吉林省
    '17'  :  'CS000008-0-0-0',//江西省
    '18'  :  'CS000009-0-0-0',//西藏自治区
    '19'  :  'CS000024-0-0-0',//河北省
    '20'  :  'CS000025-0-0-0',//河南省
    '21'  :  'CS000010-0-0-0',//青海省
    '22'  :  'CS000011-0-0-0',//重庆市
    '23'  :  'CS000012-0-0-0',//陕西省
    '24'  :  'CS000030-0-0-0',//海南省
    '25'  :  'CS000013-0-0-0',//湖北省
    '26'  :  'CS000014-0-0-0',//湖南省
    '27'  :  'CS000003-0-0-0',//黑龙江省
    '28'  :  'CS000015-0-0-0',//新疆维吾尔自治区
    '29'  :  'CS000031-0-0-0',//福建省
    '30'  :  'CS000029-0-0-0',//贵州省
    '31'  :  'CS000002-0-0-0',//辽宁省
    '32'  :  'CS000032-0-0-0'//内蒙古自治区西
  },

  get: function (name) {
    var g = new RegExp("(^|;|\\s+)" + name + "=([^;]*)(;|$)",'g');
    var a = document.cookie.match(g)
    if(window.iosCookie && !a) {
      a = window.iosCookie.match(g);
    }
    var r = new RegExp("(^|;|\\s+)" + name + "=([^;]*)(;|$)");
    if(a && a.length > 1){
      var m = a[a.length -1];
      m = m.match(r);
    }else{
      m = document.cookie.match(r);
      if(window.iosCookie && !m) {
        m = window.iosCookie.match(r);
      }
    }
    var val = (!m ? "" : decodeURIComponent(m[2]));

    //四级市上线暂时性需求
    if(name == "th5_siteid"){
      if(val.match(/^\d+$/)){
        val = this.siteIdArray[val] || val;
      }
      if((val || "---").indexOf("---") > -1){
        val = this.siteIdArray['1'];
        this.addH5('siteid', val, '/', 86400 * 365, $.config.cookieDomain);
        this.addH5('sitename', '上海', '/', 86400 * 365, $.config.cookieDomain);
      }
    }

    return val;
  },
  getH5 : function(name) {
    var value = this.get(this.cookieIOSPrefix + '' + name);
    if(!value){
      value = this.get(this.cookiePrefix + '' + name);
    }

    if( name == 'islogin' && value == '1' ){
      //return $.checkLoginCookie();
    } else {
      return value;
    }
  },
  add : function(name, v, path, expire, domain, isTimePoint) {
    var s = name + "=" + encodeURIComponent(v) + "; path=" + (path || '/') // 默认根目录
      + (domain ? ("; domain=" + domain) : '');
    if (isTimePoint) {
      s += ";expires=" + expire;
    } else if (expire > 0) {
      var d = new Date();
      d.setTime(d.getTime() + expire * 1000);
      s += ";expires=" + d.toGMTString();
    }
    document.cookie = s;
  },
  addH5 : function(name, v, path, expire, domain, isTimePoint) {
    var osType = $.config.osType;
    this.add(this.cookiePrefix + '' + name, v, path, expire, domain, isTimePoint);

    /*种localstorage,区分安卓和ios前缀*/
    window.localStorage && window.localStorage.setItem(name, v);

    /*如果是IOS设备访问,同时要更新IOS前缀的cookie*/
    if(osType == '2'){
      this.add(this.cookieIOSPrefix + '' + name, v, path, expire, domain, isTimePoint);
      window.localStorage && window.localStorage.setItem(name, v);
    }

    if( name == 'islogin' ){
      if( v == '1' ){
        this.add(this.cookiePrefix + 'loginEnv', $.config.environment, path, expire, domain);
      } else {
        this.delH5('loginEnv');
      }
    }
  },
  del : function(name, path, domain) {
    if (arguments.length == 2) {
      domain = path;
      path = "/"
    }
    document.cookie = name + "=;path=" + path + ";" + (domain ? ("domain=" + domain + ";") : '') + "expires=Thu, 01-Jan-70 00:00:01 GMT";
  },
  delH5 : function(name, path, domain) {
    this.del(this.cookiePrefix + '' + name, path, domain);
  }
}

export default cookie;
