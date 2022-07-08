import { LoginFirstMsg } from '@/config/errorMsgConfig';
import { pageList } from '@/config/routerConfig';
import { useAuthStore } from '@/state/modules/auth';
import router from './router';
import { Toast } from './util';

/**
 * 判断当前是否已登录，如未登录则拦截去登录
 * @param {string} redirectUrl 登录完后想要跳转的页面
 * @returns {boolean} 返回是否已经登录
 */
export function pageMustLogin(redirectUrl?: string): boolean {
  const authStore = useAuthStore();
  if (!authStore.isLogin) {
    const isLoginPage = pageList.login === getCurrentPages()[0].route; // 当前是否在登陆页面
    if (!isLoginPage) {
      Toast(LoginFirstMsg);

      const loginPage = redirectUrl
        ? `${pageList.login}?redirectUrl=${encodeURIComponent(redirectUrl)}`
        : pageList.login;

      router.push(loginPage);
    }
  }

  return authStore.isLogin;
}
