import { mustLoginPage, tabpageList } from '@/config/routerConfig';
import { NAVIGATE_TYPE } from '@/enums/routerEnum';
import { cloneDeep } from 'lodash-es';
import { pageMustLogin } from '../common';
import { warn } from '../log';
import { deepMerge } from '../util';

export type NavigateOptions = Partial<Omit<UniApp.NavigateToOptions, 'url'>> & { delta?: number };

export class Navigates {
  private type: string;
  private readonly options: NavigateOptions;
  constructor(type?: string, options?: NavigateOptions) {
    this.type = type || NAVIGATE_TYPE.NAVIGATE_TO;
    this.options = options || {};
  }
  navigate(url: string, options?: NavigateOptions) {
    const navigateOptions = deepMerge(cloneDeep(this.options), options);
    const _options = deepMerge({ url }, navigateOptions);

    switch (this.type) {
      case NAVIGATE_TYPE.NAVIGATE_TO:
        uni.navigateTo(_options);
        break;
      case NAVIGATE_TYPE.REDIRECT_TO:
        uni.redirectTo(_options);
        break;
      case NAVIGATE_TYPE.RE_LAUNCH:
        uni.reLaunch(_options);
        break;
      case NAVIGATE_TYPE.SWITCH_TAB:
        uni.switchTab(_options);
        break;
      case NAVIGATE_TYPE.NAVIGATE_BACK:
        uni.navigateBack(navigateOptions);
        break;
      default:
        warn('navigate Error');
        break;
    }
  }
  autoPushTab(url: string, options?: NavigateOptions): boolean {
    const targetUrl = url.split('?')[0];
    if (tabpageList.includes(targetUrl)) {
      this.pushTab(url, options);
      return true;
    }
    return false;
  }
  push(url: string, options?: NavigateOptions) {
    if (this.autoPushTab(url, options)) return false;

    this.type = NAVIGATE_TYPE.NAVIGATE_TO;
    this.navigate(url, options);
  }
  replace(url: string, options?: NavigateOptions) {
    if (this.autoPushTab(url, options)) return false;

    this.type = NAVIGATE_TYPE.REDIRECT_TO;
    this.navigate(url, options);
  }
  replaceAll(url: string, options?: NavigateOptions) {
    if (this.autoPushTab(url, options)) return false;

    this.type = NAVIGATE_TYPE.REDIRECT_TO;
    this.navigate(url, options);
  }
  pushTab(url: string, options?: NavigateOptions) {
    /* #ifdef MP-WEIXIN */
    if (mustLoginPage.includes(url)) {
      const isLogin = pageMustLogin();
      return isLogin;
    }
    /* #endif */

    this.type = NAVIGATE_TYPE.SWITCH_TAB;
    this.navigate(url, options);
  }
  back(options?: NavigateOptions) {
    this.type = NAVIGATE_TYPE.NAVIGATE_BACK;
    this.navigate('', options);
  }
}
