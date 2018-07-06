/**
 * 管理员
 * 系统管理 API LIST
 */

import ajax from '../../utils/ajax'
import {
  baseParams,
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

export function getGoodsDetail(data = {}) {
  return ajax({
    method: 'post',
    url: '/notices/getGoodsDetail',
    data
  })
}

export function selectAdminListOfOrders(data = baseParams) {
  return ajax({
    method: 'post',
    url: '/system/selectAdminListOfOrders',
    data
  });
}

export function updateConfrimOrder(data = {}) {
  return ajax({
    method: 'post',
    url: '/system/updateConfrimOrder',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: qs.stringify(data)
  })
}

export function managerSystemUserLogs(data = baseParams) {
  return ajax({
    method: 'post',
    url: '/system/managerSystemUserLogs',
    data
  })
}


/**
 * 接口解析模板 新增
 */
export function addParseModelInfo(data = {}) {
  console.log(data)
  return ajax({
    method: 'post',
    url: "/addParseModelInfo",
    data
  })
}
