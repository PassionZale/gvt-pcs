/**
 * AUTH
 * 表单验证规则
 */


// 登录表单验证器
export const LOGIN_FORM_VALIDATION = {
  // 用户名
  'username': [{
    trigger: 'blur',
    required: true,
    message: '用户名不能为空'
  }],
  // 密码
  'password': [{
    trigger: 'blur',
    required: true,
    message: '密码不能为空'
  }],
  // 验证码
  'code': [{
    trigger: 'blur',
    required: true,
    message: '验证码不能为空'
  }]
}
