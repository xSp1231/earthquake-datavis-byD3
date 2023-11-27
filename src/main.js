import { createApp } from 'vue'
import './style.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from "./router/index.js";
import App from './App.vue'
import store from './store'
const app = createApp(App)
app.config.warnHandler = () => null;
app.use(router)
app.use(ElementPlus)
app.use(store)
app.mount('#app')
