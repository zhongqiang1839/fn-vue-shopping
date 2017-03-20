/**
 * Created by KE on 16/6/6.
 */

var regular = {
    name: /^[\u4e00-\u9fbb\u3002\u3003\u3009-\u3012\uff02-\uff64\u2011-\u2016\u2019\u201d\u201e\u2020\x20-\x2e\x30-\x3b\x3d\x3f-\x7e]{1,20}$/,
    address: /^[\u4e00-\u9fbb\u3002\u3003\u3009-\u3012\uff02-\uff64\u2011-\u2016\u2019\u201d\u201e\u2020\x20-\x2e\x30-\x3b\x3d\x3f-\x7e]{1,45}$/, //收货地址
    invoice: /^[\u4e00-\u9fbb\u3002\u3003\u3009-\u3012\uff02-\uff64\u2011-\u2016\u2019\u201d\u201e\u2020\x20-\x2e\x30-\x3b\x3d\x3f-\x7e]{1,100}$/, //发票抬头
    urlformat: /^((http|https):\/\/)((\w+):?(\w+)?@)?([^\/\?:]+):?(\d+)?(\/?[^\?#]+)?\??([^#]+)?#?(\w*)/, //url地址
    number: /^\d+(\.\d{1,2})?$/, //数字或2位小数
    date: /^(\d{4})(-|\/|\.)(\d{1,2})\2(\d{1,2})$/, //日期
    ascii: /^[\\x00-\\xFF]+$/, //仅ACSII字符
    zipcode: /^\d{6}$/i, //邮编
    picture: /(.*)\\.(jpg|bmp|gif|ico|pcx|jpeg|tif|png|raw|tga)(\s|\?|$)/i, //图片
    qq: /^[1-9][0-9]{4,20}$/,
    bankcardnum: /^[1-9][0-9]{10,30}$/, //银行账号
    phone: /^1\d{10}$/, //手机
    telphone: /^[\d-]{3,20}$/, //电话,这个正则回头修正
    telephone: /^(0[0-9]{2,3}\-)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$/,
    username: /^[_a-zA-Z][_0-9a-zA-Z-]{3,19}$/i, //用户名
    email: /^[a-z0-9]([a-z0-9\\.]*[-_]{0,4}?[a-z0-9\\.]+)*@([a-z0-9]*[-_]?[a-z0-9]+)+([\.][\w_-]+){1,5}$/i, //email
    password: /^[a-z0-9_-]{6,18}$/, //密码
    chinese: /[\u4E00-\u9FA5]/, //是否中文
    captcha: /^\w{4,6}$/, //验证码

    verifyNumber: /^\d+(\.\d{0,2})?$/, //数字或2位小数
    verifyBankcardnum: /^[1-9][0-9]{0,31}$/ //银行账号
}
export default regular;
