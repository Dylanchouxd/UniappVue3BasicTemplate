import { ConfigEnv, UserConfig } from 'vite';
import uni from '@dcloudio/vite-plugin-uni';
import eslintPlugin from 'vite-plugin-eslint';
import { resolve } from 'path';
import { loadEnv } from 'vite';

// https://vitejs.dev/config/
export default ({ mode }: ConfigEnv): UserConfig => {
  const root = process.cwd();
  const env = loadEnv(mode, root);
  return {
    base: './',
    resolve: {
      alias: {
        '@': resolve('./src'),
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/style/index.scss";',
        },
      },
    },
    build: {
      minify: 'terser',
      terserOptions: {
        compress: {
          // 发布时删除 console
          drop_console: true,
        },
      },
    },
    server: {
      port: 3600,
      host: true,
      // proxy: {
      //   '/api': {
      //     target: env.VITE_PROXY_BASE_URL,
      //     changeOrigin: true,
      //     rewrite: (path) => path.replace(/^\/api/, ''),
      //   },
      // },
    },
    plugins: [
      uni(),
      eslintPlugin({
        include: ['src/**/*.ts', 'src/**/*.vue', 'src/*.ts', 'src/*.vue'],
      }),
    ],
  };
};
