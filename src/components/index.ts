import type { App } from 'vue'
import vueTree from './index/org.vue'

const install = function (app:App):void {
  app.component('VueTree', vueTree)
}
export { vueTree }
export default { install }
