//自定义插件模块
import axios from 'axios'
const MyPlugin={};
MyPlugin.install = (Vue)=>{
    axios.defaults.baseURL ='http://localhost:3000/'
    // 4. 添加实例方法
    Vue.prototype.axios = axios
}

export default MyPlugin 