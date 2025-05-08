import type { RouteRecordRaw } from 'vue-router'
import { useNProgress } from '@/lib/nprogress'
import { createRouter, createWebHistory } from 'vue-router'

const MainLayout = () => import('@/components/layouts/main-layout/MainLayout.vue')

const routes: RouteRecordRaw[] = [

  {
    path: '/',
    redirect: { name: 'locations' },
    component: MainLayout,
    meta: { requiresAuth: true },
    children: [
      {
        path: 'locations',
        name: 'locations',
        component: () => import('@/views/Locations.vue'),
        meta: {
          title: 'Locations',
          breadcrumbs: [
            { name: 'Locations' },
          ],
        },
      },
      {
        path: 'robots',
        children: [
          {
            path: '',
            name: 'robots',
            component: () => import('@/views/Robots.vue'),
            meta: {
              title: 'Robots',
              breadcrumbs: [
                { name: 'Robots' },
              ],
            },
          },
          //     {
          //       path: ':id',
          //       name: 'robot-details',
          //       component: () => {},
          //       meta: {
          //         title: 'Robot Details',
          //         breadcrumbs: [
          //           { name: 'Robots', to: '/robots' },
          //           { name: 'Robot Details' },
          //         ],
          //       },
          //     },
        ],
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('@/views/NotFound.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

const nprogress = useNProgress()

router.beforeEach((to, _, next) => {
  nprogress.start()
  const title = to.meta.title ? `${to.meta.title} | DeliverOps` : 'DeliverOps'
  document.title = title

  next()
})

router.afterEach(() => {
  nprogress.done()
})

export default router
