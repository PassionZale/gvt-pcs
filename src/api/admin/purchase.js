/**
 * 管理员
 * 采购管理 API LIST
 */

import ajax from '../../utils/ajax'
import {
  baseParams
} from '../../utils/base'
import qs from 'qs'

export function getAllStore(data = {}) {
  return ajax({
    method: 'post',
    url: '/store/getAllStore',
    data
  })
}

export function getAllwarehouse(data = {}) {
  return ajax({
    method: 'post',
    url: '/store/getAllwarehouse',
    data
  })
}

export function managerPurchase(data = baseParams) {
  return ajax({
    method: 'post',
    url: '/purchase/managerPurchase',
    data
  })
}

export function manageListPurchasePros(data = baseParams) {
  return ajax({
    method: 'post',
    url: '/purchase/manageListPurchasePros',
    data
  })
}

export function getPurchaseStoreWarhouseInfo(data = {}) {
  return ajax({
    method: 'post',
    url: '/purchase/getPurchaseStoreWarhouseInfo',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: qs.stringify(data)
  })
}
