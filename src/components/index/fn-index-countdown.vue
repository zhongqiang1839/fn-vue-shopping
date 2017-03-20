<template>
  <div class="ind_box relative new no_blank">
    <div class="kh_countdown default">
      <div class="kh_title">
        <h4>全球狂欢节开幕还有</h4>
      </div>
      <div class="s_time" v-html="timeHtml">
        <!--<p>-->
        <!--<span>0</span>-->
        <!--<i>天</i>-->
        <!--</p>-->
        <!--<p>-->
        <!--<span>0</span>-->
        <!--<span>0</span>-->
        <!--<i>小时</i>-->
        <!--</p>-->
        <!--<p>-->
        <!--<span>0</span>-->
        <!--<span>0</span>-->
        <!--<i>分</i>-->
        <!--</p>-->
        <!--<p>-->
        <!--<span>0</span>-->
        <!--<span>0</span>-->
        <!--<i>秒</i>-->
        <!--</p>-->
      </div>
    </div>
  </div>
</template>
<style>
</style>
<script>

  import {setTime2} from "../../util/timeDeal";

  let timer;
  export default{
    data(){
      return {
        timeHtml: "<p><span>0</span><span>0</span><i>天</i></p><p><span>0</span><span>0</span><i>小时</i></p><p><span>0</span><span>0</span><i>分</p><p><span>0</span><span>0</span><i>秒</p>"
      }
    },
    props: {
      countDown: Object
    },
    mounted(){
      timer = setInterval(this.renderActCountDown, 1000);

    },
    beforeDestroy(){
      //组件销毁前,关闭计时, 防止造成内存泄漏
      timer && clearInterval(timer)
    },
    methods: {
      renderActCountDown(){

        let time = this.countDown.endTime,
          timestamp = Date.parse(new Date()),
          t = time * 1000 - timestamp;

        if (t >= 0) {

          let _ltime = setTime2(t, true, true);

          let day = _ltime.day.toString(),
            hour = _ltime.hour.toString(),
            min = _ltime.min.toString(),
            sec = _ltime.sec.toString(),
            html = '';

          let length = day.length,
            i = 0,
            subHtml = '';
          while (i < length) {
            subHtml += '<span>' + day[i] + '</span>';
            i++;
          }
          html += '<p>' + subHtml + '<i>天</i></p>';
          html += '<p><span>' + hour[0] + '</span><span>' + hour[1] + '</span><i>小时</i></p>';
          html += '<p><span>' + min[0] + '</span><span>' + min[1] + '</span><i>分</p>';
          html += '<p><span>' + sec[0] + '</span><span>' + sec[1] + '</span><i>秒</p>';

          this.timeHtml = html;

          if(t == 0){
            alert("timeup");
            //todo need callback to parents components

          }
        } else {
          timer && clearInterval(timer)
        }
      }
    }

  }
</script>
