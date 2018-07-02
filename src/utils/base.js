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
 * @param {String} url API 地址
 * @param {Object} data GET Request Params
 */
export function serializeGetUrl(url = '', data = {}) {
  let params = qs.stringify(data);
  if (params) {
    url += `?${qs.stringify(data)}`;
  }
  return url;
}

/**
 * 
 * @param {*} number 字符金额
 */
export function parseAmount(number) {

  let amount = 0;

  try {
    amount = parseFloat(number).toLocaleString();
  } catch (error) {
    console.error(error)
  }
  return amount;
}
