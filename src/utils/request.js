import axios from 'axios'
import { ElMessage } from 'element-plus'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})

service.interceptors.request.use((config) => {
  config.headers.icode = 'helloqianduanxunlianying'
  return config
})

service.interceptors.response.use(response => {
  const { success, message, data } = response.data
  console.log('response', response, success)

  if (success) {
    return data
  } else {
    ElMessage(message)
    return Promise.reject(new Error(message))
  }
}, error => {
  ElMessage(error.message)
  return Promise.reject(error)
})

export default service
