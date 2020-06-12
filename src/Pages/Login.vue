<template>
  <div id="login">
    <el-card class="box-card" >
      <h2>多人运动俱乐部后台</h2>
      <el-input class="login_input" style="background:rgba(0,0,0,.5); color:#fff" v-model="acc" placeholder="账号"></el-input>
      <el-input class="login_input" v-model="pwd" placeholder="密码"></el-input>
      <el-button @click="lognicheck()" type="primary" style="color:#0215E21;">登陆</el-button>
    </el-card>
  </div>
</template>

<script>

import {API_LOGIN} from "@/API/apis.js"
//import {APT_LOGINACC} from "@/API/apis.js"
export default {
  data() {
    return {
      acc:'',
      pwd:'',
      CheckLogin:true,
      flag:false
    };
  },
  methods: {
    lognicheck() {
      if(this.CheckLogin==false) return
        this.CheckLogin=false
        API_LOGIN(this.acc,this.pwd).then((req)=>{
          if(req.data.code==0){
            this.$message({
            message: '登陆成功',
            type: 'success'
            });
            
            
            sessionStorage.token=req.data.token
            sessionStorage.setItem("userid",req.data.id)
            sessionStorage.setItem("accname",this.acc)
            //console.log(APT_LOGINACC());
            sessionStorage.acctype=req.data.role
            this.$router.push("/index/home")
          }else{
            this.$message.error('登陆失败')
          }
          
        })
        setTimeout(()=>{
          this.CheckLogin=true
        },3000)
      }
        
        
        
    },
  // created(){
  //   setTimeout(()=>{
  //     this.flag=true
  //   },10850)
  // }
  
};
</script>

<style lang='less' scoped>
#login {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  background:url("../assets/imges/bg2.jpg") no-repeat ;
  background-size:100% 100%; background-attachment:fixed;
  
  
  .el-input {
    input{
      background: rgba(0, 0, 0, .4);
    }
    line-height: 40px;
    margin-bottom: 20px;
    .el-input__inner{
      background: red;
    }
  }
  .el-button {
    width: 100%;
    background:rgba(0, 0, 0, .5);
    border: 1px solid rgba(2, 94, 33, 1);
    font-size: 20px;
  }
  .box-card {
    text-align: center;
    width: 360px;
    background-color: transparent;
    h2{color: #fff;}
    .el-input__inner{
      background: #008c8c;
    }
  }
}
</style>