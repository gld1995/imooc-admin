import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import installIcon from '@/icons'
import i18n from './i18n'
import installFilter from '@/filter'
import installDirective from '@/directives'
import 'element-plus/dist/index.css'
import './styles/index.scss'
import './permissions'

const app = createApp(App)
installIcon(app)
installFilter(app)
installDirective(app)

app.use(store).use(router).use(ElementPlus).use(i18n).mount('#app')
