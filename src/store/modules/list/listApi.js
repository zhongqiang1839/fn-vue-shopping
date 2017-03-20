import * as requestService from '../../../util/request';

/**
 * 查询搜索列表
 * 根据条件
 * @param data
 * @returns {Promise}
 */
export function fetchSMbyKey(data) {
  let body = {
    "needFilter": true,
    "token": "",
    "body": {},
    "addrId": ""
  }
  Object.assign(body, data);
  return requestService.ajaxDefine(`${$.config.list}/getSmByKey`, body);
}

/**
 * 查询馆页列表
 * 根据条件
 * @param data
 * @returns {Promise}
 */
export function fetchSmByCategory(data) {
  let body = {
    "needFilter": true,
    "token": "",
    "body": {},
    "addrId": ""
  }
  Object.assign(body, data);
  return requestService.ajaxDefine(`${$.config.list}/getSmByCategory`, body);
}


/**
 * 查询列表页详细数据
 * http://list.m.beta1.fn/itemDetail
 * @param itemidArr
 * @param byPrice
 * @returns {*}
 */
export function fetchDetails(itemidArr,byPrice) {
  let body = {
    areaCode: $.cookie.getH5("siteid"),
    desByPrice:byPrice,
    itemId:itemidArr
  }
  return requestService.ajaxDefine(`${$.config.list}/itemDetail`, body);  //mock数据
}


/*
 * 列表页搜索关键词推荐商品
 * http://list.m.beta1.fn/getSearchSuggestion
 * @param data
 * @returns {Promise}
 * */
export function fetchSearchSuggestion(data) {
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
  return requestService.ajaxDefine(`${$.config.list}/getSearchSuggestion`, body);
}

/*
 * 列表页分类树
 * http://list.m.beta1.fn/cateTree
 * @param data
 * @returns {Promise}
 * */
export function fetchCateTree(cateTreeParams) {
  return requestService.ajaxDefine(`${$.config.list}/cateTree`, cateTreeParams);
}


