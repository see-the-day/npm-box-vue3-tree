## 引入
在 main.js 中写入以下内容：
```javascript
    import vue3Org from 'vue3-org';
    import 'vue3-org/lib/style.css';
```
## 按需引入
```javascript
    import { pdf } from 'pdf'
```

Props
|  名称   | 类型  | 默认值 | 说明 |
|  ----  | ----  | ----  | ---- |
| url  | string | ''  | 传入的pdfurl |
| type  | string | 'canvas' | 渲染格式 |
| scaleNum  | number | 1  | 缩放比例 |

Methods
|  名称   | 说明  |
|  ----  | ----  |
| pageTotal  | 当前pdf总页数 |
| pdf-down  | pdf渲染完成 |