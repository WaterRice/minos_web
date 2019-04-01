import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/home/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/404',
      name: '404',
      component: () => import('./views/404.vue')
    },
    {
      path: '/500',
      name: '500',
      component: () => import('./views/500.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/Login.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('./views/Register.vue')
    },
    {
      path: '/home',
      redirect: '/'
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/FAQ',
      name: 'FAQ',
      component: () => import('./views/FAQ.vue')
    },
    {
      path: '/community',
      name: 'community',
      component: () => import('./views/community/main.vue')
    },
    {
      path: '/homework',
      name: 'homework',
      component: () => import('./views/homework/main.vue'),
    },
    {
      path: '/homework/:id',
      name: 'homeworkDetail',
      component: () => import('./views/homework/HomeworkDetail.vue'),
      props: true
    },
    {
      path: '/repository',
      name: 'repository',
      component: () => import('./views/repository/main.vue')
    },
    {
      path: '/problem/:id',
      name: 'problemDetail',
      component: () => import('./views/repository/problemDetail.vue'),
      props: true
    },
    {
      path: '/competition',
      name: 'competition',
      component: () => import('./views/competition/main.vue')
    },
    {
      path: '/teacher',
      component: () => import('./views/teacher/main.vue'),
      children: [
        {
          path: '/',
          name: 'teacher',
          component: () => import('./views/teacher/index.vue')
        },
        {
          path: 'publish',
          name: 'publish',
          component: () => import('./views/teacher/publish.vue')
        }
      ]
    },
    {
      path: '/*',
      redirect: '404'
    }
  ]
})
