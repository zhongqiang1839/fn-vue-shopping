/**
 * Created by yafei.wu on 2016/11/2.
 */
import * as requestService from '../util/request';
//获取该用户已购买量(商详api获取)
let body = {
  "body": {},
  "token": $.cookie.getH5("token"),
  "apiVersion": $.config.apiVersion,
  "areaCode": $.cookie.getH5("siteid"),
  "device_id": $.cookie.getH5("device_id"),
  "addrId": "",
  "re_rule": "2" //默认是为2
}
export const getGoodsDetail = function (data) {
  Object.assign(body, data);
  return requestService.post(`${$.config.cart}/goods/detail/${$.config.version}`, body);
}

//获取该用户已购买量
export const shopcartGetLimit = function (data) {
  Object.assign(body, data);
  return requestService.post(`${$.config.cart}/shopcart/GetLimit/${$.config.version}`, body);
}
export const getAddCartData = function () {
  var data = {
    areaCode: $.cookie.getH5("siteid"),
    token: $.cookie.getH5("token"),
    body: {
      isGet: 1,
      areaCode: $.cookie.getH5("siteid"),
      action: 1,
      is_seperate: 0,
      product_list: [] //商品列表如：{sm_seq: "", type: "", qty: "", parent_seq: "", kind: "", campaign_seq: ""}
    }
  }
  return data;
}
//购物车
export const addShopCart = function (dataInfo) {
  var cartData = getAddCartData(),
    dataInfo = dataInfo || {};
  if ($.isNull(dataInfo.body.add_source)) {
    dataInfo.body.add_source = 0;
  }
 // dataInfo.body && $.merge(cartData.body, dataInfo.body);
  Object.assign(cartData, dataInfo);
  return requestService.post(`${$.config.cart}/shopcart/adminshopcart/${$.config.version}`, cartData);

}
