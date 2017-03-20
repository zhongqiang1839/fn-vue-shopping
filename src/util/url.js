function Url(url) {
    this._fields = {
        'URL': 0,
        'OriginUrl': 1,
        'Protocol': 3,
        'Username': 5,
        'Password': 6,
        'Host': 7,
        'Port': 8,
        'Pathname': 9,
        'Querystring': 10,
        'Fragment': 11
    };
    this._values = {};
    this._regex = null;
    this._regex = /^(((\w+):\/\/)?((\w+):?(\w+)?@)?([^\/\?:]+):?(\d+)?(\/?[^\?#]+)?)\??([^#]+)?#?(\w*)/;
    this._directUrl = {
        _values: {}
    };
    this.options = {};
    this.ssName = {
        prevUrlOptions: 'prevUrlOptions',
        '1': 'shopping'
    };
    /* 注册获取每个获取this._values中的属性的方法 */
    for ( var f in this._fields) {
        this['get' + f] = this._makeGetter(f);
    }
    /* 分解URL赋值给this._values */
    this._parse(url);

}
Url.prototype = {
    /**
     * 解析url, 把url的各部分以及协议等信息以对象形式给this._values
     */
    _parse: function(url, opts){
        var _values = this.parseUrl(url);
        this.url = url;
        return this._values = this.href = _values;//抛出对象$.url.href
    },

    /**
     * 分解queryString返回键值对
     * @param queryString
     * @returns {{}}
     * @private
     */
    _splitQuerystring: function(queryString){
        var params = {};
        if (queryString && queryString.length) {

            var arr = queryString.split('&');
            for (var i = 0; i < arr.length; i++) {
                var data = arr[i].split('=');
                var key = data[0];
                var value = data[1];

                if(data.length >2){
                    data.shift();
                    value = data.join('=');
                }

                value = decodeURI(value);

                if (key in params) {
                    if (this.isArray(params[key])) {
                        //
                    } else {
                        var old = params[key];
                        params[key] = [];
                        params[key].push(old);
                    }
                    params[key].push(value);
                } else {
                    params[key] = value;
                }
            }
        }

        return params;

    },
    /**
     * 分解URL各部分,返回对象
     * @param url
     * @param config
     * @returns {{}}
     */
    parseUrl : function(url, config) {
        var defaultConfig = {
            ignoreParam: false
        }
        var config = $.extend(defaultConfig, config);
        var _values = {};
        for ( var f in this._fields ) {
            _values[f] = '';
        }

        var r = this._regex.exec(url);

        if (!r) {
            throw "URLParser::_parse -> Invalid URL"
        }

        for ( var f in this._fields ) {
            if (typeof r[this._fields[f]] != 'undefined') {
                _values[f] = r[this._fields[f]];
            }
        }

        /* Querystring以键值对的形式给到this._values.Params */
        if (!config.ignoreParam) {
            _values.Params = this._splitQuerystring(_values['Querystring']);
        }
        return _values;
    },


    _makeGetter : function(field, isDirect) {
        this.refresh();
        return !isDirect ? function() {
            return this._values[field];
        }:function() {
            return this._directUrl._values[field];
        }
    },


    /**
     * 返回URL中的get参数值
     * @param key
     * @returns {*}
     */
    getParam : function(key) {
        this.refresh();
        var re = this.getParamObject(key);
        //抛出prevUrlOptions对象
        var ssKeyTwo = this._values.Params['prevUrlOptions'];
        if (ssKeyTwo == 'prevUrlOptions') {//从sessionStorage中取值
            this.prevUrlOptions = $.parseJSON(sessionStorage.getItem(ssKeyTwo));
        } else {//直接从url中取值
            this.prevUrlOptions = $.parseJSON(this._values.Params['prevUrlOptions']);
        }
        return this.isArray(re) ? re[re.length - 1] : re;
    },

    getParamObject : function(key) {
        this.refresh();
        var ssKey = this._values.Params['ssKey'],
            queryString = '';
        if (ssKey) {//使用sessionStorage中的参数
            queryString = sessionStorage.getItem(ssKey);
            $.extend(this._values.Params, this._splitQuerystring(queryString));
        }


        if (this._values.Params) {
            return this._values.Params[key] ? (this.isArray(this._values.Params[key]) ? this._values.Params[key].map(function(o) {
                return decodeURIComponent(o);
            }) : decodeURIComponent(this._values.Params[key])) : this._values.Params[key];
        }
        return null;
    },

    /**
     * 在指定URL中添加get参数(参数支持字符串或者键值对形式的对象), 返回url
     * @param url
     * @param kvObj
     * @returns {string}
     */
    addParam : function(url, kvObj){
        var _values = this.parseUrl(url, {ignoreParam:true}),
            divider = _values['Querystring'] ? '&' : '?';
        console.log(_values);
        return this.addParamObject(kvObj) ? url + divider + this.addParamObject(kvObj) : url;
    },


    addParamObject : function(kvObj) {
        var querystring = '';
        $.each(kvObj, function(k,v) {
            if (!$.isEmptyObject(v) || $.type(v)=== 'number') {
                if (querystring) { querystring += '&';}
                if ($.isPlainObject(v)) {v = JSON.stringify(v);}
                querystring += k + '=' + v;
            }
        });
        return querystring;
    },

    /**
     * by Nick
     * 替换myUrl中的同名参数值
     * replaceUrlParams(url, { "oldareacode": oldAreaCode, "newSmSeq": productDetail.smSeq });
     */
    replaceUrlParams: function (url, newParams) {
        var values = this.parseUrl(url, {ignoreParam: false});

        for (var x in newParams) {
            var hasInMyUrlParams = false;
            for (var y in values) {
                if (x.toLowerCase() == y.toLowerCase()) {
                    values[y] = newParams[x];
                    hasInMyUrlParams = true;
                    break;
                }
            }
            //原来没有的参数则追加
            if (!hasInMyUrlParams) {
                values.Params[x] = newParams[x];
            }
        }
        var _result = values.OriginUrl + "?";

        for (var p in values.Params) {
            _result += (p + "=" + values.Params[p] + "&");
        }

        if (_result.substr(_result.length - 1) == "&") {
            _result = _result.substr(0, _result.length - 1);
        }


        if (!$.isNull(values.Fragment)) {
            _result += "#" + values.Fragment;
        }
        return _result;
    },

    /**
     * by Nick
     * 删除myUrl中的同名参数值
     * rmUrlParams(url, {"oldareacode", "newSmSeq"});
     */
     rmUrlParams: function (url, newParams) {
        Array.prototype.indexOf = function(val) {
            for (var i = 0; i < this.length; i++) {
                if (this[i] == val) return i;
            }
            return -1;
        };

        var values = this.parseUrl(url, {ignoreParam: false}),
            flag = false;
        for (var i = 0, a; a = newParams[i++];) {
            for (var y in values.Params) {
                if (a.toLowerCase() == y.toLowerCase()) {
                    delete values.Params[y];
                    flag = true;
                }
            }
        }

        if(!flag){
            return location.href;
        }

        var _result = values.OriginUrl + "?";

        for (var p in values.Params) {
            _result += (p + "=" + values.Params[p] + "&");
        }

        if (_result.substr(_result.length - 1) == "&") {
            _result = _result.substr(0, _result.length - 1);
        }


        if (!$.isNull(values.Fragment)) {
            _result += "#" + values.Fragment;
        }
        return _result;
    },

    /**
     * 返回URL 的锚部分
     * @returns {*}
     */
    getHash : function() {
        this.refresh();
        return location.hash;
    },


    setHash : function(hash) {
        this.refresh();
        if (("pushState" in history) && (hash == '' || hash == null || (hash.length && hash.trim() == ''))) {
            history.pushState('', document.title, location.pathname + location.search);
        } else {
            location.hash = hash;
        }
    },


    replaceHash : function(hash) {
        this.refresh();
        if ("replaceState" in history) {
            history.replaceState('', document.title, location.pathname + location.search + (hash == '' ? '' : '#' + hash));
        } else {
            location.hash = hash;
        }
    },

    /**
     * 返回当前域名
     * @returns {string}
     */
    getDomainUrl : function() {
        this.refresh();
        return this.getProtocol() + "://" + this.getHost();
    },

    /**
     * 返回当前域名尾部带/
     * @returns {string}
     */
    getTouchBaseUrl : function() {
        this.refresh();
        return this.getDomainUrl() + '/';
    },

    refresh : function() {
        if (this.url != location.href) {
            this._parse(location.href);
        }
    },

    /**
     * 刷新当前页
     */
    reload: function(){
        location.reload();
    },

    /**
     * 跳转到指定URL
     * @param url
     */
    redirect : function(url) {
        var _redirect = function(){
            //剔除掉跳转目标url中查询字符串prevUrlOptions字段
            var filterQueryString = ['prevUrlOptions'];
            $.each(filterQueryString, function(k, v) {
                var filterReg = new RegExp('(&?|\\??)' + v + '=\\w*', 'i');
                url = url.replace(filterReg,'');
            })

            //解析跳转目标url
            var _values = this.parseUrl(url);
            this._directUrl.url = url;
            this._directUrl._values = _values;

            //添加获取_directUrl._values各值的方法
            for ( var f in this._fields) {
                this['getDirect' + f] = this._makeGetter(f,1);
            }
            var ssKey = this.options && this.options['ssKey'];//在controller中设置$.url.options.ssKey = 1; 1代表购物流程
            //场景1：跳出触屏页面
            if ( (this._directUrl._values.Host.indexOf('beta1.fn') < 0) &&
                 (this._directUrl._values.Host.indexOf('m.feiniu.com') < 0) ) {
                location.href = url;
            //场景2：在触屏页面间跳转, 并且需要存储url中参数到sessionStorage，
            }else if (ssKey && $.cmpt.isSessionStorageSupported) {
                var paramStr = this.getDirectQuerystring();
                sessionStorage.setItem(this.ssName[ssKey], paramStr);
                var ssKeyUrl = this.addParam(this.getDirectOriginUrl(),{ssKey:this.ssName[ssKey]});
                location.href = this._jointOptionsUrl(ssKeyUrl);
            //场景3：在触屏页面间跳转，url中的参数原样传递，不存入sessionStorage中
            } else {
                location.href = this._jointOptionsUrl(url);
            }
        }
        if( window._deferRedirect ){
            window._deferRedirect.done($.proxy(_redirect, this));
        } else {
            _redirect.call(this);
        }
    },


    _jointOptionsUrl: function(url) {//在跳转目标url上拼接当前页面url的options配置
        if (!$.isEmptyObject(this.options)) {
            var prevUrlOptions = ''; //prevUrlOptions指以跳转目标url为基准的上一页面的$.url.options设置, 即跳转时当前页面的options设置

            if ($.cmpt.isSessionStorageSupported) {//一般都存入sessionStorage
                sessionStorage.setItem(this.ssName['prevUrlOptions'], JSON.stringify(this.options))
                prevUrlOptions = this.ssName['prevUrlOptions'];
            } else {//当做参数传递给下一个页面
                prevUrlOptions = this.options;
            }
            return this.addParam(url, {prevUrlOptions: prevUrlOptions});
        } else {
            //当前页面this.options为{}时，强制删除sessionStorage中prevUrlOptions的值
            try {
                sessionStorage.removeItem(this.ssName['prevUrlOptions']);
            }catch(e) {
                //
            }
            return url;
        }

    },


xss:function(str) {
  if (str == undefined || typeof str!='string') {
    return str;
  }
  str = str.replace(/</g, '&lt;').replace(/>/g, '&gt;');
  return str;
},

    /**
     * 返回a是否是数组
     * @param a
     * @returns {boolean}
     */
    isArray: function (a) {
        return /array/i.test(Object.prototype.toString.call(a));
    },

    /**
     * 返回a是否是对象
     * @param a
     * @returns {boolean}
     */
    isObject: function (a) {
        return /Object/.test(Object.prototype.toString.call(a));
    },

    /**
     * 判断字符串是否以http开头
     * @param str
     * @returns {boolean}
     */
    hasHttp: function(str){
        return (str.substr(0,7)=="http://")?true:false;
    }
}

/* 初始化对象,url为当前url */
var urlObj = new Url(location.href);
export default urlObj;

