<template>
    <div>
      <ul class="actslist" :class="{type_2:listBtn}">
        <li v-for="list in merchandiseList" :class="{w_species: list.similarKeywords}" >
          <template v-if="list.similarKeywords">
            <div class="clearfix">
              <template v-for="item in list.similarKeywords">
                <p @click="similarBtn(item)"><a href="javascript:;">{{item}}</a></p>
              </template>
            </div>
          </template>
          <template v-else>
            <div class="d_img">
              <a :href="list | pageJump">
                <img :src="list.sm_pic">
              </a>
            </div>
            <div class="d_adc">
              <a :href="list | pageJump">
                <div class="d_title">
                  <p>
                    {{list.obj}}
                    <template v-for="type in list.type_tags">
                      <!--自营/生鲜-->
                      <span v-if="type.rlink">
                          <img :src="type.rlink">
                      </span>
                    </template>
                    {{list.sm_name}}
                  </p>
                </div>
                <div class="tg2_t">
                  <p class="s_mark">
                    <!--团秒赠图标 小图标-->
                    <template v-for="tag in list.small_tags">
                      <i v-html="tag | dealTags"></i>
                    </template>
                    <!--满减满赠-->
                    <template v-for="tag in list.tags">
                      <i v-html="tag | dealTags"></i>
                    </template>
                  </p>
                  <i class="yg" v-if="list.tip">{{list.tip}}</i>
                </div>

              </a>
              <!-- 配送提示语 -->
              <div class="d_mix">
                <div class="dm_1">
                  <!--大图模式-->
                  <div class="tg2">
                    <i v-html="list | dealPrice"></i>
                    <!--手机专享图标-->
                  </div>
                  <a class="tg lh new_tg" :href="list | pageJump">
                    <i class="fl new_i" v-html="list | dealPrice"></i>
                    <!--手机专享图标-->
                    <p class="s_mark">
                      <!--手机专享图标-->
                      <template v-for="tag in list.pic_tags">
                        <i v-html="tag | dealTags"></i>
                      </template>
                      <!--团秒赠图标 小图标-->
                      <template v-for="tag in list.small_tags">
                        <i v-html="tag | dealTags"></i>
                      </template>
                      <!--满减满赠-->
                      <template v-for="tag in list.tags">
                        <i v-html="tag | dealTags"></i>
                      </template>
                    </p>
                    <i class="yg" v-if="list.tip">{{list.tip || ""}}</i>
                  </a>
                  <div class="d_price">
                    <!--评论-->
                    <span class="judge" v-if="list.goodRate"> 好评{{list.goodRate}} </span>
                    <!--店铺名称-->
                    <template v-if="list.shop_info && list.shop_info.name">
                      <span class="shop">{{list["shop_info"]["name"]}}</span>
                    </template>
                    <!--自营标-->
                    <template v-if="list.global_tag && list.global_tag.length>0">
                      <span class="zhiying" v-for="tags in list.global_tag">
                        <img :src="tags.rlink">
                      </span>
                    </template>
                    <!--保税仓标示-->
                    <template v-if="list.overseas && list.overseas.overseasDelivery">
                      <span class="bonded">{{list.overseas.overseasDelivery}}</span>
                    </template>
                    <!--<span>2983条评论</span>-->
                  </div>
                  <p class="shopname" v-if="distribution_tips(list) && !listBtn">
                    {{list.distribution_tips | dealDistributionTips}}</p>
                </div>

                <!-- 购物车情况 S -->
                <!--<div class="cart_case" @click="showCart($event)" :sm-seq="list.sm_seq"-->
                <!--:is-orgiitem="list.is_orgi_item"-->
                <!--:is-pre="list.isPreOrd"-->
                <!--:is-mall="list.is_mall" :is-sen="list.isSensitive" :sm-price="list.sm_price"-->
                <!--:sale-type="list.saleType" :is-limit="list.isLimited"-->
                <!--:data-url="list | listUrl">-->
                <!--<a v-if="tyle1" :class="{'iconfont J_buyTo':classObject.class1}"> </a>-->
                <!--<a v-if="tyle2" :class="{'btn btn_red J_buyTo':classObject.class2}"-->
                <!--v-text="list.saleTypeName"></a>-->
                <!--<a v-else :class="{'J_buyTo':classObject.class3}">-->
                <!--<span class="mc3 fs4" v-if="saleName" v-text="list.saleTypeName"></span>-->
                <!--</a>-->
                <!--</div>-->
              </div>

            </div>
          </template>
        </li>
      </ul>
        <!--<fn-toast :show.sync="show" type="text" :text="text"></fn-toast>-->
        <!--购物车按钮-->
        <!--<fn-fix-btn :cart-number="cartNumber" v-if="!noShop"></fn-fix-btn>-->
    </div>

</template>
<style>
    .outbox .weui_toast {
        top: 50%;
        transform: translate(-50%, -50%);
    }

    .mc3 {
        color: #888;
    }

    .fs4 {
        font-size: .24rem;
    }

    .d_mix .cart_case .iconfont {
        display: block;
        font-size: .4rem;
        color: #c70034;
        width: .7rem;
        height: .7rem;
        line-height: .7rem;
        border-radius: 50%;
        background: #ffefef;
        border: 1px solid #c70034;
    }

    .lh {
        line-height: .1rem;
    }

    .fn_list_container .d_price span.bonded {
        color: #6679b3;
    }
    .new_tg {
        display: block;
    }
    .tg2_t{
        margin-top: .12rem;
        margin-bottom: .12rem;
    }
    .tg2>i{
        vertical-align: top;
    }
    .new_i{
        display: inline-block;
        text-align: center;
        border-radius: 3px;
        vertical-align: middle;
        font-size: .36rem;
    }
</style>
<script>
    import {mapState} from 'vuex'
    import fnToast from 'vux/src/components/toast/index.vue'

    import {intDecimalPrice} from "../../util/filter";

    import * as listServices from "../../services/listService";

    import * as addShopCartWidget from "../../util/addShopCart"

    import fnFixBtn from "components/common/fn-fix-btn";

    export default{
        props: [
          'merchandiseList',
          'showList',
          'pageSize',
          'noShop'
        ],
        data(){
            return {
                text: '加入购物车成功',
                show: false,
                saleName: false,
                classObject: {
                    class1: false,
                    class2: false,
                    class3: false
                },
                cartNumber: 0
            }
        },
        mounted(){

        },
        computed:{
          ...mapState({
            listBtn: state => state.list.bigImagePattern
          }),
          dealPrice(data){
            if ($.isNull(data.sm_price)) {
              return '';
            }

            if (data.sm_price == '暂无报价') {
              return "<i></i>暂无报价<b></b>";
            }

            var maxWidth = '';

            if (data.saleType == 0 && data.pic_tags && data.pic_tags.length > 0) {
              //有购物车按钮 并且 有 手机专享图标
              maxWidth = 2;
            }
            else if (data.saleType == 0 && data.pic_tags && data.pic_tags.length == 0) {
              //有购物车按钮 没有 手机专项图标
              maxWidth = 2.4;
            }
            else if (data.saleType != 0 && data.pic_tags && data.pic_tags.length > 0) {
              //有 售完补货中按钮 并且含有 手机专享图标
              maxWidth = 1.7;
            }
            else if (data.saleType != 0 && data.pic_tags && data.pic_tags.length == 0) {
              //有 售完补货中按钮 无 手机专享图标
              maxWidth = 3;
            }

            var classStr = 'tg2-price';

            var tpl = '<p class="fd_C red ' + classStr + '" style="max-width: ' + maxWidth + 'rem">';

            tpl += '<em class="fl em_style"></em>';

            var arr = data.sm_price && data.sm_price.split(".");

            tpl += '<span class="fl s_style">' + arr[0] + '</span>';

            if (arr[1] != undefined || arr[1] == '00' || arr[1] == '0') {
              tpl += '<b>.' + arr[1] + '</b>';
            }
            tpl += this.dealItPrice(data.sm_price, data.it_mprice);

            return tpl + '</p>';
          }
        },
        filters: {
            dealDistributionTips(tips){
                if (!tips) {
                    return "";
                } else {
                    return tips.name;
                }
            },
            listUrl(list){
                let n = list.saleType;
                n = 0
                let url;
                let host = $.config.mDomain;
                if (n == 0 || n == 2 || n == 3) {
                    this.classObject.class1 = true;
                    this.tyle1 = true;
                    if (list.is_pop == 1) {
                        url = host + '/detail/attribute?sm_seq=' + list.sm_seq;
                    } else {
                        url = '';
                    }
                } else if (n == 1 || n == 2 || n == 9 || n == 11) {
                    this.tyle2 = true;
                    url = host + '/item/' + list.sm_seq;
                    this.classObject.class2 = true;
                } else if (n == 4 || n == 5 || n == 6 || n == 7 || n == 8 || n == 10) {
                    url = host + '/item/' + list.sm_seq;
                    this.classObject.class3 = true;
                    this.saleName = true;
                }
                return url;
            },
            pageJump(item){
                return $.config.mDomain + '/item/' + item.sm_seq;
            }
        },
        methods: {
            distribution_tips(item) {
                return item.distribution_tips ? item.distribution_tips.name : '';
            },
            dealTags(tag){
              var span = $('<span class="marking"></span>');

              //调色板格式
              if (tag.form == 1) {
                span.css({
                  backgroundColor: tag.bgcolor,
                  color: tag.color
                });

                span.text(tag.name);
              }

              //图片格式
              if (tag.form == 2) {
                span.css({border:'none'});
                var img = $('<img />', {
                  src: tag.rlink
                });

                span.html(img);
              }

              //镂空边框格式
              if (tag.form == 3) {
                span.css({
                  border: '1px solid ' + tag.bordercolor,
                  color: tag.color
                });

                span.text(tag.name);
              }

              return span[0].outerHTML;
            },

            showCart(e){
                //点击事件调用
                const me = this;
                me.show = false;
                const el = e.currentTarget;
                let smSeq = el.getAttribute('sm-seq');
                let isOrg = el.getAttribute('is-orgiitem');
                let isPre = el.getAttribute('is-pre');
//                (!isPre) || (isPre == 0) ? 0 : 1;
                ($.isNull(isPre) || isPre == 0) ? 0 : 1
                let isMall = el.getAttribute('is-mall');
                let isSen = el.getAttribute('is-sen');
                let smPrice = el.getAttribute('sm-price');
                let saleType = el.getAttribute('sale-type');
                let isLimit = el.getAttribute('is-limit');
                isLimit = parseInt(isLimit);
                let dataUrl = el.getAttribute('data-url');
                let limit_discount;
                if (!isLimit && saleType !== 3) {
                    //不是限购 并且 不是买立减
                    limit_discount = 0;
                } else if (!isLimit && saleType === 3) {
                    //不是限购 并且 是买立减
                    limit_discount = 1;
                } else if (isLimit && saleType !== 3) {
                    //是限购   并且 不是买立减
                    limit_discount = 2;
                } else {
                    //是限购   并且 是买立减
                    limit_discount = 3;
                }
                if (dataUrl) {
                    //如有url,则跳到新页面
                    window.location = dataUrl;
                    return false;
                }

                let cartRequesttData = {
                    "action": 1,
                    "iseperate": isPre,//是否预购
                    "limit_discount": limit_discount,
                    "product_list": [{
                        "sm_seq": smSeq,
                        "type": isMall == "1" ? 1 : 0,
                        "qty": 1,
                        "kind": 1,
                        "parent_seq": "",
                        "is_orgi_item": isOrg,
                        "price_snapshot": smPrice,
                        "campaign_seq": ''
                    }]
                }

                addShopCartWidget.addShopCart({body: cartRequesttData}, function (res) {
                    let _n = res.body.total_items;
                    $.cookie.add('total', _n);
                    me.cartNumber = parseInt($.cookie.get('total')) || 0;
                })

            },
            dealItPrice(price, itPrice){
                // 是否显示参考价 null-未初始化  false-不显示参考价  true-显示参考价
                if (this.showItPrice === false) {
                    return '';
                }

                price = parseFloat(price) || 0;

                itPrice = parseFloat(itPrice) || 0;

                if (itPrice <= price) {
                    return '';
                }

                if (this.showItPrice === true) {
                    return ' <s>&yen;' + itPrice + '</s>';
                }

                var width = document.body.clientWidth || window.innerWidth || document.documentElement.clientWidth;

                if (width < 360) {
                    this.showItPrice = false;
                    return '';
                }

                this.showItPrice = true;

                return '<s>&yen;' + itPrice + '</s>';
            },
            similarBtn(item){
                this.$dispatch('search-event', this.$route.query.kw + '+' + item);
            }
        },
        components: {
            fnToast,
            fnFixBtn
        }

    }
</script>
