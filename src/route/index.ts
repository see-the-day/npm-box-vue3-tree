import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
const routes: RouteRecordRaw[] = [
  // { path: '/index', name: 'demo', component: () => import('@/view/demo/index.vue') },
  { path: '/threeJs', name: 'demo1', component: () => import('@/view/demo/three.vue') }
]
const router = createRouter({
  history: createWebHashHistory(),
  routes: routes
})

export default router
