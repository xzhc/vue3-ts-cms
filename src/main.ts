import { createApp } from 'vue'
import App from './App.vue'
import 'normalize.css'
import './assets/css/index.less'
import router from './router'
import pinia from './store'
import registerIcons from './global/register-icons'

//0.针对ElMessage和ElLoading等组件引入样式
//0.1全局引入
//import 'element-plus/dist/index.css'
//0.2按需引入
//import 'element-plus/theme-chalk/el-message.css'
//0.3自动引入（插件）vite-plugin-style-import自动引入element-plus的style(推荐)

//1.全局引入element-plus:方便简洁但是打包后文件大
// import ElementPlus from 'element-plus'
//import 'element-plus/dist/index.css'
// app.use(ElementPlus)

//2.按需求引入

const app = createApp(App)

app.use(registerIcons)
app.use(router)
app.use(pinia)
app.mount('#app')
