import { request } from '@/utils/request';

const LOGIN = '/login';
const LOGOUT = '/logout';

/**
 * 登录
 * @param params
 */
export function login(params: LoginParams) {
  return request.post<LoginModel>(LOGIN, params, {
    custom: { auth: false },
  });
}

/**
 * 登出
 */
export function logout() {
  return request.post(LOGOUT, {});
}
