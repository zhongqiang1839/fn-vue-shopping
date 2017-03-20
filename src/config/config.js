/**
 * Created by zhongqiang.feng on 2016/10/20.
 */

let mDomain,cookieDomain,apiPath,memberApiPath,cartApiPath,wwwApiPath;


if (environment === 'beta' || environment === 'local') {

  mDomain =  '//m.beta1.fn';
  cookieDomain = '.beta1.fn';
  apiPath = '//list.m.beta1.fn';
  memberApiPath = "https://member-fnapp.feiniugo.com";
  cartApiPath = "//cart-fnapp.feiniugo.com";
  wwwApiPath = "//www-fnapp.feiniugo.com";

} else if (environment === 'online' || environment === 'preview'){

  mDomain =  '//m.feiniu.com';
  cookieDomain = '.feiniu.com';
  apiPath = '//list.m.feiniu.com';
  memberApiPath = "https://member-fnapp.feiniu.com";
  cartApiPath = "//cart-fnapp.feiniu.com";
  wwwApiPath = "//www-fnapp.feiniu.com";

}

/**
 * 默认的初始化配置
 */
export const config = {
  osType: "3", //系统触屏
  apiVersion: "t5.09",
  version:"t509",
  md5str: "%$#(*&*aeere1234234",
  member: memberApiPath,
  cart: cartApiPath,
  www: wwwApiPath,
  mDomain:mDomain,
  cookieDomain: cookieDomain,
  environment:environment,
  list:apiPath
}
