import * as requestService from '../util/request';
/*
 * 列表页查找无商品的大数据信息http://recommend-web01.beta1.fn:8080/recommend_soa_consumer/general/RecKeywordSearch
 * @param data
 * @returns {Promise}
 * */
export function recKeywordSearch(data) {
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
  return requestService.post(`http://recommend-web01.beta1.fn:8080/recommend_soa_consumer/general/RecKeywordSearch`, body);
  //return requestService.post(`${$.config.www}/merchandise/GetSearchSuggestion/${$.config.version}`, body);
}/**
 * Created by yafei.wu on 2016/11/30.
 */
