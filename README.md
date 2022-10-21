# 创建一个vue3+ts包

## 需要下载三个npm
```javascript
  "@vitejs/plugin-vue": "^1.9.4",
  "vite-plugin-dts": "^1.4.1",
  "unplugin-vue-define-options": "^0.10.0",
```
  修改自己的vite.config.ts

# 使用方案
## 使用npm安装
```javascript
    npm i vue3-org -s
```
## 使用pnpm安装
```javascript
    pnpm i vue3-org -s
```
## 引入
在 main.js 中写入以下内容：
```javascript
    import vue3Org from 'vue3-org';
    import 'vue3-org/lib/style.css';
```
## 按需引入
```javascript
    import { vueOrg } from 'vue3-org'
    import 'vue3-org/lib/style.css';
```
## 按需引入类型
```javascript
    import type { Data } from 'vue3-org/lib/types'
```