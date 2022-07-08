import { defineStore } from 'pinia';

interface UserState {
  userName: string;
}

export const useUserStore = defineStore({
  id: 'user',
  state: (): UserState => ({
    userName: '',
  }),
  getters: {},
  actions: {},
});
