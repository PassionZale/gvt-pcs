/**
 * 管理员
 * 表单验证规则
 */

// 默认输入框超出最大字符限制后错误提示
const default_max_rule = {
  trigger: 'blur',
  max: 50,
  message: '最多输入50个字符'
}
// 默认输入框空值错误提示
const default_require_rule = {
  trigger: 'blur',
  required: true,
  message: '不能为空'
}


// 门店管理 => 门店列表 => 搜索门店表单验证器
// storeName: 门店名称
// storeNo: 门店编号
export const SEARCH_STORE_FORM_VALIDATION = {
  'storeName': [default_max_rule],
  'storeNo': [default_max_rule],
}

// 门店管理 => 门店创建表单验证器
export const CREATE_STORE_FORM_VALIDATION = {
  // 用户名
  'userName': [default_max_rule, default_require_rule],
  // 密码
  'passWord': [default_max_rule, default_require_rule],
  // 门店名称
  'storeName': [default_max_rule, default_require_rule],
  // 门店编码
  'editStoreNo': [default_max_rule, default_require_rule],
  // 联系人
  'contactMan': [default_max_rule, default_require_rule],
  // 手机号码
  'phoneNum': [default_max_rule, default_require_rule],
  // 电子邮箱
  'editEmail': [default_max_rule, default_require_rule],
  // URL
  'url': [default_max_rule, default_require_rule],
  // ApiKey
  'apiKey': [default_max_rule, default_require_rule],
  // ApiSecret
  'apiSecret': [default_max_rule, default_require_rule],
}

// 门店管理 => 门店列表 => 门店商品列表 => 搜索表单验证器
export const SEARCH_STORE_PROS_FORM_VALIDATION = {
  // 商品品牌
  'proBand': [default_max_rule],
  // 商品类别
  'proCategoryName': [default_max_rule],
  // 商品名称
  'proName': [default_max_rule],
  // 商品条码
  'proBarcode': [default_max_rule]
}
