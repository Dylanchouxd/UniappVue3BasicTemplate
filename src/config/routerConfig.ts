export const mustLoginPage: string[] = ['/pages/user/index'];

// 用于 src/utils/router/navigates.ts 跳转方法支持自动识别如果是Tab页面则使用pushTab
export const tabpageList: string[] = [
  '/pages/index/index',
  '/pages/list/index',
  '/pages/user/index',
];
export const pageList = {
  index: '/pages/index/index',
  list: '/pages/list/index',
  user: '/pages/user/index',
  login: '/pages/login/index',
  notFound: '/pages/exception/404',
};
