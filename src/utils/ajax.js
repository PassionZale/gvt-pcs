import axios from 'axios'
import {
  baseURL
} from './base'
import {
  Notice
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
  Notice.error({
    title: `${error.response.status} ERROR`,
    desc: error.response.data,
    duration: 0
  });
  // if (error.response.status >= 400) {
  // TODO 跳转登录
  // }
  return Promise.reject(error);
});

export default ajax;
