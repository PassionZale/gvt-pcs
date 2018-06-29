import qs from 'qs'

// 根据 Nodejs 环境变量区分不同的 DOMAIN
export const baseURL = process.env.NODE_ENV === 'production' ?
  'http://production.gvt.com' :
  '/api';


// 常用 GET 请求参数
export const baseParams = {
  page: 1,
  rows: 10,
  sortOrder: 'desc'
}

/**
 * 序列化 GET 请求地址
 * 
 * @param {*} url API 地址
 * @param {*} data GET Request Params
 */
export function serializeGetUrl(url = '', data = {}) {
  let params = qs.stringify(data);
  if (params) {
    url += `?${qs.stringify(data)}`;
  }
  return url;
}
