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
  let api = '/store/getAllStoreOrder';
  let url = serializeGetUrl(api, data)
  return ajax({
    method: 'get',
    url
  });
}

export function getAllWarehouseOrder(data = baseParams) {
  let api = '/warehouse/getAllWarehouseOrder';
  let url = serializeGetUrl(api, data)
  return ajax({
    method: 'get',
    url
  });
}