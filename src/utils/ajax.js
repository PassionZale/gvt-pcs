import axios from 'axios'
import {
  baseURL
} from './base'
import router from '../routers/admin'

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
  // 临时通过判断 'login-page' 判断用户的登录状态
  if (error.response.request.responseURL.indexOf('login-page')) {
    router.push('/login')
    return;
  }
  return Promise.reject(error);
});

export default ajax;
