<template>
    <div>
        <div class="weui_mask_transition" :class="{weui_fade_toggle:show}" @click="maskBox">
        </div>
        <div class="outbox" :class="{leavebox:!show,toggle:show,delivery:showAddress}">
            <!-- 筛选第一层 S -->
            <div class="filter_box">
                <div class="" data-tab-bk="sx" style="z-index: 1;">
                    <div class="filter_title" @click="filterCancel">
                        <i data-tab="sx">取消</i>
                        <h3>筛选</h3></div>
                    <div class="filter_w">
                        <ul class="filter_ul filter_ul_btn" id="filter_ul">

                            <li class="ps" data-icon2="&#xe602;" data-icon="&#xe60b;">
                                <p>配送至</p>
                                <p class="main_color" id="J_delivery_txt" v-if="filter_address.area"
                                   @click.stop="showAddress=true">
                                    {{filterName}}
                                </p>
                            </li>

                            <li class="globalFilter clearfix" data-icon2="&#xe602;" data-icon="&#xe60b;">
                                <p v-for="child in filter_1Children" :data-key="child.key" :data-name="child.name"
                                   class="global" :class="{current:child.isSelected}"
                                   @click="child.isSelected=!child.isSelected">
                                    {{child.name}}</p>
                            </li>

                            <li>
                                <div class="pe_qj"><p>价格区间:</p>
                                    <input type="number" class="fnwap_input" placeholder="最低价" v-model="minPrice">
                                    <p>—</p>
                                    <input type="number" class="fnwap_input" placeholder="最高价" v-model="maxPrice">
                                </div>
                            </li>
                            <li v-if="categoryShow" class="marginb" data-icon2="&#xe602;" data-icon="&#xe60b;"
                                @click="listBtn">
                                <p>分类</p>
                                <div id="_txt" class="main_color">{{classifiyStatus}}</div>
                            </li>

                            <!--<template v-for="(index, children) in filter_2Children">-->
                                <!--<li class="fold filter_attr"-->
                                    <!--:class="{show:children.active}"-->
                                    <!--data-icon3="&#xe623;"-->
                                    <!--data-icon="&#xe60b;"-->
                                    <!--@click="upDown($index)">-->
                                    <!--<p>{{children.at_name}}</p>-->
                                    <!--<div v-if="!getSelectedTypeByIndex($index)">全部</div>-->
                                    <!--<div v-if="getSelectedTypeByIndex($index)" class="main_color"-->
                                         <!--:data-index="$index">-->
                                        <!--{{getSelectedTypeByIndex($index)}}-->
                                    <!--</div>-->
                                <!--</li>-->
                                <!--<li class="globalFilter filter_attr"-->
                                    <!--data-icon2="&#xe602;"-->
                                    <!--data-icon="&#xe60b;"-->
                                    <!--:index-active="$index">-->
                                    <!--<p @click="filterEvent(child,this.$parent.$index)"-->
                                       <!--:index="index"-->
                                       <!--:is-active="isActive" v-for="child in children.child" :data-avseq="child.av_seq"-->
                                       <!--:class="{current:child.isSelected}">-->
                                        <!--{{child.av_name}}</p>-->
                                <!--</li>-->

                            <!--</template>-->
                        </ul>
                    </div>
                    <div class="filter_btn">
                        <div class="w_reset" id="J_reset" @click="resetBtn">重置</div>
                        <div class="w_confirm" id="J_confirm" @click="confirmBtn">确定</div>
                    </div>
                </div>
                <!-- 筛选第一层 E -->
                <!-- 筛选第二层 - 分类S -->
                <div class="three_level" :class="{hide_it:listShow}">
                    <div class="filter_title">
                        <i class="iconfont J_z2_cancel" @click="cancelBack"></i>
                        <h3>分类</h3>
                        <div @click="cateConfirm">确定</div>
                    </div>
                    <div class="t_content">
                        <dl class="Bbottom"
                            v-for="children in filter_ClassifiyChildren"
                            :class="{fold:!children.isOpen && $index!==0,unfold:children.isOpen && $index!==0}">
                            <dt class="s" :class="{cur:$index==0 && children.allCate}"
                                @click="listClassBtn(children,children.allCate)">
                                {{children.cp_name}}
                            </dt>
                            <dd class=" Btop" v-for="child in children.children" @click="listChildBtn(child)"
                                :class="{current:child.isRadio}">
                                {{child.cp_name}}
                            </dd>
                        </dl>
                    </div>
                </div>

            </div>
            <!-- 筛选第二层 - 地址分类E -->
            <fn-address v-if="showAddress" v-clickoutside="showAddress=false"
                        :address-name.sync="addressName" :is-cache="isCache"></fn-address>

        </div>
    </div>
</template>
<style>
    .fn_list_container .weui_fade_toggle {
        display: block;
        width: 100%;
    }

    .fn_list_container .outbox {
        height: 100%;
        top: 0;
        right: 0;
        bottom: 0;
        background: red;
        margin: 0;
        width: 80%;
        overflow: hidden;
    }

    .fn_list_container .delivery {
        width: 100%;
        background: red;
    }

    .fn_list_container .filter_ul > li.globalFilter > p.current {
        border: 1px solid #d6005b;
        background: #d6005b !important;
        color: #fff;
    }

    .fn_list_container .filter_ul > li.fold.show + .globalFilter {
        height: auto;
        overflow: visible;
    }

    .fn_list_container .filter_ul > li:after {
        transform: rotate(90deg);
    }

    .fn_list_container .filter_ul > li.show:after, .fn_list_container .filter_ul > li.marginb:after, .fn_list_container .filter_ul > li.ps:after {
        transform: none;
    }

    .fn_list_container .three_level dl dd {
        position: relative;
    }

    .region_title {
        position: relative;
        z-index: 10;
        display: -webkit-box;
        display: -webkit-flex;
        display: -moz-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -webkit-align-items: center;
        -moz-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        height: .8rem;
        border-bottom: 1px solid #d5d5d5;
        padding: 0 .24rem;
        background: #f9f9f9;
    }

    .fn_list_container .three_level {
        -webkit-transition: .2s;
        -o-transition: .2s;
        transition: .2s;
        height: 100%;
        right: 0;
        position: absolute;
        top: 0;
        background: #fff;
        z-index: 22;
    }

    .selPs {
        position: relative;
        z-index: 1;
        padding: .2rem .24rem;
        background-color: #eee;
    }

    .autocomplete-suggestions .autocomplete-suggestion, .selPs {
        border-bottom: 1px solid #d5d5d5;
        color: #666;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    .fn_list_container .outbox {
        background: none;
        position: fixed;
        z-index: 9999;
        -webkit-transition: -webkit-transform .2s cubic-bezier(0, 0, .25, 1);
        transition: transform .2s cubic-bezier(0, 0, .25, 1);
    }

    .fn_list_container .leavebox {
        -webkit-transform: translate3d(120%, 0, 0);
        transform: translate3d(120%, 0, 0);
    }

    .fn_list_container .outbox > *, .filter_box > div {
        -webkit-transition: .2s;
        transition: .2s;
        height: 100%;
        right: 0;
        position: absolute;
        top: 0;
        width: 95%;
        background: #fff;
    }

    .fn_list_container .toggle {
        -webkit-transform: translate3d(0, 0, 0);
        transform: translate3d(0, 0, 0);
    }

    .fn_list_container .filter_ul > li.globalFilter > p.global {
        background: #eee;
    }

    .fn_list_container .filter_box {
        position: relative;
        height: 100%;
        width: 85%;
        overflow: hidden;
        background: inherit;
        min-width: 320px;
        margin-left: 15%;
        float: right;
        max-width: 800px;
    }

    .toggle .region_widget, .region_widget .reoutbox .site {
        width: 100%;
        padding-left: 20%;
        background: none;
    }

    .fn_list_container .three_level dl dt.cur:after {
        position: absolute;
        font-family: iconfont !important;
        font-size: .4rem;
        font-style: normal;
        content: '\E602';
        right: .24rem;
        top: 0;
    }

    .fn_list_container .three_level dl dt.cur {
        color: #c70034;
    }

    .fn_list_container .filter_ul > li.globalFilter > p, .fnwap_input {
        background: #eee;
    }
    .fn_list_container .filter_ul>li.globalFilter>p{
        border:none;
    }
</style>

<script>

    import {getCateTree} from '../../services/listService';
    import fnAddress from 'components/list/fn-address';

    export default {
        props: {
            bodyFilters: Array,
            categoryList: Array
        },
        data(){
            return {
                show:false,
                minPrice: '',
                maxPrice: '',
                listShow: true,
                isAll: true,
                showAddress: false,
                addressName: '',
                areaCode: '', //设置地址编号
                areaName: '', //设置地址名
                isCache: false
            };
        },
        mounted(){

        },
        computed: {
            filter_address(){
                return this.bodyFilters.length !== 0 ? this.bodyFilters[0].distribution : '';
            },
            filter_1Children (){
                return this.bodyFilters.length !== 0 ? this.bodyFilters[1].children : [];
            },
            filter_2Children (){
                return this.bodyFilters.length !== 0 ? this.bodyFilters[2].children.filter(function (value) {
                    return value.at_name;
                }) : [];
            },
            //分类列表数组对象
            filter_ClassifiyChildren(){
                return this.cateGoryList || [];
            },
            filter_listChildren(){
                return this.categoryList ? this.cateGoryList.slice(1, this.catGoryList.length) : [];
            },
            filter_ListChild(){
                if (this.bodyFilters.length == 0)
                    return [];
                this.bodyFilters[2].children = this.bodyFilters[2].children ? this.bodyFilters[2].children : [];
                this.bodyFilters[2].children[1] = this.bodyFilters[2].children[1] ? this.bodyFilters[2].children[1] : {};
                this.bodyFilters[2].children[1].child = this.bodyFilters[2].children[1].child ? this.bodyFilters[2].children[1].child : [];
                return this.bodyFilters[2].children[1].child[1] ? (this.bodyFilters[2].children[1].child[1].children ? this.bodyFilters[2].children[1].child[1].children : []) : [];
            },
            filterBaseName(){
                //默认存在cookie里的地址
                return this.filter_address.province.name + this.filter_address.city.name + this.filter_address.area.name + this.filter_address.town.name
            },
            filterName(){
                return this.addressName || this.filterBaseName
            },
            //判断是否有分类数据,是否展示分类列表
            categoryShow(){
                return this.cateGoryList ? true : false;
            },
            selectedBrand(){
                var selected = [];
                this.filter_2Children.forEach(item=> {
                    selected.push(item.child.filter(temp=> {
                        return temp.isSelected;
                    }))
                });
                return selected;
            },
            selectedTypes(){
                var selected = [];
                this.filter_2Children.forEach(item=> {
                    selected = selected.concat(item.child.filter(temp=> {
                        return temp.isSelected
                    }));
                });
                return selected;

            },
            getCateTypes(){ //获取选中的分类
                let cate = '';
                this.cateGoryList.slice(1, this.cateGoryList.length).forEach(item=> {
                    item.children.filter(temp=> {
                        if (temp.isRadio) {
                            cate = temp.cp_seq;
                        }
                    })
                });

                return cate;


            },
            selectedGlobalFilter(){
                var filterList = [];
                filterList = filterList.concat(this.filter_1Children.filter(item=> {
                    return item.isSelected;
                }))
                return filterList;
            },
            getGlobalFilter(){
                let terms = {};
                let arrSelect = [];
                arrSelect = this.selectedGlobalFilter.map(item=> {
                    return item.key;
                });
                arrSelect.forEach(item=> {
                    terms[item] = 1;
                });
                return terms;
            },
            getFilter(){
                return this.selectedTypes.map(item=> {
                    return item.av_seq;
                });
            },
            getPrice(){
                return {
                    "min": this.minPrice,
                    "max": this.maxPrice
                }
            },
            getAreaCode(){
                //如果没有选择地址,就读取cookie里面的地址
                return this.areaCode || $.cookie.getH5("siteid");
            },
            classifiyStatus(){
                let cateName = '';
                this.cateGoryList.slice(1, this.cateGoryList.length).forEach(item=> {
                    item.children.filter(temp=> {
                        if (temp.isRadio) {
                            cateName = temp.cp_name;
                        }
                    })
                });
                return cateName;
            }
        },
        filters: {},
        methods: {
            upDown(index){//展开下拉切换效果
                this.filter_2Children[index].active = !this.filter_2Children[index].active;
            },
            filterEvent(item, parentIndex){　//品牌选项事件
                this.filter_2Children[parentIndex].isAll = false;
                item.isSelected = !item.isSelected;
            },
            filterCancel(){
                this.$dispatch('close', false);
                document.querySelector('body').style.overflow = 'auto';
                document.querySelector('html').style.overflow = '';
            },
            getSelectedTypeByIndex(index){
                debugger
                return this.selectedBrand[index].map(item=> {
                    return item.av_name;
                }).join(',');
            },
            allBtn(){ //全部分类
                this.isAll = !this.isAll;
                this.listChildFalse();
            },
            listBtn(){ //分类
                this.listShow = false;
//                this.$dispatch('changebrand', false);

            },
            listClassBtn(item, allCate){ //列表展示收起
                if (allCate !== undefined) {
                    this.filter_ClassifiyChildren[0].allCate = true;
                }
                this.filter_ClassifiyChildren.forEach(temp=> {
                    if (temp !== item) {
                        temp.isOpen = false;
                    }
                })
                item.isOpen = !item.isOpen;
            },
            listChildFalse(){ //列表子类清除
                this.cateGoryList.slice(1, this.cateGoryList.length).forEach(item=> {
                    item.children.forEach(temp=> {
                        temp.isRadio = false;
                    })
                })
            },
            listChildBtn(item){  //列表子类
                this.filter_ClassifiyChildren[0].allCate = false;  //选中任意子类，全部分类设为未选中
                this.listChildFalse();
                item.isRadio = !item.isRadio;
            },
            cancelBack(){
                this.listShow = true;
            },
            confirmBtn(){ //确定按钮
                this.$emit('condition-query', { //触发父级events方法
                    filters: this.getFilter,
                    terms: this.getGlobalFilter,
                    search_price: this.getPrice,
                    cate: this.getCateTypes,
                    areaCode: this.getAreaCode
                });
                $.cookie.add('siteid', this.areaCode); //存取地址编号放在cookie中
                $.cookie.add('sitename', this.areaName);  //存取地址名
                this.isCache = true;
                this.$dispatch('close', false);
                document.querySelector('body').style.overflow = 'auto';
            document.querySelector('html').style.overflow = '';
            },
            cateConfirm(){ //分类确定
                this.$emit('condition-query', {cate: this.getCateTypes}, true);
                this.listShow = true; //第二层列表关闭
            },
            resetBtn(){ //重置按钮
                this.filter_2Children.forEach(item=> {
                    item.isAll = true;
                })
                this.selectedGlobalFilter.map(item=> {
                    return item.isSelected = false;
                });
                this.listChildFalse();
                this.minPrice = '';
                this.maxPrice = '';
                this.selectedTypes.map(item=> {
                    return item.isSelected = false;
                })

            },
            maskBox(){
                this.listShow = true;
                document.querySelector('body').style.overflow = 'auto';
                document.querySelector('html').style.overflow = '';
            }
        },
//        events: {
//            'address-show': function (isShow, getAreaCode, getAreaName, getAddressName) { //选择地址状态成功后传选中的值过来
//                this.showAddress = isShow;
//                this.areaCode = getAreaCode; //接收到已选中的地址区
//                this.areaName = getAddressName;
//                this.$dispatch('get-area-name', getAreaName);
//            },
//            'show-address': function () { //地址栏模板隐藏
//                this.showAddress = false;
//            }
//        },
        components: {
            fnAddress
        }

    }

    /*
     *
     * filter_0Children: bodyFiltersilter[0].children,
     filter_1Children: bodyFilter[1].children,
     filter_2Children: bodyFilter[2].children
     * */

</script>
