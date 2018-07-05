/**
 * 管理员
 * 订单管理 API LIST
 */

import ajax from '../../utils/ajax'
import {
  baseParams,
} from '../../utils/base'

export function managerOrder(data = baseParams) {
  return ajax({
    method: 'post',
    url: '/order/managerOrder',
    data
  })
}

export function managerListOrderPros(data = baseParams) {
  return ajax({
    method: 'post',
    url: '/order/managerListOrderPros',
    data
  })

}
