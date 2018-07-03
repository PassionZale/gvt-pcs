/**
 * 管理员
 * 采购管理 API LIST
 */

import ajax from '../../utils/ajax'
import {
  baseParams,
  serializeGetUrl
} from '../../utils/base'

export function managerOrder(data = baseParams) {
  let api = '/order/managerOrder'
  let url = serializeGetUrl(api, data)
  return ajax({
    method: 'get',
    url
  })
}

export function managerListOrderPros(data = baseParams) {
  let api = '/order/managerListOrderPros'
  let url = serializeGetUrl(api, data)
  return ajax({
    method: 'get',
    url
  })

}
