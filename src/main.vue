<template>
    <div id="app">
        <!-- 缓存一级路由切换的页面 -->
        <router-view keep-alive transition-mode="out-in"></router-view>
    </div>
</template>

<script type="text/ecmascript-6">
    import {mapGetters, mapActions, mapMutations, mapState} from 'vuex'

    export default {
        computed: {
            ...mapState({

            })
        }
    }
</script>
<style>
  @import "~assets/css/common/common.css";
</style>
