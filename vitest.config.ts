import { fileURLToPath } from 'node:url'
import { mergeConfig } from 'vite'
import { configDefaults, defineConfig } from 'vitest/config'
import viteConfig from './vite.config'

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: 'jsdom',
      exclude: [...configDefaults.exclude, 'e2e/*'],
      root: fileURLToPath(new URL('./', import.meta.url)),
      globalSetup: './src/test-globals.ts',
      setupFiles: 'vitest.setup.ts',
      transformMode: {
        web: [/\.[jt]sx$/]
      },
      deps: {
        inline: ['element-plus']
      }
    },
    build: {
      rollupOptions: {
        external: ['sortablejs']
      }
    }
  })
)
