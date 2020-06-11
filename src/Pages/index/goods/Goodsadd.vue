<template>
  <div id="addacc">
    <el-card class="box-card">
      <h3>添加商品</h3>
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="商品名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="商品分类">


          <el-select v-model="form.category" placeholder="请选择商品分类">
            <el-option v-for="(e,i) in categories" :key="i" :label="e.cateName" :value="e.cateName"></el-option>
          </el-select>


        </el-form-item>
        <el-form-item label="商品价格">
          <el-input-number v-model="form.price" @change="handleChange" :min="1" :max="10" label="描述文字"></el-input-number>
        </el-form-item>
        <el-form-item label="商品图片">
                <el-upload 
                    class="avatar-uploader"
                    action="http://127.0.0.1:5000/goods/goods_img_upload"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload">
                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                    <i style="border:2px solid #ccc" v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
        </el-form-item>
        <el-form-item label="商品描述">
          <el-input style="width:400px" type="textarea" v-model="form.goodsDesc"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">添加商品</el-button>

        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import {shops_getshops_type,shops_shops_addshop} from '@/API/shops'
export default {
  data() {
    return {
      form: {
        name: "",
        category: "",
        price:'',
        imageUrl:'',
        
        goodsDesc: "",
        
        },
        categories:[],
        imageUrl: ''
    };
  },
  methods: {
    onSubmit() {
      
      
      shops_shops_addshop(this.form.name,this.form.category,this.form.price,this.form.imageUrl,this.form.goodsDesc,).then(res=>{
        if(res.data.code===0){
          this.$message({
          message: '恭喜你，这是一条成功消息',
          type: 'success'
        });
        this.$router.push('/index/goods/goodslist')
        }else{
          this.$message.error('添加失败，请稍后再试');
        }
        
      })
      
      //shops_shops_addshop(this.form.name,this.form.region,)
      
    },
    handleChange(value) {
        console.log(value);
      },
      handleAvatarSuccess(res) {
        this.form.imageUrl = res.imgUrl
        
        
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      }
  },
  created(){
    shops_getshops_type().then(res=>{
      
      this.categories=res.data.categories
      
    })
    
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
    .el-table {
      margin: 20px;
    }
    .el-row {
      margin: 20px 0;
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
    border-color: #409EFF;
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

</style>