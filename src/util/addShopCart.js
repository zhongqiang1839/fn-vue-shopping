/**
 * Created by yafei.wu on 2016/11/2.
 */
/**
 * 获取添加购物车数据
 * @returns {{areaCode: *, token: *, body: {isGet: number, areaCode: string, action: number, isSeperate: number, product_list: Array}}}
 */
import * as cartServices from "../services/cartService";

export const isMailijian = function (bizGetLimitData) {
  return (bizGetLimitData.limit_discount == 1 || bizGetLimitData.limit_discount == 3);
}
export const isLimit = function (bizGetLimitData) {
  return (bizGetLimitData.limit_discount == 2 || bizGetLimitData.limit_discount == 3);
}
export const getParamStr = function (initParam) {
  var paramStr = "";
  for (var i in initParam) {
    paramStr += i + "=" + encodeURIComponent(initParam[i]) + "&";
  }
  return paramStr.substring(0, paramStr.length - 1);
}
/**
 * @title 添加购物车
 * @param dataInfo 购物车对象
 */
export const addShopCart = function (dataInfo, callback) {

  /** @desc 预购商品直接跳转订单确认页* */
  var cartData = cartServices.getAddCartData(), dataInfo = dataInfo || {};
  dataInfo.body && $.merge(cartData.body, dataInfo.body);
  dataInfo.body && (dataInfo.body.is_seperate = dataInfo.body.isSeperate);
  var bizGetLimitData = GetLimitObj(cartData);
  //如果是买立减 而且数据没有ssm_discount 则去调用商祥的API获取ssm_discount
  if (isMailijian(bizGetLimitData) && !bizGetLimitData.ssm_discount) {
    let sendGoodsDetailData = {
      "sm_seq": bizGetLimitData.sm_seq,
      "is_mall": bizGetLimitData.type + ""
    };
    cartServices.getGoodsDetail({body: sendGoodsDetailData}).then((res)=> {
      let data = res.body;
      if (res.errorCode == 1000) {
        // this.text = res.errorDesc;
       $.toast(res.errorDesc);

      } else if (res.errorCode == 0) {
        bizGetLimitData.ssm_discount = data.productDetail.ssm_discount || 0;
        dealShopCart(dataInfo, bizGetLimitData, callback)
      }

    }, (res)=> {
      console.log(res);
    })
  } else {
    dealShopCart(dataInfo, bizGetLimitData, callback)
  }
}

export const dealShopCart = function (dataInfo, bizGetLimitData, callback) {
  /**
   * 0，不是限购　＆＆　不是买立减
   * 1，不是限购　＆＆　是买立减
   * 2，是限购　＆＆　不是买立减
   * 3，是限购　＆＆　是买立减
   */

  if (isLimit(bizGetLimitData)) {

    if ($.cookie.getH5("islogin") !== 1) {
      cartServices.shopcartGetLimit({body: bizGetLimitData.limitObjData}).then((res)=> {
        let data = res.body;
        if (data.errorCode == 0) {
          /**
           *  @param is_pop 是否弹窗
           *  @param c_qty  可购数量
           *  @desc 控制显示 弹窗内容，是否可以继续购买                      s
           * */
          if (data.is_pop == 1 && data.c_qty == 0) {
            // popToastAlert(data.body.msg, 1);
            //  Vue.config.text=data.msg;
            return;
          } else if (data.is_pop == 1 && data.bc_qty > 0) {
            // this.text=data.msg;
            bizGetLimitData.isPop = true;
            addCarts(dataInfo, bizGetLimitData, callback);
            // popToastAlert(data.body.msg);
          } else if (data.is_pop == 0) {
            bizGetLimitData.isPop = true;
            addCarts(dataInfo, bizGetLimitData, callback);
          }
        } else if (res.errorCode == 1000) {
          // widgetPopAlert.popalert(data.errorDesc);
         $.toast(res.errorDesc);
        }

      }, (res)=> {
        console.log(res);
      });
    } else {
      $.url.redirect($.config.mDomain + "/login/index.html?gotourl="+ encodeURIComponent(location.href));
    }
  } else {

    bizGetLimitData.isPop = true;
    addCarts(dataInfo, bizGetLimitData, callback);
  }
  // $(".loading_pop").hide();
}
/**
 * @title 添加购物车
 * */
export const addCarts = function (dataInfo, bizGetLimitData, callback) {
  cartServices.addShopCart(dataInfo).then((res)=> {
    if (res.errorCode == 0) {
      var _n = res.body.total_items;

      if (_n > 0) {
        // $(".J_detailCartNum,.J_navCartNumId").html((_n > 99) ? "99+" : _n).removeClass("hide").show();
      }
      /** @desc 列表页面不显示 “加入购物车成功”　“买立减金额”等提示 **/
      if (!$.isNull(bizGetLimitData.ssm_discount) && bizGetLimitData.isPop && !dataInfo.body.unAlert) {
        $.toast("加入购物车成功 ," + "购买本商品每件立减" + bizGetLimitData.ssm_discount + "元.");
      } else if (bizGetLimitData.isPop && !dataInfo.body.unAlert) {
        /**  @param isSeperate 是否预购 */
        if (dataInfo.body.isSeperate == 1 || dataInfo.body.is_seperate == 1) {
          initParam.ci = JSON.stringify({"action": 7, "is_seperate": 1, "is_overseas": dataInfo.body.is_overseas || 0});
          var paramStr = getParamStr(initParam);
          $.url.redirect($.url.getTouchBaseUrl() + "order/index.html?" + paramStr);
        } else if (dataInfo.body.isSeperate == 3 || dataInfo.body.is_seperate == 3) {
          initParam.ci = JSON.stringify({
            "action": 7,
            "is_seperate": 3,
            "is_overseas": dataInfo.body.is_overseas || 0,
            'seq': dataInfo.body.product_list[0].sm_seq
          });
          initParam.presell = '';
          var paramStr = getParamStr(initParam);
          $.url.redirect($.url.getTouchBaseUrl() + "order/index.html?" + paramStr);
        } else if (dataInfo.body.isSeperate == 4 || dataInfo.body.is_seperate == 4) {/*合约机套餐*/
          initParam.ci = JSON.stringify({
            "action": 7,
            "is_seperate": 4,
            "is_overseas": dataInfo.body.is_overseas || 0,
            'seq': dataInfo.body.product_list[0].sm_seq
          });
          initParam.presell = '';
          var paramStr = getParamStr(initParam);
          $.url.redirect($.url.getTouchBaseUrl() + "order/index.html?" + paramStr);
        } else if (dataInfo.body.isSeperate == 5 || dataInfo.body.is_seperate == 5) {/*组团 开团、参团、快捷参团提交订单*/
          initParam.ci = JSON.stringify({
            "action": 7,
            "is_seperate": 4,
            "is_overseas": dataInfo.body.is_overseas || 0,
            'seq': dataInfo.body.product_list[0].sm_seq
          });
          initParam.presell = '';
          var paramStr = getParamStr(initParam);
          $.url.redirect($.url.getTouchBaseUrl() + "order/index.html?" + paramStr);
        } else {
          $.toast("加入购物车成功");
        }
      }
      callback && callback(res);
    } else if ((res.errorCode == 1000 && res.errorDesc) || (res.errorCode == 3003 && res.errorDesc)) {
      $.toast(res.errorDesc);
    } else if (res.errorCode == 3006 && res.errorDesc) {
      $.toast(res.errorDesc, 1, 2000);
      callback && callback(res);
    } else {
      $.toast(res.errorDesc || "~亲 ,加入购物车失败,请重新加入");
    }

  }, (res)=> {
    $.toast("请求数据失败");
  });

}

/**
 *  构建限购对象
 **/
export const GetLimitObj = function (obj) {
  var itemObj = {};
  if ($.isNull(obj.body.product_list)) {
    return;
  }
  var productList = obj.body.product_list;
  for (var i = 0; i < productList.length; i++) {
    var item = productList[i];
    if (item.kind == 1) {
      itemObj.sm_seq = item.sm_seq;
      itemObj.limit_discount = 0;
    }
    itemObj.type = item.type;
    //是自营 主商品 并且限购
    if (item.kind == 1) {
      itemObj.limit_discount = obj.body.limit_discount;
      itemObj.ssm_discount = obj.body.ssm_discount;
      itemObj.limitObjData = {
        areaCode: $.cookie.getH5('siteid'),
        token: $.cookie.getH5('token'),
        body: {
          shopcartItem: {
            main: {
              sm_seq: item.sm_seq,
              is_orgi_item: (!item.is_orgi_item || item.is_orgi_item == 1) ? 1 : item.is_orgi_item,
              qty: item.qty
            }
          }
        }
      };
    }
  }
  return itemObj;
}
