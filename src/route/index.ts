import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
const routes: RouteRecordRaw[] = [
  { path: '/index', name: 'demo', component: () => import('@/view/demo/index.vue') }
]
const router = createRouter({
  history: createWebHashHistory(),
  routes: routes
})

export default router
