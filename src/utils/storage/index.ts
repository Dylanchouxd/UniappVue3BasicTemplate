import createStorage from './createStorage';
import { storageSetting } from '@/config/storageConfig';

const storage = createStorage(storageSetting);

/**
 * setCache 设置缓存
 * @param key 要设的Key
 * @param value 要设的Value内容
 * @param expiredTime 过期时间
 */
export const setCache = (key: string, value: any, expiredTime?: number | null) => {
  storage.set(key, value, expiredTime);
};

/**
 * getCache 查询缓存
 * @param key 要查询的Key
 */
export const getCache = <T = any>(key: string): T => {
  return storage.get(key);
};

/**
 * removeCache 删除某个缓存
 * @param key 要删除的Key
 */
export const removeCache = (key: string) => {
  return storage.remove(key);
};

/**
 * clearCache 删除所有缓存
 */
export const clearCache = () => {
  return storage.clear();
};
