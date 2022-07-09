<script setup lang="ts">
  import { onLaunch, onShow, onHide } from '@dcloudio/uni-app';
  import { pageMustLogin } from './utils/common';

  onLaunch(() => {
    // pageMustLogin();
    console.log('App Launch');
  });
  onShow(() => {
    console.log('App Show');
  });
  onHide(() => {
    console.log('App Hide');
  });
</script>

<style lang="scss">
  @import '@/style/index.scss';
</style>