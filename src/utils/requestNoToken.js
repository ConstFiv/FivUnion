import config from "../config/index.js"
import axios from 'axios';
import { Message } from 'element-ui'


const service = axios.create({
    baseURL: config.baseURL,
    timeout: 20000,

});

service.interceptors.request.use(
    (config) => {
        return config
    },

);

service.interceptors.response.use(
    (response) => {
        return response.data
    },
    (error) => {
        // alert('请求超时，请检查网络或联系后台人员！')
        Message({
            message: '请求超时，请检查网络或联系后台人员！',
            type: 'error',
            duration: 5000
        })
        return new Promise(() => { })
    }
)



export default service