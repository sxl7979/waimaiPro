<template>
  <div id="addacc">
    <el-card class="box-card">
      <h3>
        商品分类
        <el-button type="success" style="float:right" @click="dialogFormVisible = true">添加分类</el-button>
      </h3>
      <el-dialog title="添加分类" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="分类名称" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="是否启用" :label-width="formLabelWidth">
            <el-switch v-model="form.value" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="addShopsType()">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 添加分类 -->
      <el-table ref="singleTable" :data="tableData" highlight-current-row style="width: 100%">
        <el-table-column type="index" width="100" label="序号"></el-table-column>
        <el-table-column prop="cateName" label="分类名称" width="400"></el-table-column>
        <el-table-column label="是否启用" width="400" >
          <el-switch v-model="value" @change="getbool()"  active-color="#13ce66" inactive-color="#ff4949"></el-switch>
        </el-table-column>
        <!-- 编辑和删除 -->
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 页数 -->
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size="5"
          layout="total, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
import {
  shops_getshops,
  shops_addshop,
  shops_delet_shopstype
} from "@/API/shops.js";
export default {
  data() {
    return {
      tableData: [],
      dialogVisible: false,
      currentRow: null,
      pagesize: 5,
      value: true,
      total: 0,
      currentPage: 1,
      input: "",
      dialogTableVisible: false,
      dialogFormVisible: false,
      form: {
        name: "",
        value: true
      },
      formLabelWidth: "120px"
    };
  },

  methods: {
    setCurrent(row) {
      this.$refs.singleTable.setCurrentRow(row);
    },
    //添加分类
    addShopsType() {
      if (this.form.name == "") return;
      shops_addshop(this.form.name, this.form.value).then(res => {
        if (res.data.code == 0) {
          this.$message({
            message: "添加成功",
            type: "success"
          });
          this.reshopslist();
          this.dialogFormVisible=false
        } else {
          this.$message.error("添加失败,请稍后再试");
        }
      });
    },
    open() {
      this.$prompt("请输入商品名称", "商品分类", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/
      })
        .then(({ value }) => {
          this.$message({
            type: "success",
            message: "你的邮箱是: " + value
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入"
          });
        });
    },
    //修改分类
    handleEdit() {},
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(() => {
          done();
        })
        .catch(() => {});
    },
    //删除分类
    handleDelete(obj) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          shops_delet_shopstype(obj.id).then(res => {
            if (res.data.code == 0) {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              this.reshopslist();
            }else{
              this.$message.error('删除失败');
            }
          });
        })

    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.reshopslist();
    },
    //获取布尔值
    getbool(){
      console.log(this.value);
      
    }
    ,
    //更新商品列表
    reshopslist() {
      shops_getshops(this.currentPage, this.pagesize).then(res => {
        this.tableData = res.data.data;
        this.total = res.data.total;
        
        
      });
    }
  },
  created() {
    //console.log(shops_addshop);
    this.reshopslist();
  }
};
</script>

<style lang="less" scoped>
#addacc {
  background: #ccc;
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
.el-pagination {
  margin: 30px 0;
}
</style>