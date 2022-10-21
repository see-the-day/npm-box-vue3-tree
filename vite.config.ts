import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
import dts from 'vite-plugin-dts'
import DefineOptions from 'unplugin-vue-define-options/vite'

const rootDir = path.resolve(__dirname, './')
function resolve (...urlOrUrls) {
  return path.resolve(rootDir, ...urlOrUrls)
}
// 打包后的目录
const outDir = resolve('lib')

export default defineConfig({
  plugins: [
    vue(),
    DefineOptions(),
    dts({
      include: ['./src/components'],
      outputDir: path.resolve(outDir)
    })
  ],
  base: './',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  build: {
    outDir: 'lib',
    lib: {
      entry: resolve('src/components/index.ts'), // 指定组件编译入口文件
      name: 'index',
      fileName: 'index'
    }, // 库编译模式配置
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ['vue'],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: 'Vue'
        }
      }
    } // rollup打包配置
  }
})
