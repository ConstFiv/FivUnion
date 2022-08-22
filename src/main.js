import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control
import { setCookie, getCookie, delCookie } from './utils/util.js';
/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */









if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

// set ElementUI lang to EN
// Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  // 在这里挂载全局事件总线
  beforeCreate() {
    Vue.prototype.$bus = this
  },
   // 在这里挂载cookie的三个方法
   beforeMount() {
    Vue.prototype.$cookieStore = {
        setCookie,
        getCookie,
        delCookie
    }
},
  render: h => h(App)
})




// 使用rem以及屏幕分辨率自适应  
// const setFontSize = () => {
//   const htmlDom = document.getElementsByTagName('html')[0];
//   let htmlWidth = document.documentElement.clientWidth || document.body.clientWidth;
//   htmlDom.style.fontSize = `${htmlWidth / 192}px`
// };
// window.onresize = setFontSize;
// setFontSize()