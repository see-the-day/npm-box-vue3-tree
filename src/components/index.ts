import type { App } from 'vue'
import vueOrg from './index/org.vue'

const install = function (app: App):void {
  app.component('VueOrg', vueOrg)
}
export { vueOrg }
export default install
