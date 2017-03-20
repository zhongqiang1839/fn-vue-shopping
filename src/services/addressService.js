import * as requestService from '../util/request';
//w公共的参数
let body={
  "body":{},
  "token":'905e20a63442b64a135854d6ca26db05',
  "apiVersion":$.config.apiVersion,
  "areaCode": $.cookie.getH5("siteid"),
  "device_id": $.cookie.getH5("device_id"),
  "addrId": "",
  "re_rule": "2" //默认是为2
}
//常用收货地址
export function getAddressList(data) {
  let body={
    "body":{},
    "token":'905e20a63442b64a135854d6ca26db05',
    "apiVersion":$.config.apiVersion,
    "areaCode": $.cookie.getH5("siteid"),
    "device_id": $.cookie.getH5("device_id"),
    "addrId": "",
    "re_rule": "2" //默认是为2
  }
  Object.assign(body, data);
  return requestService.post(`${$.config.member}/address/getAddressList/${$.config.version}`, body);
}
//选择其它地址
export function getNextAddress(data) {
  let body={
    "body":{},
    "token":'905e20a63442b64a135854d6ca26db05',
    "apiVersion":$.config.apiVersion,
    "areaCode": $.cookie.getH5("siteid"),
    "device_id": $.cookie.getH5("device_id"),
    "addrId": "",
    "re_rule": "2" //默认是为2
  }
  Object.assign(body, data);
  return requestService.post(`${$.config.member}/citylist/getNextAddress/${$.config.version}`, body);
}/**
 * Created by yafei.wu on 2016/11/10.
 */

