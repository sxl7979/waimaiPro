//商品管理
import axios from 'axios'
axios.defaults.baseURL="http://127.0.0.1:5000"
//添加商品分类
export const shops_addshop=(cateName,state)=>axios.post("/goods/addcate",{cateName,state})
//获取商品分类
export const shops_getshops=(currentPage,pageSize)=>axios.get("/goods/catelist",{params:{currentPage,pageSize}})
//删除商品分类
export const shops_delet_shopstype=(id)=>axios.get("/goods/delcate",{params:{id}})


//获取商品列表
export const shops_getshops_list=(currentPage,pageSize)=>axios.get("/goods/list",{params:{currentPage,pageSize}})
//删除对应的商品
export const shops_deleteshop=(id)=>axios.get("/goods/del",{params:{id}})


//获取商品分类
export const shops_getshops_type=()=>axios.get("/goods/categories",{params:{}})
//商品图片上传
export const shops_getshop_img=()=>axios.post("/goods/goods_img_upload",{})
//添加商品
//name-->商品名称
//category-->商品分类
//price-->商品价格
//imgUrl-->图片
//goodsDesc-->商品描述
export const shops_shops_addshop=(name,category,price,imgUrl,goodsDesc)=>axios.post("/goods/add",{name,category,price,imgUrl,goodsDesc})
//编辑商品

//name-->商品名称
//category-->商品分类
//price-->商品价格
//imgUrl-->图片
//goodsDesc-->商品描述
//id-->点击获得的ID
export const shops_shops_editshop=(name,category,price,imgUrl,goodsDesc,id)=>axios.post("/goods/add",{name,category,price,imgUrl,goodsDesc,id})