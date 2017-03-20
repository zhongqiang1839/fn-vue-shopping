<template>
  <div>
    <fn-appdown></fn-appdown>
    <!--<slot></slot>-->
    <div class="wrapper">
      <div class="fn_list_searchBar">
        <div class="back" @click="backNextpage"></div>
        <div class="search_box">
          <input type="text"
                 placeholder="搜索商品"
                 v-model.trim="msg"
                 :value="keys"
                 @keyup="msgKeyup()"
                 @keyup.enter="doSearchEvent()"
                 @focus.stop="msgKeyup()"
          >

          <span class="close iconfont" v-show="showCloseIcon" @click="clearInputMsg">&#xe66a;</span>
        </div>
        <div class="choice" @click.stop="filterShow">筛选</div>
        <span class="iconfont top_navigator" :class="{active:isActive}" @click="changeImagePattern">&#xe684;</span>
      </div>
    </div>

    <!--公共头部-->
    <fn-top-nav :class="{showNav:showNav}"></fn-top-nav>

    <!--搜索结果-->
    <list-search-suggestion v-show="searchSuggestShow"
                            :suggest-data="suggestData"
    />
  </div>
</template>
<style>
  .good_search {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

  .set > * {
    display: block;
  }

  .top_navigator {
    padding-right: .24rem;
    font-size: .36rem;
  }

  .set .J_sx {
    white-space: nowrap;
    margin: .1rem;
  }

  .J_srch_submit {
    font-size: .4rem;
    color: #888;
    position: absolute;
    left: 8px;
    top: 5px;
    z-index: 9999;
  }

  .fn_list_container .icon_tab_name {
    padding-right: 0.24rem;
  }

  .fn_list_container .active {
    color: rgb(194, 0, 83);
  }
</style>
<script type="text/ecmascript-6">

  import fnAppdown from "../common/fn-appdown.vue";
  import listSearchSuggestion from './fn-search-suggestion';
  import * as listServices from '../../services/listService';


  //顶部 导航
  import fnTopNav from "../common/fn-top-nav";

  export default{

    props: {
      bodyFilters: Array,
      show: Boolean
    },
    data(){
      return {
        msg: '',
        suggestData: [],
        keys: '',
        isActive: false,
        showNav: false,             //展示顶部导航 开关
        searchSuggestShow: false   //是否展示搜索结果 开关
      }
    },
    mounted(){
      if (this.$route.name === "searchPage") {
        this.keys = this.$route.query.kw.replace('+', ' ');
      }
    },
    computed: {
      showCloseIcon(){
        return this.msg != '';
      }
    },
    filters: {
      suggestDataFilter(){
        //数据预处理
        return this.suggestData.filter(function (obj) {
          if (obj.customKeyword || obj.campaign) {
            return false;
          }
          return true;
        });
      }
    },
    methods: {
      backNextpage(){
        window.history.go(-1)
      },
      changeImagePattern(){
        this.isActive = !this.isActive
        this.showNav = !this.showNav
      },
      //搜索框中回车
      doSearchEvent(){
        //回车先关闭 搜索结果
        this.searchSuggestShow = false;

        if (this.msg === "") {
          $.toast("搜索关键字不能为空");
        } else {
          //关键字不为空的时候,进行搜索

        }
      },
      msgKeyup(e){


        if (this.msg === '') {
          if (e && e.keyCode == 13) {
            $.toast({
              message: '搜索关键字不能为空',
              position: 'center',
              duration: 1500
            });
          }
          return;
        }

        if (e && e.keyCode == 13) {//兼容手机浏览器enter键
          this.searchSuggestShow = false;
          this.getRequestLink(data);//飞牛密令跳转
          return;
        }

        let data = {
          body: {
            keyword: this.msg
          }
        };
        listServices.getSearchSuggestion(data).then((res) => {
          if (res.code == 0 && res.data) {
            this.searchSuggestShow = true;
            if (res.data.Keywords) {
              debugger
              this.suggestData = this.preDealSuggest(res.data.Keywords);
            }
          }
        }, function (res) {
          console.log('请求搜索结果接口失败');
        });
      },
      getRequestLink(data){
        listServices.getLink(data).then((res)=> {
          if (res.errorCode === 0 && res.isActivity == 1) {
            window.location.href = res.link;
          }
        }, (res)=> {
          console.log(res);
        });
      },
      getSearch(msg, cate){
//        this.$dispatch('search-event', msg, cate);
        this.msg  = msg;
        this.cate = cate;
      },
      //处理接口返回的数据,将categoryList拆分
      preDealSuggest(arr){
        debugger
        for (let i = 0; i < arr.length; i++) {
          if (arr[i].categoryList && arr[i].categoryList.length > 0) {
            let categoryArr = [{
              categoryList: [],
              content: arr[i].content,
              displayTitle: arr[i].displayTitle,
              keyword: arr[i].keyword,
              type: arr[i].type
            }];
            for (let k = 0; k < arr[i].categoryList.length; k++) {
              categoryArr.push({
                categoryList: [{
                  cp_name: arr[i].categoryList[k].cp_name,
                  cp_seq: arr[i].categoryList[k].cp_seq
                }],
                content: arr[i].content,
                displayTitle: arr[i].displayTitle,
                keyword: arr[i].keyword,
                type: arr[i].type
              });
            }
            arr.splice(i, 1, ...categoryArr);
            i = i + categoryArr.length;
            categoryArr = [];
          }

        }
        debugger
        return arr;
      },
      /*点击搜索框中的清除按钮，清除input内容*/
      clearInputMsg(){
        this.msg = '';
      },
      /*点击筛选按钮*/
      filterShow(){
//        this.$dispatch('other-close');//关闭其它组件里打开的弹层
        this.searchSuggestShow                        = false;
        this.show                                     = true;
        document.querySelector('body').style.overflow = 'hidden';
        document.querySelector('html').style.overflow = 'hidden';
//        this.$dispatch('child-search');
      }
    },
    components: {
      fnAppdown,
      listSearchSuggestion,
      fnTopNav
    }
  }

</script>




