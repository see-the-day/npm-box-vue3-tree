
import { App } from 'vue'

import org from './org.vue'

org.install = (app:App) => {
  app.component('Org', org)
}

export default org
