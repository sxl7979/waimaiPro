<template>
  <div id="acc">
    
    <el-card class="box-card">
      <h3>
        店铺管理
        <el-button style="float:right;" type="primary">保存</el-button>
      </h3>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="店铺名称" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="店铺公共" prop="desc">
          <el-input type="textarea" v-model="ruleForm.desc"></el-input>
        </el-form-item>
        <el-form-item label="店铺头像" prop="name">
          <img :src='"http://127.0.0.1:5000/upload/shop/"+ruleForm.avatar' alt="">
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src='"http://127.0.0.1:5000/upload/shop/"+ruleForm.avatar' class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon" style="border:1px solid #ccc"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="店铺图片">
          <div class="imgstyle">
            <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon" style="border:1px solid #ccc"></i>
            </el-upload>
            <el-upload v-for="item in ruleForm.pics" :key="item" class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <img v-if="imageUrl" :src='"http://127.0.0.1:5000/upload/shop/"+item' class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon" style="border:1px solid #ccc"></i>
            </el-upload>
          </div>
        </el-form-item>
        <el-form-item label="配送费" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="配送s时间" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="配送描述" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="店铺评分" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="销量" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
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
import {SHOPS_INFO} from "@/API/goods"
export default {
  
  data() {
    return {
      ruleForm: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
        pics:[],
        avatar:''
      },
      supports:[],
      rules: {
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        region: [
          { required: true, message: "请选择活动区域", trigger: "change" }
        ],
        date1: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change"
          }
        ],
        date2: [
          {
            type: "date",
            required: true,
            message: "请选择时间",
            trigger: "change"
          }
        ],
        type: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个活动性质",
            trigger: "change"
          }
        ],
        resource: [
          { required: true, message: "请选择活动资源", trigger: "change" }
        ],
        desc: [{ required: true, message: "请填写店铺公告", trigger: "blur" }]
      },
      imageUrl: "",
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      value1:''
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    }
  },
  created(){
    SHOPS_INFO().then(res=>{
      console.log(res.data.data);
      
      this.supports=res.data.data.supports
      this.ruleForm.pics=res.data.data.pics
      this.ruleForm.avatar=res.data.data.avatar

    })
    
  }
};
</script>

<style lang="less" scoped>
#acc {
  width: 100%;
  .box-card {
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