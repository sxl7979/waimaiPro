<template>
  <div id="addacc">
    <el-card class="box-card">
      <h3>商品列表</h3>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="商品名称">
                <span>{{ props.row.name }}</span>
              </el-form-item>
              <el-form-item label="所属店铺">
                <span>{{ props.row.shop }}</span>
              </el-form-item>
              <el-form-item label="商品 ID">
                <span>{{ props.row.id }}</span>
              </el-form-item>
              <el-form-item label="店铺 ID">
                <span>{{ props.row.shopId }}</span>
              </el-form-item>
              <el-form-item label="商品分类">
                <span>{{ props.row.category }}</span>
              </el-form-item>
              <el-form-item label="店铺地址">
                <span>{{ props.row.address }}</span>
              </el-form-item>
              <el-form-item label="商品描述">
                <span>{{ props.row.desc }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="商品名称" width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="所属分类" width="180">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>{{ scope.row.name }}</p>

              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">{{ scope.row.name }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="商品价格" width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.price }}</span>
          </template>
        </el-table-column>
        <el-table-column label="商品图片" width="180">
          <template slot-scope="scope">
            <!--http://127.0.0.1:5000/upload/shop/1590480110394.webp  -->
            <span style="margin-left: 10px">
              <!-- http://127.0.0.1:5000/upload/imgs/goods_img/+scope.row.imgUr -->
              <img   width="100"   :src='"http://127.0.0.1:5000/upload/imgs/goods_img/"+scope.row.imgUrl' />
            </span>
          </template>
        </el-table-column>
        <el-table-column label="商品描述" width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.goodsDesc }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit( scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete( scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="pagenum"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totol"
        ></el-pagination>
      </div>
      <!--  -->
      <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="活动名称" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="活动区域" :label-width="formLabelWidth">
            <el-select v-model="form.region" placeholder="请选择活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 修改模态框 -->
      <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="商品名称" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="商品分类" :label-width="formLabelWidth">
            <el-select v-model="form.category" placeholder="请选择活动区域">
              <el-option
                v-for="(e,i) in categories"
                :key="i"
                :label="e.cateName"
                :value="e.cateName"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="商品价格" :label-width="formLabelWidth">
            <el-input v-model="form.price" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="商品描述" :label-width="formLabelWidth">
            <el-input v-model="form.goodsDesc" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="商品图片" :label-width="formLabelWidth">
            <el-upload
              class="avatar-uploader"
              action="http://127.0.0.1:5000/goods/goods_img_upload"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="changeshops()">确 定</el-button>
        </div>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
//获取商品列表
import {
  shops_getshops_list,
  shops_deleteshop,
  shops_getshops_type,
  shops_shops_editshop
} from "@/API/shops.js";
export default {
  data() {
    return {
      tableData: [],
      currentPage: 1,
      totol: 0,
      pagenum: 5,
      form: {
        name: "",
        category: "",
        price: "",
        imageUrl: "",
        goodsDesc: "",
        id: ""
      },
      imageUrl: "",
      formLabelWidth: "120px",
      dialogTableVisible: false,
      dialogFormVisible: false,
      categories: []
    };
  },
  methods: {
    handleSizeChange(val) {
      //console.log(`每页 ${val} 条`);
      this.pagenum = val;
      this.getshopslist();
    },
    handleAvatarSuccess(res) {
      console.log(res);

      this.form.imageUrl = res.imgUrl;
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
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getshopslist();
      //console.log(`当前页: ${val}`);
    },
    getshopslist() {
      shops_getshops_list(this.currentPage, this.pagenum).then(res => {
        this.totol = res.data.total;
        this.tableData = res.data.data;
      });
    },
    format(percentage) {
      return percentage === 100 ? "满" : `${percentage}%`;
    },
    //修改商品
    changeshops() {
      shops_shops_editshop(
        this.form.name,
        this.form.category,
        this.form.price,
        this.form.imageUrl,
        this.form.goodsDesc,
        this.form.id
      ).then(res => {
        if (res.data.code == 0) {
          this.getshopslist();
          this.$message({
            message: "修改成功",
            type: "success"
          });
          this.dialogFormVisible = false;
        } else {
          this.$message.error("修改失败，请稍后再试");
        }
      });
    },
    handleEdit(row) {
      this.ids = row.id;

      this.dialogFormVisible = true;
    },
    handleDelete(row) {
      shops_deleteshop(row.id).then(res => {
        if (res.data.code == 0) {
          this.getshopslist();
          this.$message({
            message: "删除成功",
            type: "success"
          });
        } else {
          this.$message.error("删除失败");
        }
      });
    }
  },
  //生命周期加载
  created() {
    this.getshopslist();
    shops_getshops_type().then(res => {
      this.categories = res.data.categories;
    });
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
  }
}
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
.block {
  margin: 20px 0;
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
</style>