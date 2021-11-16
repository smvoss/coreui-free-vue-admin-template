import { h, resolveComponent } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'

import DefaultLayout from '@/layouts/DefaultLayout'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: DefaultLayout,
    redirect: '/dashboard',
    children: [
      {
        path: '/dashboard',
        name: 'Dashboard',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackChunkName: "dashboard" */ '@/views/Dashboard.vue'),
      },
      {
        path: '/chart',
        name: 'Chart',
        component: () =>
          import('@/views/charts/MyChart.vue'),
      },
      {
        path: '/reports',
        name: 'Reports',
        component: () =>
          import('@/views/NewReport'),
        children: [
        ]
      },
      {
        // https://router.vuejs.org/guide/essentials/nested-routes.html
        path: '/reports/:reportid',
        component: () =>
          import('@/views/reports/ReportOverview')
      },
      {
        path: '/reports/:reportid/:fightname',
        redirect: '/reports/:reportid/:fightname/1'
      },
      {
        name: 'reportdetails',
        path: '/reports/:reportid/:fightname/:pullid',
        component: () =>
          import('@/views/reports/ReportDetails')
      },
      {
        path: '/theme',
        name: 'Theme',
        redirect: '/theme/typography',
      },
      {
        path: '/theme/colors',
        name: 'Colors',
        component: () => import('@/views/theme/Colors.vue'),
      },
    ]
  },
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
})

export default router
