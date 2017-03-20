import * as requestService from '../util/request';

/**
 * 获取用户token
 * @param body
 * @returns {*}
 */
export function getTokenByServices() {
  var body = {
    "apiVersion":$.config.apiVersion,
    "areaCode":$.cookie.getH5("siteid"),
    "token":"",
    "body":{
      "deviceId":"H5TOUCH",
      "osType": $.config.osType,
      "osVersionNo":"1.0",
      "appVersionNo":"1.0"
    },
    "device_id":$.cookie.getH5("device_id")
  }
  return requestService.post(`${$.config.member}/token/GetToken/${$.config.version}`, body);
}
