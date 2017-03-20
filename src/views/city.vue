<template>
  <div class="outbox">
    <div class="page-indexlist">
      <div class="page-indexlist-wrapper">
        <mt-index-list>
          <mt-index-section v-for="item in alphabet" :index="item.initial">
            <mt-cell v-for="cell in item.cityList" :title="cell"></mt-cell>
          </mt-index-section>
        </mt-index-list>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">

  import {mapGetters, mapActions, mapMutations, mapState} from 'vuex'

  const addressList = {
    "elapsedTime": 19,
    "errorCode": 0,
    "errorDesc": "",
    "body": {
      "location": {
        "error_message": "不支持配送"
      },
      "address": [
        {
          "provinces": [
            {
              "fourName": "安徽 宣城市 宣州区 西林街道",
              "name": "安徽",
              "mark": "A",
              "code": "CS000017",
              "type": "1",
              "parentCode": "CS000017-341800-341802-3418020001"
            }
          ],
          "key": "A"
        },
        {
          "provinces": [
            {
              "fourName": "北京 北京市 昌平区 六环以内",
              "name": "北京",
              "mark": "B",
              "code": "CS000023",
              "type": "1",
              "parentCode": "CS000023-110100-110114-1101140002"
            }
          ],
          "key": "B"
        },
        {
          "provinces": [
            {
              "fourName": "重庆 重庆市 巴南区 石龙镇",
              "name": "重庆",
              "mark": "C",
              "code": "CS000011",
              "type": "1",
              "parentCode": "CS000011-500100-500113-5001130022"
            }
          ],
          "key": "C"
        },
        {
          "provinces": [
            {
              "fourName": "福建 福州市 鼓楼区 温泉街道",
              "name": "福建",
              "mark": "F",
              "code": "CS000031",
              "type": "1",
              "parentCode": "CS000031-350100-350102-3501020009"
            }
          ],
          "key": "F"
        },
        {
          "provinces": [
            {
              "fourName": "甘肃 白银市 会宁县 大沟乡",
              "name": "甘肃",
              "mark": "G",
              "code": "CS000007",
              "type": "1",
              "parentCode": "CS000007-620400-620422-6204220025"
            },
            {
              "fourName": "广东 潮州市 潮安区 登塘镇",
              "name": "广东",
              "mark": "G",
              "code": "CS000026",
              "type": "1",
              "parentCode": "CS000026-445100-445103-4451030001"
            },
            {
              "fourName": "广西 北海市 银海区 福成镇",
              "name": "广西",
              "mark": "G",
              "code": "CS000027",
              "type": "1",
              "parentCode": "CS000027-450500-450503-4505030001"
            },
            {
              "fourName": "贵州 安顺市 镇宁布依族苗族自治县 城关镇",
              "name": "贵州",
              "mark": "G",
              "code": "CS000029",
              "type": "1",
              "parentCode": "CS000029-520400-520423-5204230001"
            }
          ],
          "key": "G"
        },
        {
          "provinces": [
            {
              "fourName": "海南 澄迈县 澄迈县 金江镇",
              "name": "海南",
              "mark": "H",
              "code": "CS000030",
              "type": "1",
              "parentCode": "CS000030-461100-469023-4690230001"
            },
            {
              "fourName": "河北 石家庄市 灵寿县 灵寿镇",
              "name": "河北",
              "mark": "H",
              "code": "CS000024",
              "type": "1",
              "parentCode": "CS000024-130100-130126-1301260002"
            },
            {
              "fourName": "河南 安阳市 安阳县 崔家桥镇",
              "name": "河南",
              "mark": "H",
              "code": "CS000025",
              "type": "1",
              "parentCode": "CS000025-410500-410522-4105220001"
            },
            {
              "fourName": "黑龙江 哈尔滨市 道外区 青年农场",
              "name": "黑龙江",
              "mark": "H",
              "code": "CS000003",
              "type": "1",
              "parentCode": "CS000003-230100-230104-2301040028"
            },
            {
              "fourName": "湖北 鄂州市 鄂城区 燕矶镇",
              "name": "湖北",
              "mark": "H",
              "code": "CS000013",
              "type": "1",
              "parentCode": "CS000013-420700-420704-4207040001"
            },
            {
              "fourName": "湖南 长沙市 长沙县 星沙街道",
              "name": "湖南",
              "mark": "H",
              "code": "CS000014",
              "type": "1",
              "parentCode": "CS000014-430100-430121-4301210001"
            }
          ],
          "key": "H"
        },
        {
          "provinces": [
            {
              "fourName": "吉林 白城市 洮北区 海明街道",
              "name": "吉林",
              "mark": "J",
              "code": "CS000001",
              "type": "1",
              "parentCode": "CS000001-220800-220802-2208020001"
            },
            {
              "fourName": "江苏 南京市 白下区 朝天宫街道",
              "name": "江苏",
              "mark": "J",
              "code": "CS000018",
              "type": "1",
              "parentCode": "CS000018-320100-320103-3201030001"
            },
            {
              "fourName": "江西 抚州市 崇仁县 桃源乡",
              "name": "江西",
              "mark": "J",
              "code": "CS000008",
              "type": "1",
              "parentCode": "CS000008-361000-361024-3610240013"
            }
          ],
          "key": "J"
        },
        {
          "provinces": [
            {
              "fourName": "辽宁 本溪市 本溪满族自治县 田师傅镇",
              "name": "辽宁",
              "mark": "L",
              "code": "CS000002",
              "type": "1",
              "parentCode": "CS000002-210500-210521-2105210011"
            }
          ],
          "key": "L"
        },
        {
          "provinces": [
            {
              "fourName": "内蒙古东 赤峰市 喀喇沁旗 乃林镇",
              "name": "内蒙古东",
              "mark": "N",
              "code": "CS000021",
              "type": "1",
              "parentCode": "CS000021-150400-150428-1504280005"
            },
            {
              "fourName": "内蒙古西 巴彦淖尔市 杭锦后旗 团结镇",
              "name": "内蒙古西",
              "mark": "N",
              "code": "CS000032",
              "type": "1",
              "parentCode": "CS000032-150800-150826-1508260005"
            },
            {
              "fourName": "宁夏 银川市 灵武市 临河镇",
              "name": "宁夏",
              "mark": "N",
              "code": "CS000006",
              "type": "1",
              "parentCode": "CS000006-640100-640181-6401810007"
            }
          ],
          "key": "N"
        },
        {
          "provinces": [
            {
              "fourName": "青海 海北藏族自治州 门源回族自治县 皇城乡",
              "name": "青海",
              "mark": "Q",
              "code": "CS000010",
              "type": "1",
              "parentCode": "CS000010-632200-632221-6322210012"
            }
          ],
          "key": "Q"
        },
        {
          "provinces": [
            {
              "fourName": "山东 滨州市 滨城区 堡集镇",
              "name": "山东",
              "mark": "S",
              "code": "CS000020",
              "type": "1",
              "parentCode": "CS000020-371600-371602-3716020001"
            },
            {
              "fourName": "山西 运城市 临猗县 城区",
              "name": "山西",
              "mark": "S",
              "code": "CS000004",
              "type": "1",
              "parentCode": "CS000004-140800-140821-1408210017"
            },
            {
              "fourName": "陕西 安康市 紫阳县 城关镇",
              "name": "陕西",
              "mark": "S",
              "code": "CS000012",
              "type": "1",
              "parentCode": "CS000012-610900-610924-6109240001"
            },
            {
              "fourName": "上海 上海市 宝山区 城区",
              "name": "上海",
              "mark": "S",
              "code": "CS000016",
              "type": "1",
              "parentCode": "CS000016-310100-310113-3101130001"
            },
            {
              "fourName": "四川 成都市 崇州市 公议乡",
              "name": "四川",
              "mark": "S",
              "code": "CS000005",
              "type": "1",
              "parentCode": "CS000005-510100-510184-5101840022"
            }
          ],
          "key": "S"
        },
        {
          "provinces": [
            {
              "fourName": "天津 天津市 和平区 南市街",
              "name": "天津",
              "mark": "T",
              "code": "CS000022",
              "type": "1",
              "parentCode": "CS000022-120100-120101-1201010001"
            }
          ],
          "key": "T"
        },
        {
          "provinces": [
            {
              "fourName": "西藏 林芝地区 朗县 朗县全境",
              "name": "西藏",
              "mark": "X",
              "code": "CS000009",
              "type": "1",
              "parentCode": "CS000009-542600-542627-5426270001"
            },
            {
              "fourName": "新疆 石河子市 五家渠市 五家渠市全境",
              "name": "新疆",
              "mark": "X",
              "code": "CS000015",
              "type": "1",
              "parentCode": "CS000015-659000-659004-6590040001"
            }
          ],
          "key": "X"
        },
        {
          "provinces": [
            {
              "fourName": "云南 红河哈尼族彝族自治州 泸西县 永宁乡",
              "name": "云南",
              "mark": "Y",
              "code": "CS000028",
              "type": "1",
              "parentCode": "CS000028-532500-532527-5325270008"
            }
          ],
          "key": "Y"
        },
        {
          "provinces": [
            {
              "fourName": "浙江 杭州市 滨江区 长河街道",
              "name": "浙江",
              "mark": "Z",
              "code": "CS000019",
              "type": "1",
              "parentCode": "CS000019-330100-330108-3301080001"
            }
          ],
          "key": "Z"
        }
      ]
    }
  }
  /**
   * 公共组件
   */
  import fnLoading from "components/common/loading/index"


  export default {
    data(){

      return {
        alphabet: []
      }

    },
    created(){

      this.setAllLoading({type: true})

      'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').forEach(initial => {

        let cells = addressList.body.address.filter((item) => {
          return initial === item.key
        });


        let cityList = [];
        if(cells[0] &&  cells[0].provinces.length > 0 ){
          cells[0].provinces.forEach(item => {
            cityList.push(item.name);
          })
        }

        if(cityList.length > 0){

          this.alphabet.push({
            initial,
            cityList
          });

        }

      });

    },

    mounted() {

      setTimeout(()=>{

        this.setAllLoading({type: false})

      },1000)

    },
    computed: {
      ...mapState({

        isLoading: state => state.common.isLoading

      })
    },
    methods: {
      ...mapActions([

      ]),
      ...mapMutations({
        setAllLoading: 'SET_ALL_LOADING'
      })
    },components: {
      fnLoading
    }
  }
</script>

<style scoped>

  @component-namespace page {
    @component indexlist {
      @descendent desc {
        text-align: center;
        color: #666;
        padding-bottom: 5px;
      }

      @descendent wrapper {
        width: 100%;
        border-top: solid 1px #ddd;
      }
    }
  }

</style>
