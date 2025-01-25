import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/:pathMatch(.*)*', // Шлях для обробки всіх невизначених маршрутів, включаючи "/"
    redirect: '/', // Перенаправлення на головну сторінку "/"
  },
  {
    path: '/', // Шлях для головної сторінки
    name: 'home', // Назва маршруту
    component: () => import('@/views/Home.vue'), // Динамічне завантаження компонента Home.vue
  },
]

// Створення екземпляра роутера
const router = createRouter({
  history: createWebHistory(),
  routes: routes
})

export default router
