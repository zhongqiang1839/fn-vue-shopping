<template>
  <!-- swiper -->
  <swiper :options="swiperOption">
    <swiper-slide v-for="imageItem in imagesList">
      <img :src='imageItem' style="width:100%;"/>
    </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>
<style>
</style>
<script>

  import {
    swiper,
    swiperSlide
  } from 'vue-awesome-swiper'

  export default{
    data(){
      return {
        swiperOption: {
          pagination: '.swiper-pagination',
          paginationClickable: true,
          slidesPerView: 'auto',
          autoplay:"1000"
        }
      }
    },
    props: {
      imagesList: Array
    },
    components: {
      swiper,
      swiperSlide
    }

  }
</script>
