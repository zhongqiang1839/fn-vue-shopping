<template>
    <div>
        <div class="list_nav" v-show="listData.length>0 && !fix">
            <ul class="lv_ul">
                <fn-item v-for="(item, $index) in listData" ref="profile"
                         @click.prevent.stop.native="handleTablistClick(item, $index)"
                         :sort-type="item.sortType"
                         :sort-order="item.isSortOrder"
                         :sort-order-by="sortOrderBy"
                         :sort-name="item.sortName"
                         :class="{synthesize:'0'==$index,up:boolean.up && '0'==$index,cost:'2'==$index,down:boolean.down && '2'==$index,active:item.isActive}">
                </fn-item>
                <!--   促销-->
                <li class="sales_p" v-for="(sales, index) in salesData" :class="{active:sales.isSales}"
                    @click.prevent.stop="salesBtn(index)">
                    <a href="javascript:;">{{sales.sortName}}</a>
                </li>
                <li class="set_list" id="J_set_list" @click="toggleListDisplay" :class="{type_2:bigImagePattern}">
                    <div>
                        <i class="iconfont">&#xe611;</i>
                    </div>
                    <div>
                        <i class="iconfont">&#xe612;</i>
                    </div>
                </li>
            </ul>
        </div>
        <div class="pos">
            <div class="list_wrap" :class="{wrap_hide:!boolean.up}">
                <!--综合下拉-->
                <ul class="select_list">
                    <li v-for="(sel, $index) in selectListData" :class="{current:sel.isSelect}"
                        @click.stop="selectBtn(sel)" :isSortOrder="sel.isSortOrder"
                        :sortType="sel.sortType">
                        <span>{{sel.sortName}}</span></li>
                </ul>
                <div class="mask hide_it"></div>
            </div>
        </div>
        <!--显示快捷菜单-->
        <div class="w_kinds zIndex" v-if="filter_2Children.length>0">
            <ul class="w_kinds_tag" :class="{fixed:fix}">
                <li v-for="(children, $index) in filter_2Children"
                    :class="{tag_active:filter_2Children.length>0 && children.isTabActive && children.isAll,w_red:!children.isAll,active_red:filter_2Children.length<0 && children.isTabActive && children.isAll}"
                    @click="tabSwitch($index,children)">
                    <i>
                        {{getSelectedTypeByIndex($index) || children.at_name}}
                    </i>
                </li>
            </ul>
            <div class="w_kinds_box" :class="{fixed:fix,h:fix}" v-show="selectBox && filter_2Children.length>0">
                <div class="w_kinds_tab">
                    <ul class="w_kinds_menu" 
                        v-for="(children, $index) in filter_2Children"
                        v-show="children.isTabActive"
                        :index-active="$index">
                        <li :class="{active:children.falseAll}" @click="allBtn($index)">全部</li>
                        <li v-for="(child, index) in children.child"
                            :class="{active:child.falseSelected}"
                            @click="filterBtn(child, $index)">
                            {{child.av_name}}
                        </li>

                </div>
                <div class="w_kinds_tab_btn">
                    <div class="btn_reset" @click="btnReset">重置</div>
                    <div class="btn_confirm" @click="btnConfirm">确定</div>
                </div>
            </div>
        </div>
        <div class="fn_list_mask" v-show="boolean.hideIt" @click="maskBtn"></div>
    </div>
</template>
<style>
    .swiper-container{
        background: #fff;
    }
    .pos {
        position: absolute;
        width: 100%;
        overflow: hidden;
    }

    .synthesize.up a::after {
        position: absolute;
        content: '';
        right: .2rem;
        top: 0;
        border-bottom: .1rem solid #c70034;
        border-left: .1rem solid transparent;
        border-top: .1rem solid transparent !important;
    }

    .fn_list_container .fn_list_mask {
        max-width: 800px;
        min-width: 320px;
        display: block;
        z-index: 1;
    }

    .fn_list_container .w_kinds .w_kinds_tab {
        display: block;
    }

    .cost.down a:after {
        border-top: .1rem solid;
        border-bottom: none;
    }

    .list_nav {
        position: relative;
        z-index: 80;
    }

    .list_wrap {
        -webkit-transition: .2s;
        -o-transition: .2s;
        transition: .2s;
        position: relative;
        z-index: 9999;

        height: 3rem;
        overflow: hidden;
    }

    .wrap_hide {
        -webkit-transition: .2s;
        -o-transition: .2s;
        transition: .2s;
        height: 0;
    }

    .fn_list_container .w_kinds {
        position: relative;
        z-index: 2;

    }

    .fn_list_container .zIndex {
        z-index: 998;
    }

    .top_box {
        z-index: 2;
    }

    .select_list {
        position: absolute;
    }

    .fn_list_container .w_kinds .w_kinds_tag li.w_red i, .w_kinds_tag li.w_red i, .w_kinds_tag li.active_red i {
        color: #c70034;
    }

    .wrapper {
        z-index: 999;
        position: relative;
    }

    .fn_list_container .select_list li {
        border-bottom: 1px solid #d5d5d5;
    }

    .fixed {
        position: fixed !important;
    }

    .fn_list_container .w_kinds .h {
        top: 45px;
    }

    .ov {
        overflow: hidden;
    }

    .w_kinds_tag i {
        display: block;
        width: 100%;
        height: .58rem;
        line-height: .58rem;
        border: 1px solid #eee;
        text-align: center;
        border-radius: .04rem;
        margin-top: .14rem;
        padding: 0 .08rem;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    .w_kinds_tag li.w_red i, .w_kinds_tag li.active_cate i {
        color: #c70034;
        background: #f8f8f8;
    }

    .fn_list_container .w_kinds .w_kinds_tag li.tag_active i {
        color: #d6005b;
        background: #f8f8f8;
        border-bottom: none;
        height: .76rem;
        position: relative;
        z-index: 55;
    }
</style>
<script>
    import {mapGetters, mapActions, mapMutations, mapState} from 'vuex'
    import fnItem from './fn-top-item'
    export default{
        data(){
            return {
                selectBox: false,
                sortOrderBy: 2,
                //布尔值对象默认参数
                boolean: {
                    hideIt: false,
                    up: false,
                    down: false
                },
                fix: false
            }
        },
        props: ['bodyFilters'],
        mounted(){
            const me = this;
            window.addEventListener("scroll", function () {
                document.body.scrollTop >= 100 ? me.fix = true : me.fix = false;
            });

        },
        methods: {
            ...mapActions({
                
            }),
            ...mapMutations({
                toggleListDisplay    : 'TOGGLE_LIST_DISPLAY',
                toggleSalesDisplay   : 'TOGGLE_SALES_DISPLAY',
                changeFilterType     : 'CHANGE_FILTER_TYPE',
                updateAssignedState  : 'UPDATE_ASSIGNED_STATE',
                changeTabsState      : 'CHANGE_TABS_STATE',
                toggleTargetState    : 'TOGGLE_TARGET_STATE',
                tansFilterConditions : 'TRANS_FILTER_CONDITIONS'
            }),
            //头部第一行tab导航切换
            handleTablistClick(item, index){
                const me = this;
                this.changeFilterType({target: this.listData,item, key: 'isActive'});
                me.bodyFn(false);

                if (index == 0) {
                    this.boolean.up = !this.boolean.up;
                    this.boolean.hideIt = this.boolean.up ? true : false;
                    me.bodyFn(this.boolean.hideIt);
                    this.selectBox = false; //点综合下拉时候弹层，关闭其它打开的弹层
                    return false
                } else if (index == 2 && me.sortOrderBy == 2) {
                    me.orderSelect(index, 1, true)
                } else if (index == 2) {
                    me.orderSelect(index, 2, true)
                } else {
                    this.maskBtn();
                    me.orderSelect(index, 2, false)
                }
            },
            orderSelect(index, num, inOff){
                //this.boolean.hideIt = false;
                this.boolean.up = false;
                let sortType = {
                    sortType: this.$refs.profile[index].sortType
                }
                let me = this
                me.sortOrderBy = num
                if (inOff) {
                    sortType.sortOrder = me.sortOrderBy
                    this.boolean.down = !this.boolean.down
                } else {
                    sortType.sortOrder = this.$refs.profile[index].sortOrder
                }

                // this.$emit('condition-query', sortType) //触发父级
            },
            salesBtn(index){
                this.toggleSalesDisplay(index)
                let onlyCampVal = this.salesData[index].isSales ? 1 : 0;
                let sortObj = {
                    onlycamp: onlyCampVal
                }
                this.$emit('condition-query', sortObj)
            },
            selectBtn(item){
                this.changeFilterType({target:this.selectListData, item, key: 'isSelect'});
               
                this.boolean.hideIt = false;
                this.boolean.up = !this.boolean.up;

                let sortType = {
                    sortType: this.listDownType,
                    sortOrder: 1
                }
                
                this.updateAssignedState({target:this.listData[0], key: 'sortName', value:item.sortName});
                
                this.bodyFn(false);
                // this.$emit('condition-query', sortType)
            },
            //二级菜单tab切换
            tabSwitch(index, item){
                let empty;
                this.changeTabsState({target: this.filter_2Children, item, key: 'isTabActive'})
                if (item.isTabActive) {
                    this.selectBox = true;
                    this.boolean.hideIt = true
                } else {
                    this.selectBox = false;
                    this.boolean.hideIt = false;
                }
                this.bodyFn(this.boolean.hideIt);
                this.filter_2Children[index].child.every(item=> {
                    return !item.falseSelected ? empty = true : empty = false;
                });
                if (empty) {
                    // this.filter_2Children[index].falseAll = true;
                    this.updateAssignedState({target: this.filter_2Children[index], key: 'falseAll', value: true})
                }
            },
            bodyFn(inOff){
                let body = $('body');
                if (inOff) {
                    body.addClass('ov');
                } else {
                    body.removeClass('ov');
                }
            },
            filterBtn(item, tabIndex){
                console.log(tabIndex)
                this.updateAssignedState({target: this.filter_2Children[tabIndex], key: 'falseAll', value: false})
                this.toggleTargetState({target: item, key:'falseSelected'})
            },
            allBtn(index){
                this.toggleTargetState({target: this.filter_2Children[index], key: 'falseAll'})
                this.changeTabsState({target: this.selectedTypes, key: 'falseSelected'})
            },
            //点击蒙层事件
            maskBtn(){
                this.selectBox = false;
                this.changeTabsState({target: this.filter_2Children, key: 'isTabActive'})
                this.boolean.hideIt = false;
                this.boolean.up = false;
                this.bodyFn(this.boolean.hideIt);
            },
            //重置按钮
            btnReset(){
                let active;
                this.filter_2Children.forEach((item, i)=> {
                    if (item.isTabActive) {
                        active = i;
                    }
                })
                this.updateAssignedState({target: this.filter_2Children[active], key: 'falseAll', value: true})
                this.changeTabsState({target: this.filter_2Children[active].child, key: 'falseSelected'})
            },
            //获取假数据选中全部按钮赋值给真数据实现双向绑定
            trueAll(){
                this.filter_2Children.forEach(item=> {
                    if (!item.falseAll) {
                        item.isAll = false;
                    } else {
                        item.isAll = true;
                    }
                })
            },
            btnConfirm(){ //二级菜单下拉确定
                this.changeTabsState({target: this.filter_2Children, key: 'isTabActive'})
                let childFilter = this.selectedTypes.map(item=> {
                    return item.av_seq;
                });
                this.selectBox = false;
                this.boolean.hideIt = false;
                this.bodyFn(this.boolean.hideIt);
                // this.$emit('condition-query', {filters: childFilter});
                this.tansFilterConditions({target: this.filter_2Children})
                // this.trueAll();
            },
            getSelectedTypeByIndex(index){
                return this.selectedBrands[index].map(item=> {
                    return item.av_name;
                }).join(',');
            },
            sendFilterData(res){ //传给父组件条件选择数据
                this.$dispatch('parent-filter', res);
            }
        },
        computed: {
            ...mapState({
                listData: state => state.list.listData,
                selectListData: state => state.list.selectListData,
                salesData: state => state.list.salesData,
                bigImagePattern: state => state.list.bigImagePattern
            }),
            ...mapGetters({
                listDownType: 'listDownType'
            }),
            filter_2Children(){
                return this.bodyFilters.length !== 0 ? this.bodyFilters[2].children.filter(function (value) {
                    return value.at_name && value.is_quick === 1;//二级菜单显示条件限制的个数
                }).slice(0, 4) : []
            },
            selectedTypes(){
                var selected = [];
                this.filter_2Children.forEach(item=> {
                    selected = selected.concat(item.child.filter(temp=> {
                        return temp.falseSelected
                    }));
                });
                return selected;
            },
            selectedBrands(){
                var selected = [];
                this.filter_2Children.forEach(item=> {
                    selected.push(item.child.filter(temp=> {
                        return temp.isSelected;
                    }))
                });
                return selected;
            }
        },
        events: {
            'close-Dialog': function () {
                this.maskBtn();
            }
        },
        components: {
            fnItem
        }
    }
</script>
