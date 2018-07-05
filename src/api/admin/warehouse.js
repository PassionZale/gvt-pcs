/**
 * 管理员
 * 仓库管理 API LIST
 */

import ajax from '../../utils/ajax'
import {
  baseParams
} from '../../utils/base'

export function managerWarehouse(data = baseParams) {
  return ajax({
    method: 'post',
    url: '/warehouse/managerWarehouse',
    data
  });
}

export function managerListWarehousePros(data = baseParams) {
  return ajax({
    method: 'post',
    url: '/warehouse/managerListWarehousePros',
    data
  });
}
export function editWarehouseProduct(data = {}) {
  return ajax({
    method: 'post',
    url: '/commodity/editWarehouseProduct',
    data
  });
}
