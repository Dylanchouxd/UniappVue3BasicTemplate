import { nextTick } from 'vue';
import { isObject } from '@/utils/is';

/**
 * 深度合并
 * @param src
 * @param target
 */
export function deepMerge<T = any>(src: any = {}, target: any = {}): T {
  let key: string;
  for (key in target) {
    src[key] = isObject(src[key]) ? deepMerge(src[key], target[key]) : (src[key] = target[key]);
  }
  return src;
}

export const Toast = (title: string, duration = 2000) => {
  if (!title) {
    return;
  }

  nextTick(() => {
    uni.showToast({
      title,
      icon: 'none',
      duration,
    });
  });
};

export const showLoading = (title = '加载中', mask = true) => {
  nextTick(() => {
    uni.showLoading({
      title,
      mask,
    });
  });
};

export const hideLoading = () => {
  nextTick(() => {
    uni.hideLoading();
  });
};
