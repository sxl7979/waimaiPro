<template>
  <el-container>
    <!-- 左边 -->
    <el-aside width="200px">
      <el-menu
        :default-active="$route.path"
        class="el-menu-vertical-demo"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        router
        unique-opened
      >
        <!-- 动态树 -->
        <div v-for="(e,i) in getnewtree" :key="i">
          <el-menu-item v-if="!e.children" :index="e.index">
            <i :class="e.icls"></i>
            <span slot="title">{{e.title}}</span>
          </el-menu-item>
          <el-submenu v-else :index="e.index">
            <template slot="title">
              <i :class="e.icls"></i>
              <span>{{e.title}}</span>
            </template>
            <el-menu-item-group>
              <el-menu-item v-for="(v,o) in e.children" :key="o" :index="v.index">{{v.title}}</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </div>
      </el-menu>
    </el-aside>
    <el-container class="changblock">
      <Acc :nav="this.$route.meta"  style=" margin-bottom:30px ;"></Acc>
      <!-- 二级路由 -->
      <router-view></router-view>
      
    </el-container>
  </el-container>
</template>

<script>
import Acc from "../components/Comacc";
export default {
  components: {
    Acc
  },
  data() {
    return {
      tree:  [
        { title: "首页", index: "/index/home", icls: "el-icon-menu" ,role:["super","normal"]},
        { title: "订单管理", index: "/index/order", icls: "el-icon-menu",role:["super","normal"] },
        {title: "商品管理",index: "/index/goods",icls: "el-icon-menu",children: [
            {
              title: "商品列表",
              index: "/index/goods/goodslist",
              icls: "el-icon-menu"
            },
            {
              title: "商品添加",
              index: "/index/goods/goodsadd",
              icls: "el-icon-menu"
            },
            {
              title: "商品分类",
              index: "/index/goods/goodstype",
              icls: "el-icon-menu"
            }
          ],role:["super"]
          
        },
        { title: "店铺管理", index: "/index/shops", icls: "el-icon-document",role:["super","normal"]},
        {
          title: "账号管理",
          index: "/index/acc",
          icls: "el-icon-location",
          children: [
            {
              title: "账号列表",
              index: "/index/acc/acclist",
              icls: "el-icon-menu"
            },
            {
              title: "添加账号",
              index: "/index/acc/addacc",
              icls: "el-icon-menu"
            },
            {
              title: "修改密码",
              index: "/index/acc/changepwd",
              icls: "el-icon-menu"
            }
          ],role:["super"]
        },
        {
          title: "销售统计",
          index: "/index/sales",
          icls: "el-icon-location",
          children: [
            {
              title: "订单统计",
              index: "/index/sales/salesnum",
              icls: "el-icon-menu"
            },
            {
              title: "商品统计",
              index: "/index/sales/goodsnum",
              icls: "el-icon-menu"
            }
          ],role:["super"]
        }
      ],

    }
  },
  methods: {
    drawLine() {
      //console.log(document.getElementById("myChart"))
      // 基于准备好的dom，初始化echarts实例
      // let myChart = this.$echarts.init(document.getElementById("myChart"));
      // 绘制图表
      // myChart.setOption({
      //   tooltip: {
      //     trigger: "axis",
      //     axisPointer: {
      //       type: "cross",
      //       crossStyle: {
      //         color: "#999"
      //       }
      //     }
      //   },
      //   toolbox: {
      //     feature: {
      //       dataView: { show: true, readOnly: false },
      //       magicType: { show: true, type: ["line", "bar"] },
      //       restore: { show: true },
      //       saveAsImage: { show: true }
      //     }
      //   },
      //   legend: {
      //     data: ["蒸发量", "降水量", "平均温度"]
      //   },
      //   xAxis: [
      //     {
      //       type: "category",
      //       data: [
      //         "1月",
      //         "2月",
      //         "3月",
      //         "4月",
      //         "5月",
      //         "6月",
      //         "7月",
      //         "8月",
      //         "9月",
      //         "10月",
      //         "11月",
      //         "12月"
      //       ],
      //       axisPointer: {
      //         type: "shadow"
      //       }
      //     }
      //   ],
      //   yAxis: [
      //     {
      //       type: "value",
      //       name: "水量",
      //       min: 0,
      //       max: 250,
      //       interval: 50,
      //       axisLabel: {
      //         formatter: "{value} ml"
      //       }
      //     },
      //     {
      //       type: "value",
      //       name: "温度",
      //       min: 0,
      //       max: 25,
      //       interval: 5,
      //       axisLabel: {
      //         formatter: "{value} °C"
      //       }
      //     }
      //   ],
      //   series: [
      //     {
      //       name: "蒸发量",
      //       type: "bar",
      //       data: [
      //         2.0,
      //         4.9,
      //         7.0,
      //         23.2,
      //         25.6,
      //         76.7,
      //         135.6,
      //         162.2,
      //         32.6,
      //         20.0,
      //         6.4,
      //         3.3
      //       ]
      //     },
      //     {
      //       name: "降水量",
      //       type: "bar",
      //       data: [
      //         2.6,
      //         5.9,
      //         9.0,
      //         26.4,
      //         28.7,
      //         70.7,
      //         175.6,
      //         182.2,
      //         48.7,
      //         18.8,
      //         6.0,
      //         2.3
      //       ]
      //     },
      //     {
      //       name: "平均温度",
      //       type: "line",
      //       yAxisIndex: 1,
      //       data: [
      //         2.0,
      //         2.2,
      //         3.3,
      //         4.5,
      //         6.3,
      //         10.2,
      //         20.3,
      //         23.4,
      //         23.0,
      //         16.5,
      //         12.0,
      //         6.2
      //       ]
      //     }
      //   ]
      // });
    }
  }
  ,
  computed:{
    //权限分配
    getnewtree(){
      
      return this.tree.filter(i=> i.role.includes(sessionStorage.acctype))
    },
    //权限跳转
    rolepages(){
      let rolepage=[]
        for(let e of this.getnewtree){
          if(e.children){
             for(let i of e.children){
                rolepage.push(i.index)
             }
          }else{
            rolepage.push(e.index)
          }
        }
        return rolepage
    }
  },
  created(){
    
    
    
    sessionStorage.rolepage=JSON.stringify(this.rolepages)
    
  
    
    
  }
};
</script>

<style lang="less" scoped>
.el-menu {
  border-right: none;
  height: 100%;
}
.el-container {
  height: 100%;
  .el-aside {
    height: 100%;
    background-color: slateblue;
  }
}
.el-header {
  line-height: 50px;
}
.changblock {
  display: block;
 
}
</style>