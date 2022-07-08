import { NotFoundMsg } from '@/config/errorMsgConfig';
import { pageList, mustLoginPage } from '@/config/routerConfig';
import { Toast } from '../util';
import { pageMustLogin } from '../common';
import router from '.';

function addInterceptor(navigateType: string) {
  uni.addInterceptor(navigateType, {
    // 页面跳转前触发
    invoke(args) {
      // Start 路由前检测是否已经登录
      const isMustLogin = mustLoginPage.includes(args.url); // 当前页面是否必须登录
      if (isMustLogin && !pageMustLogin(args.url)) {
        return false;
      }
      // End 路由前检测是否已经登录
    },
    success() {},
    fail(err) {
      // 匹配不到页面统一跳转到404
      if (err.errMsg.indexOf('is not found') >= 0) {
        router.push(pageList.notFound);
        return;
      }

      Toast(NotFoundMsg);
    },
    complete() {},
  });
}

export default addInterceptor;
