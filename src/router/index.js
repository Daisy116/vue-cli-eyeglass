import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import NotFoundComponent from '../views/NotFoundComponent.vue'
import Course from '../views/Course/index.vue'

import Guide from '../views/About/Guide.vue'
import Changelog from '../views/About/Changelog.vue'
import Github from '../views/About/Github.vue'
import Reference from '../views/About/Reference.vue'
import AboutHome from '../views/About/index.vue'



const routes = [
  {
    // 首頁
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    // 關於我們
    path: '/about',
    name: 'aboutUs',
    component: () => import('../views/AboutUsView.vue'),
  },
  {
    // 最新消息
    path: '/news',
    name: 'news',
    component: () => import('../views/NewsView.vue'),
  },
  {
    // 保健＆周邊
    path: '/product/:id',
    name: 'product',
    component: () => import('../components/Product.vue'),
  },
  {
    path: '/about1',
    name: 'about',
    component: () => import('../views/AboutView.vue'),
    children: [
      {
        path: "",
        component: AboutHome,
      },
      {
        path: "guide",
        component: Guide,
      },
      {
        path: "changelog",
        component: Changelog,
      },
      {
        path: "github",
        component: Github,
      },
      {
        path: "reference",
        component: Reference,
      },
    ]
  },
  {
    path: '/course',
    name: 'course',
    component: Course
  },
  {
    path: '/course/:id',
    name: 'course_id',
    component: () => import('../views/Course/_id.vue')
  },
  { path: '/:pathMatch(.*)', component: NotFoundComponent }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})
router.afterEach((to, from, next) => {
	window.scrollTo(0, 0);
});

export default router
