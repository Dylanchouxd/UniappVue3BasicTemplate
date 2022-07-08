<template>
  <view class="login-wrapper">
    <button @click="userLogin">登录</button>
    {{ title }}
  </view>
</template>

<script lang="ts" setup>
  import { pageList } from '@/config/routerConfig';
  import { useAuthStore } from '@/state/modules/auth';
  import router from '@/utils/router';
  import { hideLoading, showLoading, Toast } from '@/utils/util';
  import { onLoad } from '@dcloudio/uni-app';
  import { reactive, ref } from 'vue';

  const redirectUrl = ref('');
  const title = ref('login');
  const form = reactive({
    phone: '123',
    password: '456',
  });

  onLoad((options) => {
    if (options.redirectUrl) redirectUrl.value = options.redirectUrl;
  });

  function pageRedirect() {
    // 如果有redirectUrl则优先跳转到这些
    if (redirectUrl.value) {
      router.replaceAll(redirectUrl.value);
      return;
    }
    // 如果历史栈非本页面的话则返回上一层
    // eslint-disable-next-line no-undef
    const isBack = pageList.login !== `/${getCurrentPages()[0].route}`;
    isBack ? router.back() : router.pushTab(pageList.index);
  }
  function userLogin() {
    const authStore = useAuthStore();

    showLoading();
    authStore
      .login(form)
      .then(() => {
        Toast('登录成功');

        pageRedirect();
      })
      .finally(() => {
        hideLoading();
      });
  }
</script>

<style lang="scss" scoped>
  .login-wrapper {
    padding: 20rpx;
  }
</style>
