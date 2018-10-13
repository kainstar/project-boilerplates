import axios from 'axios';
import { SERVER_URL, UNKNOW_SERVER_ERROR, IS_DEV } from '../constants';

const ajax = axios.create({
  baseURL: SERVER_URL
});

const ajaxErrorLog = (error) => {
  if (IS_DEV) {
    // 开发模式显示服务器错误信息
    console.group(error.config.url);
    console.log('[REASON]:', error.message);
    console.log('[CONFIG]:', error.response.config);
    console.log('[REQUEST]:', error.response.request);
    console.log('[RESPONSE]:', error.response);
    console.groupEnd();
  }
};

// 相应拦截器
ajax.interceptors.response.use(
  function(response) {
    // HTTP CODE = 200, 服务器执行失败(请求正常)
    if (response.data.success === false) {
      const error = new Error(response.data.message);
      error.response = response;
      ajaxErrorLog(error);

      return Promise.reject(error);
    }

    // 请求处理成功, 返回服务器发送的实际的json数据
    return response.data.data;
  },
  // 请求出错 (HTTP CODE = 4xx, 5xx)
  function(error) {
    ajaxErrorLog(error);
    return Promise.reject(IS_DEV ? error : new Error(UNKNOW_SERVER_ERROR));
  }
);

export default ajax;
