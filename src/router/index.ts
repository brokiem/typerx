import { createRouter, createWebHistory } from "vue-router"
import TypeView from "@/views/TypeView.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: TypeView
    }
  ]
})

export default router
