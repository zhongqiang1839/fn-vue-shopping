import * as requestService from '../util/request';

let body = {
  "body": {},
  "token": $.cookie.getH5("token"),
  "apiVersion": $.config.apiVersion,
  "areaCode": $.cookie.getH5("siteid"),
  "device_id": $.cookie.getH5("device_id"),
  "addrId": "",
  "re_rule": "2" //默认是为2
}

/*
 * 列表页搜索关键词飞牛密令跳转merchandise/getLink
 * @param data
 * @returns {Promise}
 * */
export function getLink(data) {
  let body = {
    "body":{},
    "token": $.cookie.getH5("token"),
    "apiVersion":$.config.apiVersion,
    "areaCode": $.cookie.getH5("siteid"),
    "device_id": $.cookie.getH5("device_id"),
    "addrId": "",
    "re_rule": "2" //默认是为2
  }
  Object.assign(body, data);
  return requestService.post(`${$.config.www}/merchandise/getLink`, body);
}

/**
 * 查询列表 根据条件
 * @param data
 * @returns {Promise}
 */
export function getSMbyKey(data) {
  let body = {
    "needFilter": true,
    "token": $.cookie.getH5("token"),
    "body": {},
    "addrId": ""
  }
  Object.assign(body, data);
  return requestService.ajaxDefine(`${$.config.list}/getSmByKey`, body);
}

/**
 * 分类 查询列表 根据条件
 * @param data
 * @returns {Promise}
 */
export function getSmByCategory(data) {
  let body = {
    "needFilter": true,
    "token": $.cookie.getH5("token"),
    "body": {},
    "addrId": ""
  }
  Object.assign(body, data);
  return requestService.ajaxDefine(`${$.config.list}/getSmByCategory`, body);
}
//获取详细信息
export function getDetailsApi(itemidArr,byPrice) {
  let body = {
    areaCode:$.cookie.getH5("siteid"),
    desByPrice:byPrice || 1,
    itemId:itemidArr
  }
  return requestService.ajaxDefine(`${$.config.list}/itemDetail`, body);  //mock数据
}
/*
 * 列表页搜索关键词推荐商品/merchandise/GetSearchSuggestion/
 * @param data
 * @returns {Promise}
 * */
export function getSearchSuggestion(data) {
  let body = {
    "body":{},
    "token": $.cookie.getH5("token"),
    "apiVersion":$.config.apiVersion,
    "areaCode": $.cookie.getH5("siteid"),
    "device_id": $.cookie.getH5("device_id"),
    "addrId": "",
    "re_rule": "2" //默认是为2
  }
  Object.assign(body, data);
  requestService.ajaxDefine(`${$.config.list}/getSearchSuggestion`,body)
}

/*
 * 列表页分类树http://list.m.beta1.fn/cateTree
 * @param data
 * @returns {Promise}
 * */
export function getCateTree(cateTreeParams) {
  return requestService.ajaxDefine(`${$.config.list}/cateTree`, cateTreeParams);
}


