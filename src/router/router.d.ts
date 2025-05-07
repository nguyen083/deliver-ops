import 'vue-router'

interface Breadcrumb {
  name: string
  to?: string
}

declare module 'vue-router' {
  interface RouteMeta {
    title?: string
    requiresAuth?: boolean
    breadcrumbs?: Breadcrumb[]
  }
}
