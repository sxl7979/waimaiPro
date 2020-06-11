<template>
  <div id="order">
    <!-- 查询 -->
    <div class="order-center">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="订单号">
          <el-input v-model="formInline.orderNo" placeholder="订单号"></el-input>
        </el-form-item>
        <el-form-item label="收货人">
          <el-input v-model="formInline.consignee" placeholder="收货人"></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="formInline.phone" placeholder="手机号"></el-input>
        </el-form-item>
        <el-form-item label="订单状态">
          <el-input v-model="formInline.orderState" placeholder="订单状态"></el-input>
        </el-form-item>
        <div class="block">
          <span class="demonstration" style="color:#606266;margin-right:10px">选择时间</span>
          <el-date-picker
            v-model="value2"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions"
          ></el-date-picker>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
          </el-form-item>
        </div>
      </el-form>
    </div>
    <!-- 用户订单 -->
    <div class="order-user">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column fixed prop="orderNo" label="订单号" width="100"></el-table-column>
        <el-table-column prop="orderTime" label="下单时间" width="160"></el-table-column>
        <el-table-column prop="phone" label="手机号" width="120"></el-table-column>
        <el-table-column prop="consignee" label="收货人" width="120"></el-table-column>
        <el-table-column prop="deliverAddress" label="配送地址" width="300"></el-table-column>
        <el-table-column prop="deliveryTime" label="送达时间" width="160">
            
        </el-table-column>
        <el-table-column prop="remarks" label="用户备注" width="120"></el-table-column>
        <el-table-column prop="orderAmount" label="订单金额" width="120"></el-table-column>
        <el-table-column prop="orderState" label="订单状态" width="120"></el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
            <el-button type="text" size="small" @click="handleEdit(scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="block">
      <!-- 查看订单信息 -->
      <el-dialog :title="looktitle" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="用户ID" :label-width="formLabelWidth">
            <el-input v-model="form.id" autocomplete="off" :disabled="flag"></el-input>
          </el-form-item>
          <el-form-item label="下单时间" :label-width="formLabelWidth">
            <el-date-picker
              v-model="form.orderTime"
              type="datetime"
              @change="getSTime"
              value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="选择日期时间"
              align="right"
              :disabled="flag"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="用户电话" :label-width="formLabelWidth">
            <el-input v-model="form.phone" autocomplete="off" :disabled="flag"></el-input>
          </el-form-item>
          <el-form-item label="收货人" :label-width="formLabelWidth">
            <el-input v-model="form.consignee" autocomplete="off" :disabled="flag"></el-input>
          </el-form-item>
          <el-form-item label="收货地址" :label-width="formLabelWidth">
            <el-input v-model="form.deliverAddress" autocomplete="off" :disabled="flag"></el-input>
          </el-form-item>

          <el-form-item label="送达时间" :label-width="formLabelWidth">

            <el-date-picker v-model="form.deliveryTime" value-format="yyyy-MM-dd HH:mm:ss" type="datetime" placeholder="选择日期时间" @change="getdeliveryTime"></el-date-picker>

            <!-- <el-date-picker v-model="form.deliveryTime" type="datetime" placeholder="选择日期时间" @change="getSTime"
              value-format="yyyy-MM-dd HH:mm:ss"  align="right"  :disabled="flag">
            </el-date-picker>-->
          </el-form-item>
          <el-form-item label="用户备注" :label-width="formLabelWidth">
            <el-input v-model="form.remarks" autocomplete="off" :disabled="flag"></el-input>
          </el-form-item>
          <el-form-item label="订单金额" :label-width="formLabelWidth">
            <el-input v-model="form.orderAmount" autocomplete="off" :disabled="flag"></el-input>
          </el-form-item>
          <el-form-item label="订单状态" :label-width="formLabelWidth">
            <el-input v-model="form.orderState" autocomplete="off" :disabled="flag"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer" v-if="!flag">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="text" @click="orderEdit()">确 定</el-button>
        </div>
      </el-dialog>

      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="pages"
        layout="total, prev, pager, next"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import { ORDER_GETLIST, ORDER_LOOKdetail, ORDER_DEITORDER } from "@/API/order";
export default {
  data() {
    return {
      dialogTableVisible: false,
      input: "",
      formInline: {
        orderNo: "",
        consignee: "",
        phone: "",
        orderState: ""
      },
      flag: true,
      total: 0,
      pages: 5,
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      looktitle: "订单信息",
      value1: "",
      value2: "",
      tableData: [],
      currentPage: 1,
      dialogFormVisible: false,
      form: {},
      formLabelWidth: "120px"
    };
  },
  methods: {
    onSubmit() {},
    getdeliveryTime(val){
      console.log(val);
      
    },
    getSTime(val) {
      console.log(val);

      this.form.orderTime = val; //这个sTime是在data中声明的，也就是v-model绑定的值
    },
    handleSizeChange(val) {
      //console.log(`每页 ${val} 条`);
      this.pages = val;
      this.refeshtableData();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.refeshtableData();
    },
    refeshtableData() {
      ORDER_GETLIST(this.currentPage, this.pages).then(res => {
        this.total = res.data.total;
        console.log(res.data.data);
        for(let e of res.data.data){
          e.orderTime=new Date(e.orderTime).toJSON().substr(0,19).replace("T"," ")
          e.deliveryTime=new Date(e.deliveryTime).toJSON().substr(0,19).replace("T"," ")
        }
        this.tableData = res.data.data;
      });
    },

    //查看订单信息
    handleClick(row) {
      ORDER_LOOKdetail(row.id).then(res => {
        this.form = res.data.data;
      });
      this.dialogFormVisible = true;
      this.flag = true;
    },
    //编辑框
    handleEdit(row) {

      ORDER_LOOKdetail(row.id).then(res => {
          res.data.data.orderTime=new Date(res.data.data.orderTime).toJSON().substr(0,19).replace("T"," ")
          res.data.data.deliveryTime=new Date(res.data.data.deliveryTime).toJSON().substr(0,19).replace("T"," ")
        this.form = res.data.data;
        
        
      });

      this.dialogFormVisible = true;
      this.flag = false;
    },
    //发送修改请求
    orderEdit() {
      var {
        id,
        orderNo,
        orderTime,
        phone,
        consignee,
        deliverAddress,
        deliveryTime,
        remarks,
        orderAmount,
        orderState
      } = this.form;
      console.log(
        id,
        orderNo,
        orderTime,
        phone,
        consignee,
        deliverAddress,
        deliveryTime,
        remarks,
        orderAmount,
        orderState
      );


      ORDER_DEITORDER(id,orderNo,orderTime,phone,consignee,deliverAddress,deliveryTime,remarks,orderAmount,orderState).then( res =>{
        if(res.data.code==0){
          this.$message({
          message: '修改成功',
          type: 'success'
        });
        this.dialogFormVisible = false
        this.refeshtableData()
        }else{
          this.$message.error('修改失败，请稍后再试');
        }

      })

      // ORDER_DEITORDER(id,orderNo,orderTime,phone,consignee,deliverAddress,deliveryTime,remarks,orderAmount,orderState).then(res=>{
      //   console.log(res);

      // })
    }
  },
  created() {
    this.refeshtableData();
  }
};
</script>

<style lang="less" scoped>
#order {
  width: 100%;
  .order-user {
    padding: 30px 10px;
  }
  .el-pagination {
    padding: 0 20px;
  }
  box-sizing: border-box;
  .order-center {
    .el-input {
      width: 200px;
      height: 30px;
    }
    .el-form {
      padding: 30px;
    }
  }
  .el-button {
    margin: 0 20px;
  }
}
</style>