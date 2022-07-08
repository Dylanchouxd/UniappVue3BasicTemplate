/**
 * 获取Env变量
 * @param key 要获取的key
 * @returns
 */
export const getEnvValue = <T = any>(key: string): T => {
  return import.meta.env[key];
};

/**
 * 是生产模式
 */
export const isProduction = getEnvValue('PROD');

/**
 * 是开发模式
 */
export const isDevelopment = getEnvValue('DEV');
