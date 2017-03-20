<template>
    <span>{{pageScanInfo}}</span>
</template>
<style>
</style>
<script>
    export default{
        props: {
            scanPageNow: Number,
            totalPageCount: Number
        },
        computed:{
            //返回当前浏览页数信息
            pageScanInfo(){
                return this.scanPageNow + '/' + this.totalPageCount;
            }
        }
    }
</script>
