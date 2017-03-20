<template>
    <div class="pop_appdown J_popAppdown" id="popAppdown" v-show="show" style='z-index: 999;'>
        <div class="mbox">
            <p class="appdown_close2" @click="closeAppdown">
                <img src="~assets/images/appdown/closen2.png"/>
            </p>
            <p class="appdown_logo">
                <img src="~assets/images/appdown/app_logo.png"/>
            </p>
            <p class="appdown_dsc J_appDown">
                <span>下载飞牛app</span>
                <span>首次登录送<em>5</em>元</span>
            </p>
            <p class="appdown_down">立即下载</p>
        </div>
    </div>
</template>
<style>
    @import '~assets/css/components/fn_appdown.css';
</style>
<script type="text/ecmascript-6">


    export default{
        data(){
            return {
                show: false
            }
        },
        created(){
            let closeAppDivDate = parseInt($.cookie.getH5('closeAppDivDate')),
            dateThree = parseInt((1000 * 60 * 60 * 24) * 3), //三天
            dateNow = new Date().getTime(), //获取当前时间
            closeAppDate = parseInt(dateNow) - parseInt(closeAppDivDate);

            /* 如果是翼支付环境下,隐藏头部下载条 */
            if (navigator.userAgent.indexOf('bestpay') > -1) {
                this.show = false;
                return ;
            }
            if($(window).scrollTop() > 0){

                this.show = false;

            } else {
                /* 不是翼支付环境下走正常逻辑 */
                if(!closeAppDivDate){

                    /* 没有种过cookie */
                    this.show = true;

                } else {

                    if(closeAppDate > dateThree){
                        /* 超过三天 */
                        this.show = true;

                    } else {
                        /* 三天之内 */
                        this.show = false;

                    }
                }
            }
        },
        methods: {
            closeAppdown(){
                this.show = false;
                $.cookie.addH5('closeAppDivDate', new Date().getTime(), '/', 60 * 60 * 24 * 3); //将关闭的当前时间存入cookie
            }
        }
    }

</script>

