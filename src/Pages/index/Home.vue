<template>
  <div id="home">
    <div class="msg_look">
      <Com1 v-for="(item,i) in data" :key="i" :name="item.name" :num="item.number"></Com1>
    </div>
    <div id="myChart" :style="{width: '80%', height: '600px'} "></div>
  </div>
</template>

<script>
import Com1 from "../../components/Com1";
import { API_ECHARTS } from "@/API/apis";
//import echarts from "echarts"
export default {
  components: {
    Com1
  },
  data() {
    return {
      data: [
        { name: "总订单", number: "102,400" },
        { name: "总销售额", number: "102,400" },
        { name: "今日订单数", number: "102,400" },
        { name: "今日销售额", number: "102,400" }
      ]
    };
  },
/*
totalAmount: 202466
todayOrder: 189
totayAmount: 2189
xData: (7) ["2019/11/17", "2019/11/18", "2019/11/19", "2019/11/20", "2019/11/21", "2019/11/22", "2019/11/23"]
orderData: (7) [120, 132, 101, 134, 90, 230, 210]
amountData: (7) [220, 282, 191, 234, 290, 330, 310] */
  mounted() {
    API_ECHARTS().then(res => {
      let {xData,orderData,amountData}=res.data
      this.data[0].number=res.data.totalOrder
      this.data[1].number=res.data.totalAmount
      this.data[2].number=res.data.todayOrder
      this.data[3].number=res.data.totayAmount
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      // 绘制图表
      var option = {
        title: {
          text: "数据统计"
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["销售统计", "价格统计"]
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: xData
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            name: "订单数据",
            type: "line",
            stack: "总量",
            data: orderData
          },
          {
            name: "金额数据",
            type: "line",
            stack: "总量",
            data: amountData
          },

        ]
      };
      myChart.setOption(option)
    });
  },
  methods: {}
};
</script>

<style lang="less" scoped>
#home {
  width: 100%;
  .msg_look {
    display: flex;
    justify-content: space-around;
    > div {
      background: #eee;
    }
  }
}
#myChart{
  padding: 20px 40px;
}
.el-breadcrumb {
  width: 100%;
  line-height: 40px;
  padding: 10px 20px;
  box-sizing: border-box;
  background: #eee;
  > div {
    float: right;
    line-height: 40px;
    span {
      padding-bottom: 8px;
    }
    p {
      display: inline-block;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      overflow: hidden;
      margin: 0;
    }
  }
}
</style>