import axios from 'axios'
axios.defaults.baseURL="http://127.0.0.1:5000"
//登陆接口
//account账号
//password密码
export const API_LOGIN = (account,password)=>axios.post('/users/checkLogin',{account,password})
//添加新的管理人员
//account账号
//password密码
//usergruop是权限等级
export const API_ADD_ACC=(account,password,userGroup) => axios.post("/users/add",{account,password,userGroup})

//获取账号列表
//currentPage  当前页码
//pageSize 每条页数
export const API_ACCLIST =(currentPage,pageSize)=>axios.get("/users/list",{params:{currentPage,pageSize}})


//删除列表
//删除对应的ID
export const API_DELETACC=(id)=>axios.get("/users/del",{params:{id}})
//批量删除用户
export const API_MOVEACCS=(ids)=>axios.get("/users/batchdel",{params:{ids}})

//修改用户数据
//id修改的ID
//account用户名
//userGroup组
export const API_USEREDIT=(id,account,userGroup)=>axios.post("/users/edit",{id,account,userGroup})
//获取登陆用户信息
//export const APT_LOGINACC= ()=>axios.get("/users/accountinfo")

//检查当前用户的密码
export const API_CHANGEPWD=(oldPwd,id)=> axios.get("/users/checkoldpwd",{params:{oldPwd,id}})
//修改用户密码
export const API_EDITPWD=(newPwd,id)=>axios.post("/users/editpwd",{newPwd,id})

//获取用户信息
export const API_GETACCMSG=(id)=>axios.get("/users/accountinfo",{params:{id}})
//判断用户的token
export const API_CHECKTOKEN=(token)=>axios.get("/users/checktoken",{params:{token}})

//更换用户头像
export const API_CHANGEIMG=(id,imgUrl)=>axios.post("/users/avatar_upload",{id,imgUrl})


//首页echarts接口
export const API_ECHARTS=()=> axios.get("/order/totaldata",{params:{}})