    let
        ts = 1000 * 60 * 60 * 24,
        xs = 1000 * 60 * 60,
        fz = 1000 * 60,
        hm = 1000,
		date_list = {}; // 缓存数据
    /**
     * [setTime 获取时间差]
     * @param {[时间格式]} start [开始时间]
     * @param {[(可为空)时间格式]} end   [结束时间]
     * @param {[(可为空)数值]} poor  [差(毫秒)]
     */
    export function setTime(start, end, poor) {
        var day,hour,min,sec,
        	m = 0,
            _key = start + '_' + end,
            _data = {
                day: '0', // 天
                hour: '00', // 小时
                min: '00', // 分钟
                sec: '00', // 秒
                base: 0 // 毫秒
            };
        /** [if 检查相对应‘毫秒差’是否已存在缓存中，不存在则获取数据并缓存] */
        if (!date_list[_key]) {
            if (typeof end === "undefined") {
                m = start * 1;
                if(!m && m!=0){
                    m = examine(start).getTime();
                }

            } else {
                m = examine(end).getTime() - examine(start).getTime(); // 日期时间格式
            }
            date_list[_key] = m;
        } else {
            m = date_list[_key];
        }
        // console.log(m)
        m = m - ((m >= 0 ? poor : -poor) || 0);
        _data.base = m;
        /** 开始计算 */
        m = Math.abs(m);
        if (m > 0) {
            day = (m / ts) >> 0,
            hour = ((m - day * ts) / xs) >> 0,
            min = ((m - day * ts - hour * xs) / fz) >> 0,
            sec = ((m - day * ts - hour * xs - min * fz) / hm) >> 0;

            _data.day = patchZero(day, _data.day.length);
            _data.hour = patchZero(hour, _data.hour.length);
            _data.min = patchZero(min, _data.min.length);
            _data.sec = patchZero(sec, _data.sec.length);

        }
        return _data;
    }

    /**
     * by Nick.Xia
     * [setTime2 获取时间差]
     * @param int leftTime
     * @param bool is_msec 是否是毫秒, 默认true
     * @param bool show_days 是否显示天, 默认true
     */
    export function setTime2(leftTime, is_msec, show_days) {

        if(is_msec === undefined) {
            is_msec = true;
        }
        if(show_days === undefined) {
            show_days = true;
        }
        if(is_msec === false) {
            //传递的leftTime 表示秒
            leftTime *= 1000;
        }
        let _data,day,hour,min,sec,
            m = Math.abs(leftTime || 0);
        /** 开始计算 */
        if(show_days) {
            _data = {
                day: '00', // 天
                hour: '00', // 小时
                min: '00', // 分钟
                sec: '00', // 秒
                base: m // 毫秒
            };
            day = (m / ts) >> 0,
            hour = ((m - day * ts) / xs) >> 0,
            min = ((m - day * ts - hour * xs) / fz) >> 0,
            sec = ((m - day * ts - hour * xs - min * fz) / hm) >> 0;

            _data.day = patchZero(day, _data.day.length);
            _data.hour = patchZero(hour, _data.hour.length);
            _data.min = patchZero(min, _data.min.length);
            _data.sec = patchZero(sec, _data.sec.length);
        } else {
            _data = {
                hour: '00', // 小时
                min: '00', // 分钟
                sec: '00', // 秒
                base: m // 毫秒
            };
            hour = (m / xs) >> 0,
            min = ((m - hour * xs) / fz) >> 0,
            sec = ((m - hour * xs - min * fz) / hm) >> 0;
            if(hour > 99) {
                _data.hour = 99;
                _data.min = 59;
                _data.sec = 59;
            } else {
                _data.hour = patchZero(hour, _data.hour.length);
                _data.min = patchZero(min, _data.min.length);
                _data.sec = patchZero(sec, _data.sec.length);
            }
        }

        return _data;
    }

    /**
     * [examine 转换日期]
     * @param  {[]} str [支持时间戳、时间格式、Date]
     * @return {[Date]}     [Date]
     */
    export function examine(str) {
        try {
        	let _date;
        	/** [if 判断是否已经为时间对象] */
            if (typeof str === "object" && typeof str.getTime === "function") {
                return str;
            }
            /** [if 判断是否为时间戳格式] */
            if (str >> 0) {
                if ((str).toString().length == 10) {
                    str = str * 1000;
                } else {
                    str = str * 1;
                }
            } else {
            	/** 为了兼容坑爹的ios */
                str = str.replace(/-/g, "/");
            }
            /** [if 是否不为空] */
            if (str) {
                _date = new Date(str);
                if (_date == 'Invalid Date') {
                    console.warn('日期格式错误:', str);
                } else {
                    return _date;
                }
            } else {
                console.warn('不能为空!');
            }
        } catch (err) {
            console.warn(err);
        }
    }
    /**
     * [getDate 获取相对应的年月日等]
     * @param  {[时间]} date [时间戳、时间格式字符串、]
     * @param  {[字符串]} fmt  [编号成的时间格式，第一个为!时]
     * @return {[对象]}      [description]
     */
    export function getDate(date, fmt) {
    	var _regfun,k,
    		o = {},
    		fmt = fmt || "!y-M-d h:m:s.S",
        	_date = examine(date);

        if (_date) {
            o = {
                "y": _date.getFullYear(), // 年份
                "M": _date.getMonth() + 1, // 月份
                "d": _date.getDate(), // 日
                "h": _date.getHours(), // 小时
                "m": _date.getMinutes(), // 分
                "s": _date.getSeconds(), // 秒
                "q": Math.floor((_date.getMonth() + 3) / 3), // 季度
                "S": _date.getMilliseconds() // 毫秒
            };
            if (fmt.charAt(0) === "!") {
                _regfun = patchZero;
                fmt = fmt.slice(1);
            } else {
                _regfun = function(a, l) {
                    return ("00000" + a).slice(-l);
                }
            }
            for (k in o) {
                if (new RegExp("(" + k + "+)").test(fmt)) {
                    fmt = fmt.replace(
                        RegExp.$1, _regfun(o[k], RegExp.$1.length)
                    );
                }
            }
            o.fmt = fmt;

            return o;
        }
    }

    /**
     * [patchZero 前面加0]
     * @param  {[type]} a [description]
     * @param  {[type]} l [description]
     * @return {[type]}   [description]
     */
    export function patchZero(a, l) {
        for (var i = (a).toString().length; i < l; i++) {
            a = "0" + a;
        };
        return a;
    }
