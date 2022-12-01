import type { App } from 'vue'
import vueOrg from './index/org.vue'
import PieThreeJs from './threejs/pie/index.vue'
import pdf from './pdf/index/pdf.jsx'
const install = function (app: App):void {
  app.component('VueOrg', vueOrg)
  app.component('PieThreeJs', PieThreeJs)
  app.component('Pdf', pdf)
}
export { vueOrg, PieThreeJs }
export default install
