import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../Pages/Login.vue'
Vue.use(VueRouter)
import { API_CHECKTOKEN } from "@/API/apis"
const router = new VueRouter({
    routes: [{
        path: '/',
        name: "login",
        component: Login,
    },
    //首页
    {
        path: '/index',
        name: "index",
        component: () => import("../Pages/Index"),
        //首页子页
        children: [
            //主页模块
            {
                path: '/index/home',
                name: "home",
                component: () => import("../Pages/index/Home.vue"),

            },
            //订单管理模块
            {
                path: '/index/order',
                name: "order",
                component: () => import("../Pages/index/Order.vue"),
                meta: ['订单管理']
            },
            //订单管理模块
            {
                path: '/index/accmsg',
                name: "accmsg",
                component: () => import("../Pages/index/acc/AccMsg.vue"),
                meta: ['账号管理',"个人信息"]
            },
            //店铺管理模块
            {
                path: '/index/shops',
                name: "shops",
                component: () => import("../Pages/index/Shops.vue"),
                meta: ['店铺管理']
            },
            //商品管理模块
            {
                path: '/index/goods',
                name: "goods",
                component: () => import("../Pages/index/Goods.vue"),
                children: [{
                    path: '/index/goods/goodslist',
                    name: "goodslist",
                    component: () => import("../Pages/index/goods/Goodslist.vue"),
                    meta: ['商品管理', '商品列表']
                },
                {
                    path: '/index/goods/goodsadd',
                    name: "goodsadd",
                    component: () => import("../Pages/index/goods/Goodsadd.vue"),
                    meta: ['商品管理', '添加商品']
                },
                {
                    path: '/index/goods/goodstype',
                    name: "goodstype",
                    component: () => import("../Pages/index/goods/Goodstype.vue"),
                    meta: ['商品管理', '商品样式']
                }]
            },
            //账号管理
            {
                path: '/index/acc',
                name: "acc",
                component: () => import("../Pages/index/Account.vue"),
                children: [{
                    path: '/index/acc/acclist',
                    name: "acclist",
                    component: () => import("../Pages/index/acc/Acclist.vue"),
                    meta: ['账号管理', '账号列表'],

                },
                {
                    path: '/index/acc/addacc',
                    name: "addacc",
                    component: () => import("../Pages/index/acc/Addacc.vue"),
                    meta: ['账号管理', '添加账号'],
                },
                {
                    path: '/index/acc/changepwd',
                    name: "changepwd",
                    component: () => import("../Pages/index/acc/Changepwd.vue"),
                    meta: ['账号管理', '修改密码'],
                }]
            },
            //销售统计模块
            {
                path: '/index/sales',
                name: "sales",
                component: () => import("../Pages/index/Sales.vue"),
                children: [{
                    path: '/index/sales/salesnum',
                    name: "sales",
                    component: () => import("../Pages/index/sales/SalesNum.vue"),
                    meta: ['销售统计', '订单统计'],
                },
                {
                    path: '/index/sales/goodsnum',
                    name: "sales",
                    component: () => import("../Pages/index/sales/GoodsNum.vue"),
                    meta: ['销售统计', '商品统计'],
                }]
            },]
    },

    ]
})
router.beforeEach((to, from, next) => {
    //to 将要访问得路径
    //from 从哪个路径来,
    //next 时一个函数，表示放行
    
    
    
    if(to.path !="/"){
        API_CHECKTOKEN(sessionStorage.token).then(res=>{
            if(res.data.code==0){
                next()
                
                // if(to.path=="/index/home"){
                //     let rolepage=JSON.parse(sessionStorage.rolepage)
                    
                //     for(let e of rolepage){
                //         if(to.path=e){
                //             next()
                //         }else{
                //             next(from.path)
                //         }
                //     }
                    
                // }
            }else{
                next("/")
            }
        })
        
    }else next()



    /*
                for (let e of rolepage) {
                    if (to.path == e) {
                        next()
                    } else {
                        next(from.path)
                    }
                } */
})
export default router