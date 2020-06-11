<template>
    <div id="addacc">
    <el-card class="box-card">
        <h3>修改密码</h3>
        <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="原密码" >
            <el-input width="100px" v-model="form.oldpwd" @change="checkpwd()"></el-input>
        </el-form-item>
        <el-form-item label="新密码">
            <el-input v-model="form.newpwd" ></el-input>
        </el-form-item>
        <el-form-item label="确认密码">
            <el-input v-model="form.checknewpwd"></el-input>
        </el-form-item>
        
        <el-form-item>
          <el-button type="primary" @click="onSubmit">确定</el-button>
          <el-button>重置</el-button>
          
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import {API_CHANGEPWD} from "@/API/apis.js"
import {API_EDITPWD} from "@/API/apis.js"

export default {
      data() {
      return {
        form: {
          oldpwd: '',
          newpwd: '',
          checknewpwd:""
        },
        status:20,
        
      }
    },
    methods: {
      onSubmit() {
        if(this.status==0){
          
          API_EDITPWD(this.form.newpwd,sessionStorage.getItem("userid")).then((req)=>{
            if(req.data.code==0&&this.form.newpwd===this.form.checknewpwd){
                this.$message({
            message: '密码修改成功',
            type: 'success',

              });
            }else{
              this.$message.error('修改失败,请重试');
            }
          })
        }
        
        
      },
      checkpwd(){
        
        API_CHANGEPWD(this.form.oldpwd,sessionStorage.getItem('userid')).then((req)=>{
          
          
          if(req.data.code==0){
             this.status=req.data.code
           this.$message({
          message: '原密码密码正确',
          type: 'success',

        });
          }else{
            this.$message.error('原密码错误');
          }
          
        })
        
        
      }
    }
};
</script>

<style lang="less" scoped>
#addacc {
  .box-card {
    box-sizing: border-box;
    padding: 0;
    h3 {
      border-bottom: 2px solid #ccc;
      line-height: 30px;
      padding-bottom: 20px;
    }
    .el-input{
        width: 220px;
    }
  }
}
</style>