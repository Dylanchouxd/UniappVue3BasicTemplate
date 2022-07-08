import { defineStore } from 'pinia';
import { getCache, removeCache, setCache } from '@/utils/storage';
import { TOKEN_KEY } from '@/enums/cacheEnum';
import { login, logout } from '@/services/api/auth';

interface AuthState {
  token?: string;
}

export const useAuthStore = defineStore({
  id: 'auth',
  state: (): AuthState => ({
    token: getCache(TOKEN_KEY) || undefined,
  }),
  getters: {
    getToken: (state) => {
      return state.token;
    },
    isLogin: (state): boolean => {
      return !!state.token;
    },
  },
  actions: {
    setToken(token: string | undefined) {
      setCache(TOKEN_KEY, token);
      this.token = token;
    },
    /**
     * @description 登录
     */
    async login(params: LoginParams): Promise<LoginModel> {
      try {
        const { data } = await login(params);
        this.setToken(data.token);
        return Promise.resolve(data);
      } catch (err: any) {
        return Promise.reject(err);
      }
    },
    /**
     * @description 登出
     */
    async logout(): Promise<any> {
      try {
        const res = await logout();
        removeCache(TOKEN_KEY);
        this.setToken(undefined);
        return Promise.resolve(res);
      } catch (err: any) {
        return Promise.reject(err);
      }
    },
  },
});
