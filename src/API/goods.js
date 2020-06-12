//店铺管理
import axios from 'axios'

export const SHOPS_INFO=()=>axios.get("/shop/info",{params:{}})
export const API_URL= "http://127.0.0.1:5000"
export const SHOPIMG_UPLOAD=API_URL+"/upload/shop/"
axios.defaults.baseURL=API_URL
//店铺内容修改
export const SHOPS_EDIT=(id,name,bulletin,avatar,deliveryPrice,deliveryTime,description,score,sellCount,supports,date,pics)=>axios.post("/shop/edit",{id,name,bulletin,avatar,deliveryPrice,deliveryTime,description,score,sellCount,supports,date,pics})