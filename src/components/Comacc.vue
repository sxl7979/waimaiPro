<template>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/index/home' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item v-for="(e,i) in nav" :key="i">{{e}}</el-breadcrumb-item>

    <div class="accbox "  >
      <span v-html="acctext"></span>
      <el-dropdown>
        <p class="el-dropdown-link accimg">
          <img :src="imgurl" width="80px " height="80px" alt />
          
        </p>
        
        <el-dropdown-menu slot="dropdown">
          <el-link type="primary" href="/#/index/accmsg">个人信息</el-link>
          <br />
          <el-link type="primary" @click="out()" >退出系统</el-link>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </el-breadcrumb>
</template>

<script>
//获取用户信息
import { API_GETACCMSG } from "@/API/apis.js";
import { API_CHECKTOKEN } from "@/API/apis.js";
export default {
  data(){
    return{
      acctext:'的撒',
      imgurl:''
    }
  },
  props: ["nav"],
  methods: {
    tepages() {
      this.$route.push("/index/home");
      console.log(1);
    },
    out(){
      window.sessionStorage.clear()
      this.$router.push("/")
    }
  },
  created() {
    API_GETACCMSG(sessionStorage.userid).then(res=>{
      this.imgurl=res.data.accountInfo.imgUrl
      
      
    })
    API_CHECKTOKEN(sessionStorage.token).then(res => {
      if(res.data.code==0){
        this.acctext="欢迎回来!<a href='/#/index/accmsg' style='color:blue;margin:0 10px'>"+sessionStorage.accname+"</a>"
      }else{
        this.acctext="<a href='/'>请登陆</a>"
      }
    });
  }
};
</script>

<style lang="less" scoped>
.el-breadcrumb {
  color: #fff;
  font-size: 20px;
  width: 100%;
  background: url("../assets/imges/nav2.jpg") no-repeat ;
  background-size:100% 100%; background-attachment:fixed;
  padding: 0 20px;
  box-sizing: border-box;
  
  .el-breadcrumb-item{
    color: #fff !important;
    .el-breadcrumb__inner{
      color: #fff;
    }
  }
  >span{
    line-height:60px;
  }
  > div {
    box-sizing: border-box;
    float: right;
    
    span {
      padding-bottom: 8px;
      line-height: 60px;
    }
    p {
      display: inline-block;
      width: 80px;
      height: 80px;
      border-radius: 50%;
      overflow: hidden;
      margin: 0;
    }
  }
}
.accimg{
  text-align: center;
}
.accbox{
  display: flex;
  align-items: center;
}
.el-input__inner{
  color: #000;
}
</style>