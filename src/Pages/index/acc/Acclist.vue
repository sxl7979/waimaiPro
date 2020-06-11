<template>
  <div id="addacc">
    <el-card class="box-card">
      <h3>账号列表</h3>
      <el-table
        ref="multipleTable"
        :data="ACCLIST"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="selsChange"
        
      >
        <el-table-column type="selection" width="55"></el-table-column>

        <el-table-column label="账号" prop="account"></el-table-column>
        <el-table-column label="用户组" prop="userGroup"></el-table-column>
        <el-table-column label="创建时间" prop="ctime"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="info" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>

            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="pages"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totol"
        ></el-pagination>
      </div>
      <el-dialog
        title="编辑用户信息"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose"
      >
        <el-form label-width="80px">
          <el-form-item label="账号">
            <el-input v-model="newname"></el-input>
          </el-form-item>
          <el-form-item label="用户组">
            <el-select v-model="newusergruop" placeholder="请选择新的用户组">
              <el-option label="超级管理员" value="超级管理员"></el-option>
              <el-option label="普通管理员" value="普通管理员"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="editacc()">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 删除 -->
      <el-row>
        <el-button type="danger" @click="moveaccs()">批量删除</el-button>
        <el-button type="primary">取消选择</el-button>
      </el-row>
    </el-card>
  </div>
</template>

<script>
//删除
import { API_DELETACC } from "@/API/apis.js";
//渲染账号列表
import { API_ACCLIST } from "@/API/apis.js";
//批量删除账号
import { API_MOVEACCS } from "@/API/apis.js";
//修改用户
import { API_USEREDIT } from "@/API/apis.js";

export default {
  data() {
    return {
      search: "",
      checked: false,
      currentPage: 1,
      ACCLIST: [],
      sels: [],
      ids: [],
      pages: 5,
      dialogVisible: false,
      newname: "",
      newusergruop: "",
      editID: 0,
      accnum: 0,
      totol: 0
    };
  },
  methods: {
    //编辑
    handleEdit(index, row) {
      this.dialogVisible = true;

      this.editID = row.id;
    },
    //删除
    handleDelete(index, row) {
      this.$confirm("此操作将永久删除用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          API_DELETACC(row.id);
          this.updatelist();
          --this.accnum;
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    handleSizeChange(val) {
      //当前页数
      this.pages = val;
      this.updatelist();
    },
    handleCurrentChange(val) {
      //console.log(`当前页: ${val}`);
      (this.currentPage = val), this.updatelist();
    },
    selsChange(val) {
      this.ids=val.map(item=> item.id)
      
      
    },
    //批量删除
    moveaccs() {
      if (this.ids.length == 0) return;

      this.$confirm("此操作将永久删除这些用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          API_MOVEACCS(JSON.stringify(this.ids)).then(req => {
            if (req.data.code == 0) {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              this.updatelist()
            } else {
              this.$message.error("删除失败请稍后再试");
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //点击编辑
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(() => {
          done();
        })
        .catch(() => {});
    },
    //修改用户数据btn
    editacc() {
      this.$confirm("改操作将修改用户数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          API_USEREDIT(this.editID, this.newname, this.newusergruop).then(
            req => {
              if (req.data.code == 0) {
                this.updatelist();
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
              } else {
                this.$message.error("修改失败,请稍后再试");
              }
            }
          );
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    updatelist() {
      API_ACCLIST(this.currentPage, this.pages).then(req => {
        this.ACCLIST = req.data.data;

        this.totol = req.data.total;
      });
    },
    getselection(selection){
      
      console.log(selection);
      
    }
  },
  created() {
    this.updatelist();
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
</style>