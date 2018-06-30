/**
 * 管理员
 * 表单验证规则
 */

// 默认输入框最长字符限制为50
const DEFAULT_INPUT_MAX = 50;
// 默认输入框超出最大字符限制后错误提示
const DEFAULT_INPUT_MAX_ERROR = '限制输入50个字符';

// 门店管理 => 门店列表 => 搜索门店表单验证器
// storeName: 门店名称
// storeNo: 门店编号
export const SEARCH_STORE_FORM_VALIDATION = {
  storeName: [{
    trigger: 'blur',
    max: DEFAULT_INPUT_MAX,
    message: DEFAULT_INPUT_MAX_ERROR
  }],
  storeNo: [{
    trigger: 'blur',
    max: DEFAULT_INPUT_MAX,
    message: DEFAULT_INPUT_MAX_ERROR
  }],
}
