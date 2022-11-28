import type { App } from 'vue'
import vueOrg from './index/org.vue'
import PieThreeJs from './threejs/pie/index.vue'
const install = function (app: App):void {
  app.component('VueOrg', vueOrg)
  app.component('PieThreeJs', PieThreeJs)
}
export { vueOrg, PieThreeJs }
export default install
