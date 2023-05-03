import { createRouter, createWebHistory } from 'vue-router'
import Clickable from '../views/Clickable.vue'
import HomeView from '../views/HomeView.vue'
import Meteorites from '../views/Meteorites.vue'
import Vectors from '../views/Vectors.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/clickable',
      name: 'clickable',
      component: Clickable,
      meta: { title: 'Clickable' },
      title: 'Clickable',
    },
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { title: 'OpenLayers' },
      title: 'OpenLayers',
    },
    {
      path: '/meteorites',
      name: 'meteorites',
      component: Meteorites,
      meta: { title: 'Meteorites' },
      title: 'Meteorites',
    },
    {
      path: '/vectors',
      name: 'vectors',
      component: Vectors,
      meta: { title: 'Vectors' },
      title: 'Vectors',
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
  ],
})

export default router
