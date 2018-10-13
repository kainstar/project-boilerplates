import axios from 'axios'

const baseURL = process.env.NODE_ENV === 'development'
  ? 'http://localhost:8080/api' // webpack-dev-server
  : 'http://localhost:3000/api' // express-server

const axiosInstance = axios.create({
  baseURL
})

// Add a request interceptor
axiosInstance.interceptors.request.use(function (config) {
  // Do something before request is sent
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

// Add a response interceptor
axiosInstance.interceptors.response.use(function (response) {
  // Do something with response data
  // HTTP CODE = 200, 服务器执行失败(请求正常)
  if (response.data.success === false) {
    return Promise.reject(new Error(response.data.message))
  }
  // 返回服务器发送的实际的json数据
  return response.data.data
}, function () {
  // 请求出错(HTTP CODE = 4xx, 5xx)
  return Promise.reject(new Error('服务器出错了'))
})

export default axiosInstance
