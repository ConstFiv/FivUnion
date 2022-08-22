import config from "@/config/index.js"
import Vue from 'vue'
import axios from 'axios';
import { getCookie, setCookie } from '@/utils/util'
// import router from "../store/index"


const service = axios.create({
    baseURL: config.baseURL,
    timeout: 20000,
    // headers: {'Authorization': 'Bearer '+getCookie('token')}

});

// request请求拦截
service.interceptors.request.use(config => {
    let token = getCookie("token")
    if (token) {
        config.headers.Authorization = 'Bearer ' + token
    }
    return config
}, error => {
    Promise.reject(error)
})

service.interceptors.response.use(
    (response) => {
        return response.data
    },
    (error) => {
        if (error.response.status == 401) {
            Vue.prototype.$message.error("登录已过期，请重新登录！")
            Vue.prototype.$bus.$emit('goToLogin')
            setCookie("token")
            
        }
        return new Promise(() => { })
    }
)


// //response拦截器
// service.interceptors.response.use(res  =>  { 
//     return res;
// },  error  =>  {
//     //token失效返回401处理
//     if (error.response.code == 401) {
//         alert("yo,你被踢了，重新登录yo")
//         Vue.prototype.$router.push('./login')
//     }
//     return Promise.reject(error.response.data) // 返回错误信息
// })



export default service