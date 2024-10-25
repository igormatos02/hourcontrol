import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import { getUser } from '../utils/auth'
const routes = [
  { path: '/', name: 'Home', component: Home, meta: { requiresAuth: true } },
  { path: '/login', name: 'Login', component: Login }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(async (to, from, next) => {
  const user = await getUser()
  if (to.matched.some(record => record.meta.requiresAuth) && !user) {
    next({ name: 'Login' })
  } else {
    next()
  }
})

export default router
