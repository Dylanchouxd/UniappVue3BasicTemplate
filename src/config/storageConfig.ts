import { EncryptionParams } from '@/utils/crypto';
import { getEnvValue } from '@/utils/env';
import { StorageOptions } from '@/utils/storage/createStorage';

export const storageSetting: Partial<StorageOptions> = {
  defaultExpiredTime: null, // 缓存默认过期时间
  prefixKey: getEnvValue<string>('VITE_APP_TITLE') + '__', // 默认Key前缀
};

// 是否开启AES加密
export const isOpenAesEncryption = true;
// aes encryption key
export const storageEncryption: EncryptionParams = {
  key: getEnvValue('VITE_ENCRYPTION_KEY') || 'vD3moN5Z#c6cNT9N',
  iv: getEnvValue('VITE_ENCRYPTION_IV') || 'BEFtgv3Luv6fFG^U',
};

export default storageSetting;
