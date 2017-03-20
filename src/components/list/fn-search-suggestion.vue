<template>
  <div class="searchList ">
    <ul>
      <li v-for="suggestObj in suggestData"
          :class="{'categoryList': suggestObj.categoryList && suggestObj.categoryList.length}"
          :data-keyword="suggestObj.keyword"
          :data-category="suggestObj.categoryList && suggestObj.categoryList.length > 0 ? suggestObj.categoryList[0].cp_seq:''"
          @click="goSearch(suggestObj.keyword,suggestObj.categoryList.length > 0 ? suggestObj.categoryList[0].cp_seq:'')">
        <!--客服-->
        <template v-if="suggestObj.customKeyword && suggestObj.customKeyword.length > 0">
          <div class="autocomplete-suggestion unClick custom" v-for="customer in suggestObj.customKeyword">
            <div class="kf"><i class="iconfont"></i><a>{{customer.query_s}}</a>
            </div>
          </div>
        </template>
        <template v-if="suggestObj.categoryList && suggestObj.categoryList.length">
          <div class="good_search" v-for="categoryListObj in suggestObj.categoryList">
            {{suggestObj.displayTitle}} 在 <span>{{categoryListObj.cp_name}}</span> 分类中搜索
          </div>
        </template>

        <template v-if="suggestObj.content && suggestObj.content.length">
          <div class="good_search">{{suggestObj.displayTitle}} {{suggestObj.customKeyword}}</div>
          <div class="good_tag">
            <a href="javascript:;" v-for="contentObj in suggestObj.content">{{contentObj.query_s_sub}}</a>
          </div>
        </template>

        <template
          v-if="suggestObj.categoryList && suggestObj.categoryList.length == 0 && suggestObj.content && suggestObj.content.length == 0">
          <div class="good_search">{{suggestObj.displayTitle}}</div>
        </template>
      </li>
    </ul>
  </div>
</template>
<script>
  export default {
    props: {
      suggestData: Array
    },
    computed: {},
    methods: {
      goSearch(keyword, category){
        let keys = keyword.trim();
        if (category == '') {
          this.$route.router.go({
            name: 'searchPage',
            query: {kw: keys},
            replace: true
          });
        } else {
          this.$route.router.go({
            name: 'searchPage',
            query: {kw: keys, cate: category},
            replace: true
          });
        }
        this.$dispatch('suggestion', {
          key: keys,
          cate: category
        });
      }
    }
  }
</script>

<style>
  .kf i {
    font-size: .42rem;
    vertical-align: middle;
    color: #00f;
  }

  .kf a {
    margin-left: .14rem;
    color: #00f;
    font-size: .28rem;
  }

  .categoryList {
    flex-direction: column;
  }

  .good_tag {
    margin-right: 0 !important;
  }

  .good_tag a {
    margin-right: .18rem;
  }
</style>
