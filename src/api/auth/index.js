/**
 * AUTH 
 * API LIST
 */

import ajax from '../../utils/ajax'
import qs from 'qs'

/**
 * 登录
 * @param {Object} data 
 * data = {
 *    username,
 *    password,
 *    code
 * }
 */
export function login(data = {}) {
  return ajax({
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    method: 'post',
    url: '/login',
    data: qs.stringify(data),
  });
}

/**
 * 获取登录时需要的验证码图片
 */
export function fetchVerificationCode() {
  return ajax({
    method: 'get',
    responseType: 'blob',
    url: `/vc?${Math.random()}`
  })
}
