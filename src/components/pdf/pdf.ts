
import { App } from 'vue'

import pdf from './index/pdf.vue'
pdf.install = (app:App) => {
  app.component('Pdf', pdf)
}

export default pdf
