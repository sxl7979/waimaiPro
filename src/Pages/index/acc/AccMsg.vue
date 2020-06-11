<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>管理员信息</span>
      <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
    </div>

    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="用户ID">
        <el-input v-model="form.id" disabled style="width:300px"></el-input>
      </el-form-item>
      <el-form-item label="用户名">
        <el-input v-model="form.account" disabled style="width:300px"></el-input>
      </el-form-item>
      <el-form-item label="用户权限">
        <el-input v-model="form.userGroup" disabled style="width:300px"></el-input>
      </el-form-item>
      <el-form-item label="创建时间">
        <el-input v-model="form.ctime" disabled style="width:300px"></el-input>
      </el-form-item>
      <el-form-item label="用户头像">
        <el-upload
          class="avatar-uploader"
          action=" http://127.0.0.1:5000/users/avatar_upload"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          :data="{id}"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          <el-button type="primary">更换头像</el-button>
        </el-upload>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>

import { API_GETACCMSG } from "@/API/apis.js";
//import { API_CHANGEIMG } from "@/API/apis.js";
export default {
  data() {
    return {
      form: {},
      imageUrl: "",
      id:sessionStorage.userid
    };
  },
  methods: {
    handleAvatarSuccess(res, file) {
      window.location.reload()

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
  created() {
    API_GETACCMSG(sessionStorage.getItem("userid")).then(req => {
      this.form = req.data.accountInfo;
    });
  }
};
</script>

<style lang="less" scoped>
.el-form-item {
  width: 200px;
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
.el-input{
  color: #000
}
</style>