import Vue from 'vue'
import App from './App.vue'
import less from 'less'
import router from './router/router'
import element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import echarts from 'echarts'
Vue.prototype.$echarts = echarts

  
Vue.config.productionTip = false
Vue.use(less)
Vue.use(element)
new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
  