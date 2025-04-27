import { createApp } from 'vue'
// 使用vitest 目前會導入 但build 還沒測試 暫時保留
// import 'element-plus/dist/index.css'
import './style.css'
import store from './stores'
import router from './router'
import App from './App.vue'
import { setGlobalOptions } from 'vue-request'
import i18n from './locales/i18n'

setGlobalOptions({
  manual: true
  // loadingDelay: 10,
  // loadingKeep: 3000
})

createApp(App).use(store).use(router).use(i18n).mount('#app')
