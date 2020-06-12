<template>
  <div id="acc">
    
    <el-card class="box-card">
      <h3>
        店铺管理
        <el-button style="float:right;" type="primary" @click="saveshops">保存</el-button>
      </h3>
      <el-form
        :model="ruleForm"
        
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="店铺名称" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>




        <el-form-item label="店铺公告" prop="bulletin">
          <el-input type="textarea" v-model="ruleForm.bulletin" ></el-input>
        </el-form-item>




        <el-form-item label="店铺头像" prop="name">
          
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src='imageUrl' class="avatar" />

          </el-upload>
        </el-form-item>



        <el-form-item label="店铺图片">
          <div class="imgstyle">
            
            <el-upload v-for="(item,i) in ruleForm.pics" :key="i"  class="avatar-uploader"
              action="http://127.0.0.1:5000/shop/upload"
              
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <img  @click="getimg(item,i)" :src='SHOPIMG_UPLOAD+item' class="avatar" />
              
            </el-upload>
          </div>
          <button>查看历史图片</button>
        </el-form-item>










        <el-form-item label="配送费" prop="name">
          <el-input v-model="ruleForm.deliveryPrice"></el-input>
        </el-form-item>
        <el-form-item label="配送时间" prop="name">
          <el-input v-model="ruleForm.deliveryTime"></el-input>
        </el-form-item>
        <el-form-item label="配送描述" prop="name">
          <el-input v-model="ruleForm.description"></el-input>
        </el-form-item>
        <el-form-item label="店铺评分" prop="name">
          <el-input v-model="ruleForm.score"></el-input>
        </el-form-item>
        <el-form-item label="销量" prop="name">
          <el-input v-model="ruleForm.sellCount"></el-input>
        </el-form-item>
        <el-form-item label="活动">
          <el-checkbox-group v-model="form.type">
            
            <el-checkbox v-for="item in supports" :key="item" :label="item" >
              
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>

        <el-form-item label="营业时间" prop="name">
          <el-time-picker
            is-range
            v-model="value1"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            placeholder="选择时间范围"
          ></el-time-picker>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import {SHOPS_INFO,SHOPS_EDIT,SHOPIMG_UPLOAD} from "@/API/goods"
export default {
  
  data() {
    return {
      ruleForm: {
        
      },
      SHOPIMG_UPLOAD,
      shopsprices:'',
      supports:[],
      changebefore:"",
      changeindex:'',
      imageUrl: "",
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
        
      },
      value1:''
    };
  },
  methods: {
    getimg(e,i){
      this.changebefore=e
      this.changeindex=i
      
    },
    saveshops(){
      let {id,name,bulletin,avatar,deliveryPrice,deliveryTime,description,score,sellCount,supports,date,pics}=this.ruleForm
      
      
      
      SHOPS_EDIT(id,name,bulletin,avatar,deliveryPrice,deliveryTime,description,score,sellCount,JSON.stringify(supports),JSON.stringify(date),JSON.stringify(pics)).then(res=>{
        if(res.data.code==0){
          this.$message({
          message: '保存成功',
          type: 'success'
        });
        this.refash()
        }else{
          this.$message.error('保存失败，请稍后再试');
        }
        
      })
      
      
      
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          
          return false;
        }
      });
    },
    //保存事件
    
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleAvatarSuccess(res) {
      
      if(res.code==0){
        
        this.ruleForm.pics[this.changeindex]=res.imgUrl

        this.saveshops()
        
      }

        //图片名
    },
    beforeAvatarUpload(file) {
      console.log(file);
      
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    refash(){
      SHOPS_INFO().then(res=>{
      
      this.imageUrl=1
      this.supports=res.data.data.supports
      this.ruleForm.pics=res.data.data.pics
      this.imageUrl=this.SHOPIMG_UPLOAD+res.data.data.avatar

      this.ruleForm=res.data.data
      
      
    })
    
    }
  },
  created(){
    this.refash()
  }
};
</script>

<style lang="less" scoped>
#acc {
  
  width: 100%;
  .box-card {
    background: #ccc;
    box-sizing: border-box;
    padding: 0;
    h3 {
      border-bottom: 2px solid #ccc;
      line-height: 30px;
      padding-bottom: 20px;
    }
  }
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.imgstyle {
  width: 440px;
  display: flex;
  flex-wrap: wrap;
  > div {
    margin: 20px;
  }
}
.el-checkbox-group {
  width: 400px;
}
</style>