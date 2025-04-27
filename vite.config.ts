import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import vueI18n from '@intlify/vite-plugin-vue-i18n'
import tailwindcss from '@tailwindcss/vite'
import svgBuilder from './plugins/svgBuilder'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    tailwindcss(),
    // vueI18n({
    //   runtimeOnly: false,
    //   include: path.resolve(__dirname, './src/locales/**')
    // }),
    AutoImport({
      resolvers: [ElementPlusResolver()],
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/,
        /\.vue\?vue/ // .vue
      ],
      dts: true,
      eslintrc: {
        enabled: true
      },
      imports: [
        'vue',
        'vue-router',
        {
          from: 'vue-router',
          imports: ['RouteLocationRaw'],
          type: true
        },
        {
          'vue-request': ['useRequest'],
          'vue-i18n': ['useI18n']
        }
      ]
    }),
    Components({
      dirs: ['src/components'],
      resolvers: [ElementPlusResolver()]
    }),
    svgBuilder('./src/assets/icon/')
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '~/': `${path.resolve(__dirname, './')}/`
    }
  },
  build: {
    assetsDir: 'static/img/',
    rollupOptions: {
      output: {
        chunkFileNames: 'static/js/[name]-[hash].js',
        entryFileNames: 'static/js/[name]-[hash].js',
        assetFileNames: 'static/[ext]/[name]-[hash].[ext]'
      }
    },
    chunkSizeWarningLimit: 5000
  },
  server: {
    // proxy: {
    //   '/api': {
    //     target: 'https://teligi.fiami.com.tw',
    //     changeOrigin: true
    //     // rewrite: path => path.replace(/^\/api/, '')
    //   }
    // },
    host: '0.0.0.0', // 显示IP位置
    port: 3006
  }
})
