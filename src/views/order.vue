<template>
  <div class="outbox">
    <mt-header title="多个按钮">
      <router-link to="/" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
      <!--<mt-button slot="right">关闭</mt-button>-->
      <mt-button icon="more" slot="right" @click="handleClose"></mt-button>
    </mt-header>

    <mt-actionsheet :actions="actions2" v-model="sheetVisible2" cancel-text=""></mt-actionsheet>
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
        sheetVisible2: false,
        actions2: []
      }

    },
    created(){

    },

    mounted() {

      this.actions2 = [{
        name: '拍照',
        method: this.takePhoto
      }, {
        name: '从相册中选择',
        method: this.openAlbum
      },{
          name: '返回',
          method: this.goBack
      }];


    },
    computed: {
      ...mapState({

      })
    },
    methods: {
      ...mapActions([

      ]),
      ...mapMutations({

      }),
      handleClose() {

        this.sheetVisible2 = true

      },
      goBack() {
        history.go(-1);
      }
    },components: {

    }
  }
</script>

<style scoped>

  @component-namespace page {
    @component actionsheet {
      @descendent wrapper {
        padding: 0 20px;
        position: absolute 50% * * *;
        width: 100%;
        transform: translateY(-50%);

        button:first-child {
          margin-bottom: 20px;
        }
      }
    }
  }

</style>
