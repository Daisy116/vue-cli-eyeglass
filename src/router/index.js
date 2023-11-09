import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import NotFoundComponent from '../views/NotFoundComponent.vue'

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
    // 門市查詢
    path: '/location',
    name: 'location',
    component: () => import('../views/LocationView.vue'),
  },
  {
    // 保健＆周邊
    path: '/:product/:id',
    name: 'product',
    component: () => import('../components/Product.vue'),
  },
  {
    path: '/product_detail/:pid',
    component: () => import('../components/Product_Detail.vue'),
  },
  {
    // 聯絡我們
    path: '/contact',
    name: 'contact',
    component: () => import('../views/ContactUsView.vue'),
  },
  {
    // 常見問題
    path: '/FAQ',
    name: 'qa',
    component: () => import('../views/FAQView.vue'),
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
