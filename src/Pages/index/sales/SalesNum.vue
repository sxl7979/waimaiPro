<template>
  <div>
    <div class="sales_top">
      时间范围1
      <el-date-picker
      v-model="value1"
      type="datetimerange"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      :default-time="['12:00:00']"
      @change="getSTime"
      value-format="yyyy-MM-dd HH:mm:ss"
      >
      
    </el-date-picker>
      <el-button type="primary" @click="looksales">查询</el-button>
    </div>
  </div>
</template>

<script>
import { ORDER_ORDERTOTAL } from "@/API/order";
export default {
  name: "hello",
  data() {
    return {
      value1: "",
      msg: "Welcome to Your Vue.js App",
      sTime: ""
    };
  },

  methods: {
    getSTime(val) {
      this.sTime = val; //这个sTime是在data中声明的，也就是v-model绑定的值
    },
    looksales() {
      console.log(JSON.stringify(this.sTime));
      console.log(this.sTime.toString());
      
      console.log(ORDER_ORDERTOTAL);
      
    // ORDER_ORDERTOTAL(JSON.stringify(this.sTime)).then(res=>{
    //   console.log(res);
    // }) 
    }
  },
  created() {

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