/**
 * 管理员
 * 采购管理 API LIST
 */

import ajax from '../../utils/ajax'
import {
  baseParams,
  serializeGetUrl
} from '../../utils/base'

export function getAllStore() {
  return ajax({
    method: 'get',
    url: '/store/getAllStore'
  })
}

export function getAllwarehouse() {
  return ajax({
    method: 'get',
    url: '/store/getAllwarehouse'
  })
}

export function managerPurchase(data = baseParams) {
  let api = '/purchase/managerPurchase';
  let url = serializeGetUrl(api, data)
  return ajax({
    method: 'get',
    url
  })
}

export function manageListPurchasePros(data = baseParams) {
  let api = '/purchase/manageListPurchasePros';
  let url = serializeGetUrl(api, data)
  return ajax({
    method: 'get',
    url
  })
}

export function getPurchaseStoreWarhouseInfo(){
  
}