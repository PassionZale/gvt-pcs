/**
 * AUTH 
 * API LIST
 */

import ajax from '../../utils/ajax'
import qs from 'qs'

export function login(data) {
  return ajax({
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    method: 'post',
    url: '/login',
    data: qs.stringify(data),
  });
}

export function fetchVerificationCode() {
  return ajax({
    method: 'get',
    responseType: 'blob',
    url: `/vc?${Math.random()}`
  })
}
