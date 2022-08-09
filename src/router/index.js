import { createRouter, createWebHistory } from 'vue-router'

import WelcomeView from "@/components/Welcome.vue";
import TestView from "@/components/Test.vue";

const routes = [
  {
    path: '/',
    name: 'welcome',
    component: WelcomeView,
  },
  {
    path: '/test',
    name: 'Chat',
    component: TestView,
  },
]

const router = createRouter({
  mode: "history",
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
