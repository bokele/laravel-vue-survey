import { createApp } from 'vue'
import './style.css'
import store from './store/index'
import router from './router/index'
import App from './App.vue'

createApp(App)
  .use(store)
  .use(router)
  .mount('#app')
