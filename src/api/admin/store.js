/**
 * 管理员
 * 门店管理 API LIST
 */

import ajax from '../../utils/ajax'
import {
  baseParams,
  serializeGetUrl
} from '../../utils/base'

export function managerStore(data = baseParams) {
  let api = '/store/managerStore';
  let url = serializeGetUrl(api, data)
  return ajax({
    method: 'get',
    url
  });
}

export function getAllwarehouse() {
  return ajax({
    method: 'get',
    url: '/warehouse/getAllwarehouse'
  })
}

export function listStorePros(data = baseParams) {
  let api = '/store/listStorePros';
  let url = serializeGetUrl(api, data)
  return ajax({
    method: 'get',
    url
  })
}
