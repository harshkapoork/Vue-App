import Home from '../Pages/Home.vue'
import LeadsList from '@/Pages/LeadsList.vue'
import Addlead from '@/Pages/AddLeads.vue'
import EditLead from '@/Pages/EditLeads.vue'

import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: Home },
    { path: '/leads', component: LeadsList },
    { path: '/leads/add', component: Addlead },
    { path: '/leads/edit:id', component: EditLead },
  ],
})

export default router
