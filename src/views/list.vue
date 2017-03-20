<template>
  <div class="outbox">
    <div class="top_box">
      <span class="top_back J_topback"></span>
      <h1>列表页</h1>
    </div>
  </div>
</template>


<script type="text/ecmascript-6">
  import {mapGetters, mapActions, mapMutations, mapState} from 'vuex'



  /**
   * 公共组件
   */
  import fnLoading from "components/common/loading/index"


  export default {
    data(){

      return {

      }

    },
    created(){

    },

    mounted() {

    },
    computed: {
      ...mapState({

      })
    },
    methods: {
      ...mapActions([

      ]),
      ...mapMutations({

      })
    },components: {
      fnLoading
    }
  }
</script>

<style scoped>

</style>
