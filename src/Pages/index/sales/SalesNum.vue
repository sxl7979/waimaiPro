<template>
  <div>
    <div class="sales_top">
      时间范围
      <el-date-picker
        v-model="sTime"
        type="datetimerange"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        format="yyyy 年 MM 月 dd 天 hh时 mm 分 ss 秒"
        value-format="yyyy-MM-dd HH:mm:ss"
      ></el-date-picker>
      <el-button type="primary" @click="looksales">查询</el-button>
    </div>
    <div id="orderecharts" style="wideh:80%;height:600px"></div>
  </div>
</template>

<script>
import { ORDER_ORDERTOTAL } from "@/API/order";
import echarts from "echarts";
export default {
  name: "hello",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      sTime: "",
      date: ["2018-10-01 00:00:00", "2020-10-10 00:00:00"],
      orderTimeList: [],
      orderAmountList: []
    };
  },

  methods: {
    looksales() {
      ORDER_ORDERTOTAL(JSON.stringify(this.sTime)).then(res => {
        console.log(res);

        if (res.data.data.length == 0) {
          this.$message({
            message: "没有该时间段的数据",
            type: "warning"
          });
        } else {
          

          this.orderTimeList = res.data.data.map(e => {
            e = new Date(e.orderTime)
              .toJSON()
              .substr(0, 19)
              .replace("T", " ");
            return e;
          });


          this.orderAmountList = res.data.data.map(e => {
            return e.orderAmount;
          });
          var orderecharts = echarts.init(
            document.getElementById("orderecharts")
          );
          var option = {
            xAxis: {
              type: "category",
              data: this.orderTimeList
            },
            yAxis: {
              type: "value"
            },
            series: [
              {
                data: this.orderAmountList,
                type: "line"
              }
            ]
          };
          orderecharts.setOption(option);
            
        }
      });
    }
  },
  created() {
    ORDER_ORDERTOTAL(JSON.stringify(this.date)).then(res => {
      this.orderTimeList = res.data.data.map(e => {
        e = new Date(e.orderTime)
          .toJSON()
          .substr(0, 19)
          .replace("T", " ");
        return e;
      });
      this.orderAmountList = res.data.data.map(e => {
        return e.orderAmount;
      });

      var orderecharts = echarts.init(document.getElementById("orderecharts"));
      var option = {
        xAxis: {
          type: "category",
          data: this.orderTimeList
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            data: this.orderAmountList,
            type: "line"
          }
        ]
      };
      orderecharts.setOption(option);
    });
  }
};
</script>

<style lang="less" scoped>
.sales_top {
  padding: 30px;
  .el-button {
    margin-left: 20px;
  }
}
.el-time-picker {
  margin: 0 20px;
}
</style>