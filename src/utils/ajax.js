import axios from 'axios'
import {
  baseURL
} from './base'
import {
  Message
} from 'iview'

const ajax = axios.create({
  baseURL: baseURL,
  timeout: 5000
});

ajax.interceptors.request.use(config => {
  return config;
}, error => {
  Promise.reject(error);
});

ajax.interceptors.response.use(response => {
  return response.data;
}, error => {
  if (error.response.status >= 400) {
    // TODO 跳转登录
    // Message.error('出现异常');
  }
  return Promise.reject(error);
});

export default ajax;
