import { createApp } from 'vue'
import App from './App.vue'
import 'normalize.css'
import './assets/css/index.less'
import router from './router'
import pinia from './store'

//1.全局引入element-plus:方便简洁但是打包后文件大
// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'
// app.use(ElementPlus)

//2.按需求引入

const app = createApp(App)

app.use(router)
app.use(pinia)
app.mount('#app')
