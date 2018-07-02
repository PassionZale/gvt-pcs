/**
 * 管理员
 * 系统管理 API LIST
 */

import ajax from '../../utils/ajax'
import {
  baseParams,
  serializeGetUrl
} from '../../utils/base'
import qs from 'qs'

export function storeNotices(data = baseParams) {
  return ajax({
    method: 'post',
    url: '/system/storeNotices',
    data
  });
}

export function goodsNotices(data = baseParams) {
  return ajax({
    method: 'post',
    url: '/system/goodsNotices',
    data
  })
}

export function getGoodsDetail(data) {
  return ajax({
    method: 'post',
    url: '/notices/getGoodsDetail',
    data
  })
}

export function selectAdminListOfOrders(data = baseParams) {
  let api = '/system/selectAdminListOfOrders';
  let url = serializeGetUrl(api, data)
  return ajax({
    method: 'get',
    url
  });
}

export function updateConfrimOrder(data) {
  return ajax({
    method: 'post',
    url: '/system/updateConfrimOrder',
    // 嗯哼, 有的接口参数是 JSON, 有的又要 key=value 字符串, 就问你怕不怕?
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: qs.stringify(data)
  })
}

export function managerSystemUserLogs(data = baseParams) {
  let api = '/system/managerSystemUserLogs';
  let url = serializeGetUrl(api, data)
  return ajax({
    method: 'get',
    url
  })
}
