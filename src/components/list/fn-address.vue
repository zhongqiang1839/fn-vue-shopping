<template>
    <div id="div_J_delivery" class="region_widget tmbg" @click="reoutboxBtn">
        <div class="reoutbox ">
            <!--省-->
            <div id="div_psProvinces" class="site" data-retab-bk="psProvinces" style="z-index: 1;">
                <div class="region_title" @click.stop="proviceBack"><i class="iconfont" data-rebk="psProvinces"></i>
                    <h3>筛选</h3></div>
                <div class="com_add" v-if=""><h2>常用收货地址</h2>
                    <ul class="add_list" v-if="addrTopList">
                        <li v-for="adrlist in addrTopList" @click="topListBtn(adrlist)"><i
                                class="iconfont" :class="{active:adrlist.isSelected}"></i>
                            <p>{{adrlist.addr}}</p></li>
                    </ul>
                    <h2>选择其他地址</h2></div>
                <div id="psProvinces" class="region_ul" style="position:static;padding-top:0;">
                    <dl v-if="addressList">
                        <dd :class="{active:adr.isSelected}" data-icon2="" class="" data-depth="1"
                            v-for="adr in addressList" @click.stop="adrSelected(adr)"><p>{{adr.name}}</p></dd>
                    </dl>
                </div>
            </div>
            <!--市-->
            <div id="div_psCitys" class="site" data-retab-bk="psCitys" style="z-index: 2;" v-show="cityShow">
                <div class="region_title" @click.stop="cityBack"><i class="iconfont" data-rebk="psCitys"></i>
                    <h3>筛选</h3></div>
                <div class="selPs">{{getProviceName}}</div>
                <div id="psCitys" class="region_ul box2">
                    <dl>
                        <dd data-icon2="" :class="{active:city.isSelected}" v-for="city in cityList || cityList[0]"
                            @click.stop="citySelected(city)"><p>{{city.name}}</p></dd>
                    </dl>
                </div>
            </div>
            <!--区、县-->
            <div id="div_psCountys" class="site" data-retab-bk="psCountys" style="z-index: 3;" v-show="areaShow">
                <div class="region_title" @click.stop="areaBack"><i class="iconfont" data-rebk="psCountys"></i>
                    <h3>筛选</h3></div>
                <div class="selPs">{{getProviceName}}{{getCityName}}</div>
                <div id="psCountys" class="region_ul box3">
                    <dl>
                        <dd data-icon2="" :class="{active:area.isSelected}" v-for="area in areaList"
                            @click.stop="areaSelected(area)"><p>{{area.name}}</p></dd>
                    </dl>
                </div>
            </div>
        </div>
    </div>
</template>
<style>
    @import '../../assets/css/region.css';

    .region_title .iconfont {
        transform: rotate(177deg);
    }

    .region_title h3 {
        margin: 0 auto;
    }

    #psCitys dl, #psCountys dl {
        margin-top: 38px;
    }

    .toggle .region_widget {
        padding-left: 15%;

    }

    .region_widget .reoutbox .site {
        width: 120% !important;
    }

    .box2 dd.active:after, .box2 li.active:after, .box3 dd.active:after, .box3 li.active:after {
        font-family: iconfont !important;
        font-size: .28rem;
        font-style: normal;
        -webkit-font-smoothing: antialiased;
        -webkit-text-stroke-width: .2px;
        -moz-osx-font-smoothing: grayscale;
        content: attr(data-icon);
        font-size: .4rem;
        color: #888;
        content: attr(data-icon2);
        color: #c70034;
        display: inline-block;
        width: 85px;
    }
</style>
<script>
    import {getAddressList, getNextAddress} from "../../services/addressService";
    let addressRequstBody = {"action": "", "comeFrom": "detail"};
    let getNextRequestBody = {"areaCode": ""};
    export default{
        data(){
            return {
                addrTopList: [],
                addressList: [],
                cityList: [],
                areaList: [],
                cityShow: false,
                areaShow: false
            }
        },
        props: {
            addressName: String,
            isCache: Boolean
        },
        ready(){
            let self = this;
            self.load({used: addressRequstBody, next: getNextRequestBody});
        },

        computed: {
            getNearAdr(){　//获取常用地址代号
                let nearCode = '';
                this.addrTopList.filter(item=> {
                    if (item.isSelected) {
                        nearCode = item.parentCode;
                    }
                });
                return nearCode;
            },
            getNearName(){　//获取附近地址名
                let nearPro = '';
                let nearCity = '';
                let nearArea = '';
                this.addrTopList.filter(item=> {
                    if (item.isSelected) {
                        nearPro = item.province;
                        nearCity = item.city;
                        nearArea = item.area;
                    }
                });
                return nearPro + nearCity + nearArea;
            },
            getProvice(){　//获取选中省份
                let proviceCode = '';
                this.addressList.filter(item=> {
                    if (item.isSelected) {
                        proviceCode = item.parentCode;
                    }
                });
                return proviceCode;
            },
            getProviceName(){　//获取选中省名
                let proviceName = '';
                this.addressList.filter(item=> {
                    if (item.isSelected) {
                        proviceName = item.name;
                    }
                });
                return proviceName;
            },
            getCity(){　//获取选中市
                let cityCode = '';
                this.cityList.filter(item=> {
                    if (item.isSelected) {
                        cityCode = item.parentCode;
                    }
                });
                return cityCode;
            },
            getCityName(){　//获取选中市名
                let cityName = '';
                this.cityList.filter(item=> {
                    if (item.isSelected) {
                        cityName = item.name;
                    }
                });
                return cityName;
            },
            getArea(){　//获取选中的县/区
                let areaCode = '';
                this.areaList.filter(item=> {
                    if (item.isSelected) {
                        areaCode = item.parentCode;
                    }
                });
                return areaCode;
            },
            getAreaName(){ //获取地区名
                let areaName = '';
                this.areaList.filter(item=> {
                    if (item.isSelected) {
                        areaName = item.name;
                    }
                });
                return areaName;
            },
            addressName(){　//常用地址名 || 配送至
                if (this.getAreaName) {
                    return this.getProviceName + this.getCityName + this.getAreaName;
                }
            }
        },
        methods: {
            load(requestData){
                //请求常用收货地址
                this.getListAjax(requestData.used);

                //请求选择其他地址
                this.getNextAjax(requestData.next, {render: this.render, num: 1});
            },
            getListAjax(used){
                let self = this;
                //请求常用收货地址
                getAddressList({body: used}).then(function (res) {
                    if (res.errorCode == 0) {
                        let data = res.body;
                        self.render({address: data.AddrList}); //接口请求成功
                    }
                }, function (res) {
                    console.log(res);
                })
            },
            getNextAjax(next, renderObj, callback){
                //请求选择其他地址
                getNextAddress({body: next}).then((res)=> {
                    let data = res.body;
                    renderObj.render({listAddress: data.address, arrNum: renderObj.num}); //接口请求成功
                    callback && callback();
                }, (res)=> {
                    console.log(res);
                })
            },
            render(data){ //渲染模板
                let arrObj = [];//选择其他地址数据
                let that = this;
                data.address && data.address.length !== 0 ? that.addrTopList = data.address : [];   //常用收货地址数据
                if (data.listAddress) {
                    data.listAddress.forEach(item=> {
                        item.isSelected = false;
                    })
                }
                data.listAddress && data.listAddress.length !== 0 ? arrObj = data.listAddress : []; //选择其他地址数据
                if (data.arrNum == 1) {
                    that.addressList = arrObj;
                } else if (data.arrNum == 2) {
                    that.cityList = arrObj;
                } else {
                    that.areaList = arrObj;
                }
                if ($.cookie.get('siteid') && that.isCache) {
                    that.cacheHandle($.cookie.get('siteid'));
                }
            },
            reoutboxBtn(){
                this.$dispatch('show-address');
            },
            isRemove(item, arr, isSelectCode){ //勾选遍历没有有选中的都设为false
                let that = this;
                arr.forEach(temp=> {
                    if (temp !== item) {
                        temp.isSelected = false;
                    }
                })
                that.cacheHandle(isSelectCode);//从新调用缓存里的状态
            },
            cacheHandle(arr){　//缓存处理
                let that = this;
                let adrList = arr.split('-');
                let arr1 = adrList[0];
                let arr2 = adrList[1];
                let arr3 = adrList[2];
                that.filtercacheHandle(that.addressList, arr1);//省默认
                that.filtercacheHandle(that.cityList, arr2);//市默认
                that.filtercacheHandle(that.areaList, arr3);//区默认
            },
            filtercacheHandle(options, i){ //缓存默认选中状态
                options.filter(item=> {
                    if (item.code == i) {
                        item.isSelected = true;
                    }
                })
            },
            topListBtn(item){ //常用地址选择
                let me = this;
                item.isSelected = true;
                this.isRemove(item, this.addrTopList);
                this.$dispatch('address-show', false, this.getNearAdr, this.getNearName);
            },
            adrSelected(item){ //省选择
                let me = this;
                item.isSelected ? me.isCache = true : me.isCache = false; //每次点击判断是否点击的是缓存里的状态
                item.isSelected = true;
                me.isRemove(item, me.addressList, item.parentCode);
                let areaCode = {
                    'areaCode': me.getProvice
                };
                me.getNextAjax(areaCode, {render: me.render, num: 2}, function () {
                    me.cityShow = true;
                });
            },
            citySelected(item){  //市选择
                let me = this;
                item.isSelected ? this.isCache = true : me.isCache = false;//每次点击判断是否点击的是缓存里的状态
                item.isSelected = true;
                me.isRemove(item, me.cityList, item.parentCode);
                let areaCode = {
                    'areaCode': me.getCity
                };
                me.getNextAjax(areaCode, {render: me.render, num: 3}, function () {
                    me.areaShow = true;
                });
            },
            areaSelected(item){ //区选择关闭
                let me = this;
                item.isSelected ? me.isCache = true : me.isCache = false;//每次点击判断是否点击的是缓存里的状态
                item.isSelected = true;
                me.isRemove(item, me.areaList, item.parentCode);
                me.showAddress = false;
                me.$dispatch('address-show', false, me.getArea, me.getAreaName, me.addressName);
            },
            proviceBack(){
                this.$dispatch('address-show', false);
            },
            cityBack(){ //市返回
                this.cityShow = false;
            },
            areaBack(){　//区返回
                this.areaShow = false;
            }
        }

    }
</script>
