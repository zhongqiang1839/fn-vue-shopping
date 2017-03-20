<template>
    <!-- 热门推荐 -->
    <div>
        <template v-if="isShow">
            <div class="hot_recommended" v-for="list in recommendList">
                <div class="hot_recommend" id="J_hot_recommend"><h2><img
                        src="http://static-m.beta1.fn/static/img/v2/recommend.png">热门推荐</h2></div>
                <fn-list-page :merchandise-list="list.MerchandiseList"
                              :list-btn.sync="listBtn"
                              :page-size="pageSize">
                </fn-list-page>
            </div>
        </template>

        <!--</div>-->
        <!-- 滚动列表 -->
        <template v-if="isShowSlider">
            <div class="guess_love" v-for="list in recommendList">
                <div class="gl_title">
                    <div>{{list.keyword}}</div>
                    <div @click="more(list.keyword)">查看更多</div>
                </div>
                <fn-slider :pages="list.MerchandiseList" :sliderinit="sliderinit"></fn-slider>
            </div>

        </template>
    </div>


</template>
<style>

</style>
<script>
    import {recKeywordSearch} from '../../services/bigDataService';
    import {fnListPage} from 'components/list/index'
    import fnSlider from './fn-slider'
    export default{
        props: {
            pageSize: Number,
            listBtn: Boolean,
            baseRequstBody: Object
        },
        data(){
            return {
                isShow: false,
                isShowSlider: false,
                recommendList: [],
                sliderinit: {
                    currentPage: 1,
                    start: {},
                    end: {},
                    tracking: false,
                    thresholdTime: 500,//滑动时间阈值判定距离
                    thresholdDistance: 100//滑动距离阈值
                }
            }
        },
        created(){
            let self = this;
            let baseRequestBody = self.baseRequstBody;
            let newData = {
                'is_attribute': 1,
                'is_category': 1
            };
            Object.assign(baseRequestBody,newData);
            self.$on('start-bigdata', () => {
                self.load(baseRequestBody);
            });


        },
        methods: {
            load(params){
                let self = this;
                //请求大数据接口
                recKeywordSearch({body: params}).then((res)=> {
                    let data = res.body;
                    let type;
                    if (res.errorCode === 0 && data.recommendList.length > 0) {
                        self.recommendList = data.recommendList || [];
                        type = data.type; //type 1 滚动列表 type 3 下拉列表
                        self.isType(type);

                        self.render(self.recommendList) //渲染列表数据
                    } else {
                        self.recommendList.length = 0;
                    }

                }, (res)=> {
                    console.log(res);
                })
            },
            render(data) {
                let self = this;
                self.recommendList = data;
            },
            more(keyword){
                this.$router.go({
                    name: 'searchPage',
                    query: {kw: keyword},
                    replace: true
                });
            },
            isType(type){
                let self=this;
                if (type == 2) {
                    self.isShowSlider = true;
                    self.isShow = false;
                } else {
                    self.isShow = true;
                    self.isShowSlider = false;
                }
            }

        },
        components: {
            fnListPage,
            fnSlider
        }
    }
</script>
