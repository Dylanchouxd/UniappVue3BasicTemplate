import Request, { HttpResponse } from 'luch-request';
import { baseURL } from '@/config/requestConfig';
import { useAuthStore } from '@/state/modules/auth';
import { Toast } from '../util';
import { pageMustLogin } from '../common';

function createRequest() {
  return new Request({
    baseURL,
  });
}

const request = createRequest();

/**
 * 请求拦截器
 */
request.interceptors.request.use(
  (options) => {
    if (options.custom?.auth !== false) {
      const authStore = useAuthStore();
      // token不存在跳转到登录页
      if (!pageMustLogin()) {
        return Promise.reject(options);
      }

      options.header = {
        ...options.header,
        ...{
          authorization: `Bearer ${authStore.getToken}`,
        },
      };
    }

    return options;
  },
  (options) => {
    return Promise.reject(options);
  },
);

/**
 * 响应拦截器
 */
request.interceptors.response.use(
  (response: HttpResponse<API<any>>) => {
    const { data: resData } = response;
    const { code, message, data } = resData;
    if (code === 0) {
      return resData as any;
    }

    Toast(message);
    return Promise.reject(resData);
  },
  (response) => {
    // 请求错误做点什么。可以使用async await 做异步操作
    Toast(response.errMsg);
    return Promise.reject(response);
  },
);

export { request };
