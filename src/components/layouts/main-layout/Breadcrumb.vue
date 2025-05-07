<script setup lang="ts">
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'

const route = useRoute()

const breadcrumbs = computed(() => {
  return (route.meta.breadcrumbs)?.map((bc, index, arr) => {
    const isLast = index === arr.length - 1
    return {
      name: bc.name,
      to: bc.to,
      isLast,
    }
  }) ?? []
})
</script>

<template>
  <Breadcrumb>
    <BreadcrumbList>
      <BreadcrumbItem>
        <BreadcrumbLink>
          <RouterLink to="/">
            Home
          </RouterLink>
        </BreadcrumbLink>
      </BreadcrumbItem>
      <template v-for="(bc, index) in breadcrumbs" :key="index">
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <template v-if="bc.to && !bc.isLast">
            <BreadcrumbLink>
              <RouterLink :to="bc.to">
                {{ bc.name }}
              </RouterLink>
            </BreadcrumbLink>
          </template>
          <template v-else>
            <BreadcrumbPage>{{ bc.name }}</BreadcrumbPage>
          </template>
        </BreadcrumbItem>
      </template>
    </BreadcrumbList>
  </Breadcrumb>
</template>
