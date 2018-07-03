/**
 * 管理员
 * 门店管理 API LIST
 */

import ajax from '../../utils/ajax'
import {
  baseParams,
  serializeGetUrl
} from '../../utils/base'

export function managerWarehouse(data = baseParams) {
  let api = '/warehouse/managerWarehouse';
  let url = serializeGetUrl(api, data)
  return ajax({
    method: 'get',
    url
  });
}

export function managerListWarehousePros(data = baseParams) {
  let api = '/warehouse/managerListWarehousePros';
  let url = serializeGetUrl(api, data)
  return ajax({
    method: 'get',
    url
  });
}
