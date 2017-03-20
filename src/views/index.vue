<template>
  <div class="outbox">
    <!--<fn-appdown :app-url="dealAppUrl"></fn-appdown>-->
    <scroller :on-refresh="refresh" ref = "my_scroller">

      <div class="s_top">
        <div class="ind_top search_top_box J_ind_top J_search_top search_warp" :class="{top:hasTopClass}">
          <div class="ind_city J_city">
            <router-link to="/address">上海</router-link>
          </div>
          <div class="single_search">
            <span class="top_back J_topback hide_it"></span>
            <form class="">
              <button class="iconfont"></button>
              <input type="text" name="kw" class="J_keyword" value="" :placeholder="keywords">
            </form>
            <div class="set_list J_search_go hide_it">搜索</div>
            <div class="search hide_it"></div>
          </div>
          <router-link to="/userCenter">
            <div id="J_personal" class="personal">
              <i class="iconfont"></i>
            </div>
          </router-link>
          <router-link to="/login">
            <div id="J_login" class="login hide_it"> 登录</div>
          </router-link>
        </div>
      </div>


      <!-- 首页导航轮播图 -->
      <fn-index-navigator-images :images-list="imagesList"/>


      <!-- 首页Icon 集合 -->
      <fn-index-navigator-icon :icon-list="iconlist"/>


      <!--狂欢倒计时 控件-->
      <fn-index-countdown :count-down="countDown"/>


      <!-- 如果不是八个ICON和秒杀区块, 显示一段文字类似"飞牛快报" S -->
      <div class="ind_box relative new no_blank" data-title="">
        <!-- 自定义1+1 1+n n+1 1*1 1*n n*n 大促四色 S -->
        <ul class="ind_flex clo_1">
          <li><a href="http://sale.feiniu.com/m-49172/touch/CS000016" data-order="0"
                 data-param="http://sale.feiniu.com/m-49172/touch/CS000016" data-type="21"> <img
            src="http://img04.fn-mart.com/C/web/layout/kk/20160726/201607260858241469494704_kk-1.jpg" title="" alt="">
          </a></li>
        </ul>
        <!-- 自定义1+1 1+n n+1 1*1 1*n n*n 大促四色 E -->
      </div>


      <div class="ind_box relative new no_blank" data-title="">  <!-- 如果不是八个ICON和秒杀区块, 显示一段文字类似"飞牛快报" S -->
        <!-- 自定义1+1 1+n n+1 1*1 1*n n*n 大促四色 S -->
        <ul class="ind_flex clo_2">
          <li><a href="http://sale.feiniu.com/m-46493/touch/CS000016" data-order="0"
                 data-param="http://sale.feiniu.com/m-46493/touch/CS000016" data-type="21"> <img
            src="http://img05.fn-mart.com/C/web/layout/kk/20160725/201607251852411469443961_kk-1.jpg" title="" alt="">
          </a></li>
          <li><a href="http://sale.feiniu.com/m-48033/touch/CS000016" data-order="1"
                 data-param="http://sale.feiniu.com/m-48033/touch/CS000016" data-type="21"> <img
            src="http://img03.fn-mart.com/C/web/layout/kk/20160726/201607260928181469496498_kk-1.jpg" title="" alt="">
          </a></li>
        </ul>  <!-- 自定义1+1 1+n n+1 1*1 1*n n*n 大促四色 E --> </div>


      <div class="ind_box relative new no_blank" data-title="新增1+4">
        <div class="custom-title J_banner_title" title="特色频道" data-href="" style='background-color:#f2f2f2'>
          <div class="left">
            <p class="line" style="border:1px solid #d088b7"></p>
            <p style="color:#ae1f7d">新增1+4</p>
            <p class="line" style="border:1px solid #d088b7"></p>
          </div>
        </div>  <!-- 自定义1+1 1+n n+1 1*1 1*n n*n 大促四色 S -->
        <ul class="clo_1_4 ind_flex">
          <li>
            <a href="javascript:;">
              <div class="ind_text">
                <p>飞牛团</p>
                <p>实惠不容错过</p>
              </div>
              <div class="ind_img">
                <img src="http://ued.dev.fn.com:8080/imgx/300x300/ffff00/fff.png">
              </div>
            </a>
          </li>
          <li>
            <a href="javascript:;">
              <div class="ind_text left">
                <p>品牌特卖</p>
                <p>黄金满388减80</p>
              </div>
              <div class="ind_img right">
                <img src="http://ued.dev.fn.com:8080/imgx/160x160/ffff00/fff.png">
              </div>
            </a>
          </li>
          <li>
            <a href="javascript:;">
              <div class="ind_text left">
                <p>品牌特卖</p>
                <p>黄金满388减80</p>
              </div>
              <div class="ind_img right">
                <img src="http://ued.dev.fn.com:8080/imgx/160x160/ffff00/fff.png">
              </div>
            </a>
          </li>
          <li>
            <a href="javascript:;">
              <div class="ind_text left">
                <p>品牌特卖</p>
                <p>黄金满388减80</p>
              </div>
              <div class="ind_img right">
                <img src="http://ued.dev.fn.com:8080/imgx/160x160/ffff00/fff.png">
              </div>
            </a>
          </li>
          <li>
            <a href="javascript:;">
              <div class="ind_text left">
                <p>品牌特卖</p>
                <p>黄金满388减80</p>
              </div>
              <div class="ind_img right">
                <img src="http://ued.dev.fn.com:8080/imgx/160x160/ffff00/fff.png">
              </div>
            </a>
          </li>
        </ul>
      </div>

      <div class="ind_box relative new no_blank" data-title="">  <!-- 如果不是八个ICON和秒杀区块, 显示一段文字类似"飞牛快报" S -->
        <!-- 自定义1+1 1+n n+1 1*1 1*n n*n 大促四色 S -->
        <ul class="ind_flex clo_2 left">
          <li><a href="http://sale.feiniu.com/m-48600/touch/CS000016" data-order="0"
                 data-param="http://sale.feiniu.com/m-48600/touch/CS000016" data-type="21"> <img
            src="http://img02.fn-mart.com/C/web/layout/kk/20160719/201607191112151468897935_kk-1.jpg" title="" alt="">
          </a></li>
          <li><a href="http://sale.feiniu.com/m-47964/touch/CS000016" data-order="1"
                 data-param="http://sale.feiniu.com/m-47964/touch/CS000016" data-type="21"> <img
            src="http://img03.fn-mart.com/C/web/layout/kk/20160718/201607181531591468827119_kk-1.jpg" title="" alt="">
          </a></li>
        </ul>  <!-- 自定义1+1 1+n n+1 1*1 1*n n*n 大促四色 E -->
      </div>

      <div class="ind_box relative new no_blank" data-title="">  <!-- 如果不是八个ICON和秒杀区块, 显示一段文字类似"飞牛快报" S -->
        <!-- 新旧主题馆 S -->
        <div class="ind_theme">
          <ul class="ind_flex clo_new_theme">
            <li class="theme left" data-href="http://sale.feiniu.com/m-47125/touch/CS000016">
              <div class="title"><h3>生鲜</h3>
                <p class="picTitle" style="color: #999999">满158减30</p></div>
              <div><a href="javascript:void(0);"> <img
                src="http://img01.fn-mart.com/C/web/layout/kk/20160606/201606061713191465204399_kk-1.jpg" title="生鲜"
                alt="生鲜"> </a></div>
            </li>
            <li class="theme left" data-href="http://preview.m.feiniu.com/channel/index?channelId=140&cityCode=CS000016">
              <div class="title"><h3>食品饮料</h3>
                <p class="picTitle" style="color: #999999">激爽一夏</p>      <span class="tags"
                                                                               style="background-color: #e60012">满99减50</span>
              </div>
              <div><a href="javascript:void(0);"> <img
                src="http://img02.fn-mart.com/C/web/layout/kk/20160720/201607201606531469002013_kk-1.jpg" title="食品饮料"
                alt="食品饮料"> </a></div>
            </li>
            <li class="theme left" data-href="http://sale.feiniu.com/m-36018/touch/CS000016">
              <div class="title"><h3>家清日百</h3>
                <p class="picTitle" style="color: #999999">整点秒杀</p></div>
              <div><a href="javascript:void(0);"> <img
                src="http://img02.fn-mart.com/C/web/layout/kk/20160222/201602221505081456124708_kk-1.jpg" title="家清日百"
                alt="家清日百"> </a></div>
            </li>
            <li class="theme left" data-href="http://preview.m.feiniu.com/channel/index?channelId=13&cityCode=CS000016">
              <div class="title"><h3>母婴用品</h3>
                <p class="picTitle" style="color: #999999">2件2折起</p></div>
              <div><a href="javascript:void(0);"> <img
                src="http://img04.fn-mart.com/C/web/layout/kk/20160523/201605231635311463992531_kk-1.jpg" title="母婴用品"
                alt="母婴用品"> </a></div>
            </li>
            <li class="theme top" data-href="http://preview.m.feiniu.com/channel/index?channelId=11&cityCode=CS000016">
              <div class="title"><h3>电器城</h3>
                <p class="picTitle" style="color: #999999">爆款5折起</p></div>
              <div><a href="javascript:void(0);"> <img
                src="http://img02.fn-mart.com/C/web/layout/kk/20160603/201606031015161464920116_kk-1.jpg" title="电器城"
                alt="电器城"> </a></div>
            </li>
            <li class="theme top" data-href="http://preview.m.feiniu.com/channel/index?channelId=68&cityCode=CS000016">
              <div class="title"><h3>个护美妆</h3>
                <p class="picTitle" style="color: #999999">1元开抢</p></div>
              <div><a href="javascript:void(0);"> <img
                src="http://img05.fn-mart.com/C/web/layout/kk/20160315/201603150926321458005192_kk-1.jpg" title="个护美妆"
                alt="个护美妆"> </a></div>
            </li>
            <li class="theme top" data-href="http://sale.feiniu.com/m-47560/touch/CS000016">
              <div class="title"><h3>服饰内衣</h3>
                <p class="picTitle" style="color: #999999">品牌满减</p></div>
              <div><a href="javascript:void(0);"> <img
                src="http://img04.fn-mart.com/C/web/layout/kk/20160726/201607260842111469493731_kk-1.jpg" title="服饰内衣"
                alt="服饰内衣"> </a></div>
            </li>
            <li class="theme top" data-href="http://sale.feiniu.com/m-48640/touch/CS000016">
              <div class="title"><h3>家纺家装</h3>
                <p class="picTitle" style="color: #999999">买就送</p></div>
              <div><a href="javascript:void(0);"> <img
                src="http://img06.fn-mart.com/C/web/layout/kk/20160506/201605061452491462517569_kk-1.jpg" title="家纺家装"
                alt="家纺家装"> </a></div>
            </li>
            <li class="theme top" data-href="http://sale.feiniu.com/m-47961/touch/CS000016">
              <div class="title"><h3>户外运动</h3>
                <p class="picTitle" style="color: #999999">满299减100</p></div>
              <div><a href="javascript:void(0);"> <img
                src="http://img06.fn-mart.com/C/web/layout/kk/20160726/201607260848401469494120_kk-1.jpg" title="户外运动"
                alt="户外运动"> </a></div>
            </li>
            <li class="theme top" data-href="http://sale.feiniu.com/m-47963/touch/CS000016">
              <div class="title"><h3>鞋靴箱包</h3>
                <p class="picTitle" style="color: #999999">男鞋39元</p></div>
              <div><a href="javascript:void(0);"> <img
                src="http://img04.fn-mart.com/C/web/layout/kk/20160726/201607260843441469493824_kk-1.jpg" title="鞋靴箱包"
                alt="鞋靴箱包"> </a></div>
            </li>
            <li class="theme top" data-href="http://sale.feiniu.com/m-30016/touch/CS000016">
              <div class="title"><h3>图书文具</h3>
                <p class="picTitle" style="color: #999999">全场5折起</p></div>
              <div><a href="javascript:void(0);"> <img
                src="http://img06.fn-mart.com/C/web/layout/kk/20160714/201607141445421468478742_kk-1.jpg" title="图书文具"
                alt="图书文具"> </a></div>
            </li>
            <li class="theme top" data-href="http://sale.feiniu.com/m-48763/touch/CS000016">
              <div class="title"><h3>手机特卖</h3>
                <p class="picTitle" style="color: #999999">全场6折起</p></div>
              <div><a href="javascript:void(0);"> <img
                src="http://img02.fn-mart.com/C/web/layout/kk/20160726/201607261007261469498846_kk-1.jpg" title="手机特卖"
                alt="手机特卖"> </a></div>
            </li>
          </ul>
        </div>  <!-- 新旧主题馆 E -->
      </div>


      <!-- 如果不是八个ICON和秒杀区块, 显示一段文字类似"飞牛快报" S -->
      <!-- 腰部banner S -->
      <div class="ind_box relative new " data-title="">
        <div class='swiper-container yaobu-swiper-container J_yaobu_swiper_container' data-id="10">
          <div class='swiper-wrapper'>
            <div class="swiper-slide">
              <a href="http://sale.feiniu.com/m-49176/touch/CS000016">
                <img src="http://img04.fn-mart.com/C/web/layout/kk/20160726/201607260851091469494269_kk-1.jpg" title="20"
                     alt="20">
              </a>
            </div>
            <div class="swiper-slide">
              <a href="http://sale.feiniu.com/m-39807/touch/CS000016">
                <img src="http://img03.fn-mart.com/C/web/layout/kk/20160726/201607260853321469494412_kk-1.jpg" title="20"
                     alt="20">
              </a>
            </div>
          </div>
          <div class="swiper-pagination border-gray small right fill pagination J_yaobu_pagination" data-id='10'
               data-count="2">
          </div>
        </div>
      </div>
      <!-- 部banner E -->

      <div class="ind_box relative new no_blank" data-title="品牌推荐">  <!-- 如果不是八个ICON和秒杀区块, 显示一段文字类似"飞牛快报" S -->
        <div class="custom-title J_banner_title" title="品牌推荐" data-href="" style='background-color:#f2f2f2'>
          <div class="left"><p class="line"></p>
            <p style="color:#333333">品牌推荐</p>
            <p class="line"></p></div>
        </div>  <!-- 自定义1+1 1+n n+1 1*1 1*n n*n 大促四色 S -->
        <ul class="ind_flex clo_3 left">
          <li><a href="http://sale.feiniu.com/m-49124/touch/CS000016" data-order="0"
                 data-param="http://sale.feiniu.com/m-49124/touch/CS000016" data-type="21"> <img
            src="http://img01.fn-mart.com/C/web/layout/kk/20160726/201607260903541469495034_kk-1.jpg" title="" alt="">
          </a></li>
          <li><a href="http://sale.feiniu.com/m-48014/touch/CS000016" data-order="1"
                 data-param="http://sale.feiniu.com/m-48014/touch/CS000016" data-type="21"> <img
            src="http://img04.fn-mart.com/C/web/layout/kk/20160726/201607260856041469494564_kk-1.jpg" title="" alt="">
          </a></li>
          <li><a href="http://sale.feiniu.com/m-49064/touch/CS000016" data-order="2"
                 data-param="http://sale.feiniu.com/m-49064/touch/CS000016" data-type="21"> <img
            src="http://img02.fn-mart.com/C/web/layout/kk/20160726/201607260856321469494592_kk-1.jpg" title="" alt="">
          </a></li>
        </ul>  <!-- 自定义1+1 1+n n+1 1*1 1*n n*n 大促四色 E -->
      </div>

      <div class="ind_box relative new " data-title="">  <!-- 如果不是八个ICON和秒杀区块, 显示一段文字类似"飞牛快报" S -->
        <!-- 自定义1+1 1+n n+1 1*1 1*n n*n 大促四色 S -->
        <ul class="ind_flex clo_1">
          <li><a href="http://sale.feiniu.com/m-48445/touch/CS000016" data-order="0"
                 data-param="http://sale.feiniu.com/m-48445/touch/CS000016" data-type="21"> <img
            src="http://img03.fn-mart.com/C/web/layout/kk/20160726/201607260857191469494639_kk-1.jpg" title="" alt="">
          </a></li>
        </ul>  <!-- 自定义1+1 1+n n+1 1*1 1*n n*n 大促四色 E -->
      </div>

      <div class="ind_box relative new no_blank" data-title="店铺推荐">  <!-- 如果不是八个ICON和秒杀区块, 显示一段文字类似"飞牛快报" S -->
        <div class="custom-title J_banner_title" title="店铺推荐" data-href="http://sale.feiniu.com/m-45782/touch/CS000016"
             style='background-color:#f2f2f2'>
          <div class="left"><p class="line"></p>
            <p style="color:#333333">店铺推荐</p>
            <p class="line"></p>
          </div>
          <div class="right"><p style="color: #000000">查看更多店铺</p>  <img
            src="http://preview-member-fnapp.feiniu.com/images/home_icon/more_2x.png"></div>
        </div>  <!-- 店铺推荐 S -->
        <div class="store">
          <ul class="store_list">
            <li>
              <div class="list_top">
                <div class="left">
                  <img src="http://ued.dev.fn.com:8080/imgx/124x124/00ffff/fff.png" alt="">
                </div>
                <div class="right">
                  <img src="http://ued.dev.fn.com:8080/imgx/62x62/00ffff/fff.png" alt="">
                  <img src="http://ued.dev.fn.com:8080/imgx/62x62/00ffff/fff.png" alt="">
                </div>
              </div>
              <div class="btm">
                <div class="store_img">
                  <img src="http://ued.dev.fn.com:8080/imgx/33x33/00ffff/fff.png" alt="">
                </div>
                <div class="store_det">
                  <p class="store_title">耐克品牌旗舰店</p>
                  <p class="store_ws">原创设计</p>
                </div>
              </div>
            </li>
            <li>
              <div class="list_top">
                <div class="left">
                  <img src="http://ued.dev.fn.com:8080/imgx/124x124/00ffff/fff.png" alt="">
                </div>
                <div class="right">
                  <img src="http://ued.dev.fn.com:8080/imgx/62x62/00ffff/fff.png" alt="">
                  <img src="http://ued.dev.fn.com:8080/imgx/62x62/00ffff/fff.png" alt="">
                </div>
              </div>
              <div class="btm">
                <div class="store_img">
                  <img src="http://ued.dev.fn.com:8080/imgx/33x33/00ffff/fff.png" alt="">
                </div>
                <div class="store_det">
                  <p class="store_title">耐克品牌旗舰店</p>
                  <p class="store_ws">原创设计</p>
                </div>
              </div>
            </li>
            <li>
              <div class="list_top">
                <div class="left">
                  <img src="http://ued.dev.fn.com:8080/imgx/124x124/00ffff/fff.png" alt="">
                </div>
                <div class="right">
                  <img src="http://ued.dev.fn.com:8080/imgx/62x62/00ffff/fff.png" alt="">
                  <img src="http://ued.dev.fn.com:8080/imgx/62x62/00ffff/fff.png" alt="">
                </div>
              </div>
              <div class="btm">
                <div class="store_img">
                  <img src="http://ued.dev.fn.com:8080/imgx/33x33/00ffff/fff.png" alt="">
                </div>
                <div class="store_det">
                  <p class="store_title">耐克品牌旗舰店</p>
                  <p class="store_ws">原创设计</p>
                </div>
              </div>
            </li>
            <li>
              <div class="list_top">
                <div class="left">
                  <img src="http://ued.dev.fn.com:8080/imgx/124x124/00ffff/fff.png" alt="">
                </div>
                <div class="right">
                  <img src="http://ued.dev.fn.com:8080/imgx/62x62/00ffff/fff.png" alt="">
                  <img src="http://ued.dev.fn.com:8080/imgx/62x62/00ffff/fff.png" alt="">
                </div>
              </div>
              <div class="btm">
                <div class="store_img">
                  <img src="http://ued.dev.fn.com:8080/imgx/33x33/00ffff/fff.png" alt="">
                </div>
                <div class="store_det">
                  <p class="store_title">耐克品牌旗舰店</p>
                  <p class="store_ws">原创设计</p>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div class="search_btm" id="btmSearchBox"><p class="search_btm_box J_search_btm">
        <input type="text" value="" id="btmSearch" placeholder="搜索商品"/></p>
      </div>

      <!-- 底部搜索 E --> <!-- 页面底部 --> <!-- 页面底部 -->
      <div class="outbox footer_box"><p class="vpage"><a href="http://local.m.feiniu.com/" class="cur">触屏版</a>
        <a href="javascript:;">电脑版</a></p>
        <p class="copyright">Copyright © 2013-2016 飞牛网,ALL Rights Reserved.<br/>沪ICP备13025776号 营业执照</p>
      </div>

    </scroller>

    <div id="footNavOutBox">
      <div class="foot_nav" id="footNav">
        <ul class="clearfix foot_ul_number_5">
          <li>
            <router-link to="/index">
              <img class=""
                   src="http://img04.fn-mart.com/C/web/layout/kk/20160511/201605111645361462956336_kk-11.png">
              <p>首页</p>
            </router-link>
          </li>
          <li>
            <router-link to="/order">
              <img class=""
                   src="http://img01.fn-mart.com/C/web/layout/kk/20160511/201605111645191462956319_kk-1.png">
              <p>商品分类</p>
            </router-link>
          </li>
          <li>
            <router-link to="/index">
              <img class="float_img"
                   src="http://img04.fn-mart.com/C/web/layout/kk/20160608/201606081015021465352102_kk-1.png">
              <p></p>
            </router-link>
          </li>
          <li>
            <router-link to="/cart">
              <img class=""
                   src="http://img01.fn-mart.com/C/web/layout/kk/20160511/201605111644181462956258_kk-1.png">
              <i class="cartnum hide J_navCartNumId"></i>
              <p>购物车</p>
            </router-link>
          </li>
          <li>
            <router-link to="/userCenter">
              <img class=""
                   src="http://img05.fn-mart.com/C/web/layout/kk/20160511/201605111643051462956185_kk-11.png">
              <p>我的飞牛</p>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {mapGetters, mapActions, mapMutations, mapState} from 'vuex'

  /**
   * 第三方组件
   */
  import {
    swiper,
    swiperSlide
  } from 'vue-awesome-swiper'


  /**
   * 模块组件
   */
  import {
    fnIndexCountdown,
    fnIndexNavigatorIcon,
    fnIndexNavigatorImages
  } from "components/index/index"


  /**
   * 项目公共组件
   */

  import fnAppdown from "./../components/common/fn-appdown"


  import scroller from "components/common/scroll/components/Scroller.vue"

  /**
   * 热词 模拟数据
   * @type {*[]}
   */
  const hotKeywords = [
    {"title": "米", "url": ""},
    {"title": "油", "url": ""},
    {"title": "抽纸", "url": ""},
    {"title": "休闲零食", "url": ""},
    {"title": "沐浴露", "url": ""},
    {"title": "奶粉", "url": ""},
    {"title": "牛奶", "url": ""},
    {"title": "卫生巾", "url": ""},
    {"title": "洗发水", "url": ""},
    {"title": "手机", "url": ""}
  ];


  export default {
    data(){

      return {
        imagesList: [
          "http://img01.fn-mart.com/C/web/layout/kk/20160725/201607251756581469440618_kk-1.jpg",
          "http://img01.fn-mart.com/C/web/layout/kk/20160725/201607251756581469440618_kk-1.jpg",
          "http://img01.fn-mart.com/C/web/layout/kk/20160725/201607251756581469440618_kk-1.jpg",
          "http://img01.fn-mart.com/C/web/layout/kk/20160725/201607251756581469440618_kk-1.jpg"
        ],
        iconlist: [
          "http://img06.fn-mart.com/pic/a13e133a1fbadcaee89d/hz8zzz7nFTfdBlUgjz/1YoaSRLG2avRTa/CsmRslgGzsaAbiGUAABCLjUbLhk163_org_q75s500.png",
          "http://img06.fn-mart.com/pic/d383133a1fb5dcafa576/Bnq2zz72_2fMKdudf2/1YmRmafGoGpGpY/CsmRr1gGztKATxVDAAA3VBmSEGo845_org_q75s500.png",
          "http://img04.fn-mart.com/pic/3704133a1fb0dcafd1ba/h2Hn22szD2CgKMZMtn/79SGmRfaoGPGMG/CsmRsFgGztWAD_nOAABCvDHKfZE195_org_q75s500.png",
          "http://img04.fn-mart.com/pic/f86f133a1fb4dcb02c1b/hzq2221nv2tdhlugf2/5xmRoatRmGPRMa/CsmRsFgGztqAV5mTAAA2nE09VMY992_org_q75s500.png",
          "http://img04.fn-mart.com/pic/09e7133a1fbedcb062d1/hT82227nvnClKMZljT/5xeamRLaTR_R2a/CsmRslgGzt6AOqxEAAAxywPwGqg708_org_q75s500.png",
          "http://img04.fn-mart.com/pic/1d49133a1fbcdcb5e1c0/BT62nn72_zClhdZMX2/sYSReGfa2RFaTR/CsmRslgGzw6APNqBAAA6-fE9ybQ614_org_q75s500.png",
          "http://img02.fn-mart.com/pic/4bb5133a1fb9dcb68c59/h26n22sT_2tMKludLn/7YSySGtaoaWyWi/CsmRr1gGzvSAdpb2AAAsha1QbHc098_org_q75s500.png",
          "http://img02.fn-mart.com/pic/412d133a25c719bc368e/hn8T225nD2LMklVdfn/5xSGeaCRfGTRpy/CsmRr1grylOAe1j3AAAYxcblbwc741_org_q75s500.png",
          "http://img02.fn-mart.com/pic/6234133a1fb7dcb9a99e/hn8zzz7zvntgBdZlX2/5YmRSyLGzaDany/CsmRsVgGzvmAQczEAAAwGHmm3hw450_org_q75s500.png",
          "http://img03.fn-mart.com/pic/7369133a1fbadcb538a4/Kz6Tnn72FztdBlul3z/1Yeamata2GFRTa/CsmRsVgGzwOAZ5rQAAAu74AIIKI741_org_q75s500.png"
        ],
        countDown: {
          endTime: "1787716050"
        },
        keywords: hotKeywords[0]["title"],
        swiperOption: {
          pagination: '.swiper-pagination',
          paginationClickable: true,
          slidesPerView: 'auto'
        },
        hasTopClass: true

      }

    },
    created(){
      $.indicator.open('加载中...');
    },

    mounted() {

      this.top = 1
      this.bottom = 20

      setTimeout(() => {
        this.$refs.my_scroller.resize()
      })

//      $.toast("~亲 ,加入购物车失败,请重新加入");


//      $.messagebox({
//        title: 'I\'m a title',
//        message: 'I\'m a message',
//        type: 'success',
//        showCancelButton: true
//      }, function(action) {
//        console.log('callback:', action);
//        $.messagebox('Clicked: ' + action);
//      });

      setTimeout(()=>{
        $.indicator.close();
      },2000)

      /**
       * 滚动 显示头部
       */
      window.addEventListener('scroll', () => {
        let scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
        if (scrollTop !== 0) {
          this.hasTopClass = false
        } else {
          this.hasTopClass = true
        }
      })

      /**
       * 循环显示热词推荐
       * @type {number}
       */
      let searchWordIndex = 0;
      window.setInterval(() => {
        searchWordIndex++;
        if (searchWordIndex == hotKeywords.length) {
          searchWordIndex = 0;
        }
        this.keywords = hotKeywords[searchWordIndex]["title"];
      }, 5000)

    },
    computed: {
      ...mapState({

      }),
      // 处理 打开app 的 密令
      dealAppUrl(){
        return "GetSMbyKey?keywords=";
      }
    },
    methods: {
      ...mapActions([]),
      ...mapMutations({
        setAllLoading: 'SET_ALL_LOADING'
      }),
      changeData () {
        this.value2 = ['430000', '430400', '430407']
      },
      getName (value) {
        let rs = map(value, (one, index) => {
          return find(list, item => {
            return item.value === one
          })
        })
        return map(rs, one => {
          return one.name
        }).join(' ').replace('--', '')
      },
      logHide (str) {
        console.log('on-hide', str)
      },
      logShow (str) {
        console.log('on-show')
      },


      refresh() {
        $.toast("数据刷新中");
        setTimeout(() => {
          this.$refs.my_scroller.finishPullToRefresh()
        }, 1500)
      },

      infinite() {
        setTimeout(() => {
          let start = this.bottom + 1
          for (let i = start; i < start + 10; i++) {
            this.items.push(i + ' - keep walking, be 2 with you.')
          }
          this.bottom = this.bottom + 10;

          setTimeout(() => {
            this.$refs.my_scroller.finishInfinite()
          })
        }, 1500)
      },

      onItemClick(index, item) {
        console.log(index)
      }
    },
    components: {
      swiper,
      scroller,
      fnAppdown,
      swiperSlide,
      fnIndexCountdown,
      fnIndexNavigatorIcon,
      fnIndexNavigatorImages
    }
  }
</script>

<style scoped>
  @import "~assets/css/index/index.css";
</style>
