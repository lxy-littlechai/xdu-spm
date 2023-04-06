import { createRouter, createWebHistory } from "vue-router"
import type { RouteRecordRaw } from "vue-router"
import Login from "@/components/Login.vue"
import Patron from "@/components/Patron/Book-search.vue"
import Staff from "@/components/Staff/Staff.vue"

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: Login,
  }, {
    path: '/Patron',
    component: Patron
  }, {
    path: '/Staff',
    component: Staff
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router;