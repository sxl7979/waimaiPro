<template>
  <div id="addacc">
    <el-card class="box-card">
      <h3>添加账号</h3>
      <el-form ref="form"  label-width="80px">
        <el-form-item label="账号">
          <el-input width="100px" v-model="acc"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="pwd"></el-input>
        </el-form-item>
        <el-form-item label="用户组">
          <el-select v-model="usergroup" placeholder="请选择用户组">
            <el-option label="超级管理员" value="超级管理员"></el-option>
            <el-option label="普通管理员" value="普通管理员"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">添加</el-button>
          <el-button>重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import {API_ADD_ACC} from '@/API/apis.js'
export default {
      data() {
      return {
        
          acc: '',
          pwd: '',
          usergroup:'',

        ACCadd:true
      }
    },
    methods: {
      onSubmit() {
          if(this.ACCadd==false) return
          this.ACCadd=false
          console.log(this.acc,this.pwd,this.usergroup);
          
          
          
        API_ADD_ACC(this.acc,this.pwd,this.usergroup).then((req)=>{
          if(req.data.code==0){
            this.$message({
            message: '添加成功',
            type: 'success'
            });
            this.$router.push("/index/acc/acclist")
          }else{
            this.$message.error('添加失败，请稍后再试')
          }
          
        })
        setTimeout(()=>{
          this.ACCadd=true
        },3000)
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
    .el-input {
      width: 220px;
    }
  }
}
</style>