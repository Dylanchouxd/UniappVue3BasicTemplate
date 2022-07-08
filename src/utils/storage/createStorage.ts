import { isOpenAesEncryption, storageEncryption } from '@/config/storageConfig';
import { isNullOrUnDef } from '@/utils/is';
import { AesEncryption } from '@/utils/crypto';
import { isProduction } from '../env';

const aesEncryption = new AesEncryption(storageEncryption);

export interface StorageOptions {
  defaultExpiredTime: number | null; // 默认过期时间
  prefixKey: string;
}

export const createStorage = (userOptions?: Partial<StorageOptions>) => {
  const options = {
    ...{
      defaultExpiredTime: null,
      prefixKey: 'PREFIX_',
    },
    ...userOptions,
  };

  const getKey = (key: string) => {
    return options.prefixKey + key;
  };

  const set = (key: string, value: any, expiredTime?: number | null) => {
    const expire = expiredTime || options.defaultExpiredTime;
    const time = !isNullOrUnDef(expire) ? new Date().getTime() + expire : null;

    let data = JSON.stringify({
      value,
      expiredTime: time,
    });

    data = isOpenAesEncryption && isProduction ? aesEncryption.encryptByAES(data) : data;

    uni.setStorageSync(getKey(key), data);
  };

  const get = <T = any>(key: string, def: any = null): T => {
    const getValue = uni.getStorageSync(getKey(key));
    if (!getValue) return def;

    try {
      const data =
        isOpenAesEncryption && isProduction
          ? JSON.parse(aesEncryption.decryptByAES(getValue))
          : JSON.parse(getValue);

      const { value, expiredTime } = data;

      // 如果有过期时间，并且是过期，则直接返回null并删除
      if (!isNullOrUnDef(expiredTime) && expiredTime < new Date().getTime()) {
        remove(key);
        return def;
      }

      return value;
    } catch (error) {
      return def;
    }
  };

  const remove = (key: string) => {
    uni.removeStorageSync(getKey(key));
  };

  const clear = () => {
    uni.clearStorageSync();
  };

  return {
    set,
    get,
    remove,
    clear,
  };
};

export default createStorage;
