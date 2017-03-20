<template>
  <div class="loading_pop">
    <div class="weui_mask_transparent"></div>
    <div class="csshub-loader">
      <span></span>
      <span></span>
      <span></span>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
  .loading_pop {
    position: fixed;
    z-index: 50000;
    width: 7.6em;
    min-height: 7.6em;
    top: 200px;
    left: 50%;
    margin-left: -3.8em;
    background: rgba(40,40,40,.15);
    text-align: center;
    border-radius: 5px;
    color: #FFF;
  }

  .csshub-loader span{
    width:16px;
    height:16px;
    border-radius:50%;
    display:inline-block;
    position:absolute;
    top:40%;
    left:50%;
    margin-left:-10px;
    animation:3s infinite linear;
    -webkit-animation:3s infinite linear;
  }


  .csshub-loader span:nth-child(1){
    background:#E84C3D;
    animation: csshub-kiri 1.2s infinite linear;
    -webkit-animation:csshub-kiri 1.2s infinite linear;
  }

  .csshub-loader span:nth-child(2){
    background:#F1C40F;
    z-index:100;
  }

  .csshub-loader span:nth-child(3){
    background:#2FCC71;
    animation:csshub-kanan 1.2s infinite linear;
    -webkit-animation:csshub-kanan 1.2s infinite linear;
  }


  @-webkit-keyframes csshub-kanan {
    0% {-webkit-transform:translateX(20px);
    }

    50%{-webkit-transform:translateX(-20px);
    }

    100%{-webkit-transform:translateX(20px);
      z-index:200;
    }
  }
  @keyframes csshub-kanan {
    0% {transform:translateX(20px);
    }

    50%{transform:translateX(-20px);
    }

    100%{transform:translateX(20px);
      z-index:200;
    }
  }

  @-webkit-keyframes csshub-kiri {
    0% {-webkit-transform:translateX(-20px);
      z-index:200;
    }
    50%{-webkit-transform:translateX(20px);
    }
    100%{-webkit-transform:translateX(-20px);
    }
  }

  @keyframes csshub-kiri {
    0%{ transform:translateX(-20px);
      z-index:200;
    }
    50%{transform:translateX(20px);
    }
    100%{transform:translateX(-20px);
    }
  }
</style>
