import { createRouter, createWebHistory } from 'vue-router'
const routes = [
  {
    path: '/',
    name: '/',
    redirect: '/home',
    component: () => import('../components/layout/index.vue'),
    children: [
      {
        path: '/home',
        name: 'Home',
        component: () => import('../views/Home.vue')
      },
      {
        path: '/shopping',
        name: 'Shopping',
        component: () => import('../views/Shopping.vue')
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/home'
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})
export { routes }
export default router
