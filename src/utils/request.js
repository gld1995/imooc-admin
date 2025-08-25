import axios from 'axios'
import { ElMessage } from 'element-plus'
import store from '../store'
import { checkTimeout } from './auth'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})

service.interceptors.request.use((config) => {
  config.headers.icode = 'helloqianduanxunlianying'
  if (store.getters.token) {
    if (checkTimeout()) {
      store.dispatch('user/logout')
      return Promise.reject(new Error('toekn 已失效'))
    }

    config.headers.Authorization = `Bearer ${store.getters.token}`
  }
  // 配置接口国际化
  config.headers['Accept-Language'] = store.getters.language
  return config
}, error => Promise.reject(error))

service.interceptors.response.use(response => {
  const { success, message, data } = response.data
  console.log('response', response)

  if (success) {
    return data
  } else {
    ElMessage.error(message)
    return Promise.reject(new Error(message))
  }
}, error => {
  if (
    error.response &&
      error.response.data &&
      error.response.data.code === 401
  ) {
    // token超时
    store.dispatch('user/logout')
  }

  ElMessage.error(error.message)
  return Promise.reject(error)
})

export default service
