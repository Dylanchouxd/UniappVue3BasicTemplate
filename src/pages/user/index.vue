<template>
  <view class="user-wrapper">
    <button v-if="isLogin" @click="userLogout">注销</button>
    {{ title }}
  </view>
</template>

<script lang="ts" setup>
  import { useAuthStore } from '@/state/modules/auth';
  import { pageMustLogin } from '@/utils/common';
  import { Toast } from '@/utils/util';
  import { onShow } from '@dcloudio/uni-app';
  import { computed, ref } from 'vue';

  onShow(() => {
    pageMustLogin();
  });

  const title = ref('user');
  const authStore = useAuthStore();
  const isLogin = computed(() => authStore.isLogin);

  function userLogout() {
    authStore.logout().then(() => {
      Toast('注销成功');
    });
  }
</script>

<style lang="scss" scoped>
  .user-wrapper {
    padding: 20rpx;
  }
</style>
