import Home from '../Pages/Home.vue'
import LeadsList from '@/Pages/LeadsList.vue'

import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: Home },
    { path: '/leads', component: LeadsList },
    { path: '/task/add', component: Home },
    { path: '/task/edit:id', component: Home },
  ],
})

export default router
