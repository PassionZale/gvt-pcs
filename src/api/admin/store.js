/**
 * 管理员
 * 门店管理 API LIST
 */

import ajax from '../../utils/ajax'
import {
  baseParams,
} from '../../utils/base'

export function managerStore(data = baseParams) {
  return ajax({
    method: 'post',
    url: '/store/managerStore',
    data
  });
}

export function getAllwarehouse(data = {}) {
  return ajax({
    method: 'post',
    url: '/warehouse/getAllwarehouse',
    data
  })
}

export function listStorePros(data = baseParams) {
  return ajax({
    method: 'post',
    url: '/store/listStorePros',
    data
  })
}


export function managerStoreInfo(data) {
  return ajax({
    method: 'post',
    url: '/store/managerStoreInfo',
    data
  });
}

export function editStoreProduct(data = {}) {
  return ajax({
    method: 'post',
    url: '/commodity/editStoreProduct',
    data
  });
}
