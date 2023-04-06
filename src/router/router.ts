import { createRouter, createWebHistory } from "vue-router"
import type { RouteRecordRaw } from "vue-router"
import Login from "@/components/Login.vue"
import Patron from "@/components/Patron/Book-search.vue"
import Staff from "@/components/Staff/Staff.vue"
import PatronInfo from "@/components/Staff/PatronOp.vue"
import AddBook from "@/components/Staff/AddBook.vue"
import DeleteBook from "@/components/Staff/DeleteBook.vue"
import UpdateBook from "@/components/Staff/UpdateBook.vue"

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: Login,
  },
  {
    path: '/Patron',
    component: Patron
  },
  {
    path: '/Staff',
    component: Staff,
    children: [
      {
        path: '/Staff/PatronInfo',
        component: PatronInfo,
      },
      {
        path: '/Staff/AddBook',
        component: AddBook,
      },
      {
        path: '/Staff/DeleteBook',
        component: DeleteBook,
      },
      {
        path: '/Staff/UpdateBook',
        component: UpdateBook,
      },
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router;