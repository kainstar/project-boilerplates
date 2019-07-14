import axios, { AxiosResponse } from 'axios';
import { IS_DEV } from '../constants';

const ajax = axios.create();

const ajaxErrorLog = (error: Error, response: AxiosResponse) => {
  if (IS_DEV) {
    // 开发模式显示服务器错误信息
    console.group(response.config.url);
    console.log('[REASON]:', error.message);
    console.log('[REQUEST]:', response.request);
    console.log('[RESPONSE]:', response);
    console.groupEnd();
  }
};

// 相应拦截器
ajax.interceptors.response.use(response => {
  // HTTP CODE = 200, 服务器执行失败(请求正常)
  if (response.data.success === false) {
    const error = new Error(response.data.message);
    ajaxErrorLog(error, response);

    return Promise.reject(error);
  }

  // 请求处理成功, 返回服务器发送的实际的json数据
  return response.data.data;
});

export default ajax;
