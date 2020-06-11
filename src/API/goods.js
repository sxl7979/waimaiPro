//店铺管理
import axios from 'axios'
axios.defaults.baseURL="http://127.0.0.1:5000"
export const SHOPS_INFO=()=>axios.get("/shop/info",{params:{}})