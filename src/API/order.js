import axios from 'axios'

axios.defaults.baseURL="http://127.0.0.1:5000"

//获取订单列表
export const ORDER_GETLIST=(currentPage,pageSize)=>axios.get("/order/list",{params:{currentPage,pageSize}})

//获取当前订单详情
export const ORDER_LOOKdetail=(id)=>axios.get("/order/detail",{params:{id}})

//修改订单信息
export const ORDER_DEITORDER=(id,orderNo,orderTime,phone,consignee,deliverAddress,deliveryTime,remarks,orderAmount,orderState)=>axios.post("/order/edit",{id,orderNo,orderTime,phone,consignee,deliverAddress,deliveryTime,remarks,orderAmount,orderState})

//订单接口
export const ORDER_ORDERTOTAL=(date)=>axios.get("/order/ordertotal",{params:{date}})

//查询订单
export const ORDER_LIST=(currentPage,pageSize,orderNo,consignee,phone,orderState,date)=>axios.get("/order/list",{params:{currentPage,pageSize,orderNo,consignee,phone,orderState,date}})