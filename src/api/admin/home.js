/**
 * 管理员
 * 控制台 API LIST
 */

import ajax from '../../utils/ajax'
import {
  baseParams,
  serializeGetUrl
} from '../../utils/base'

export function systemIndex(data = baseParams) {
  return ajax({
    method: 'post',
    url: `/system/index`,
    data
  });
}

export function getAllStoreOrder(data = baseParams) {
  return ajax({
    method: 'post',
    url: '/store/getAllStoreOrder',
    data
  });
}

export function getAllWarehouseOrder(data = baseParams) {
  return ajax({
    method: 'post',
    url: '/warehouse/getAllWarehouseOrder',
    data
  });
}