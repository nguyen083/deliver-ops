<script setup lang="ts">
import type { LucideIcon } from 'lucide-vue-next'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { SidebarGroup, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem } from '@/components/ui/sidebar'
import { ChevronRight } from 'lucide-vue-next'

interface Item {
  title: string
  path?: string
  icon: LucideIcon
  isActive?: boolean
  children?: {
    title: string
    path: string
  }[]
}

interface Props {
  items: Item[]
}
const props = defineProps<Props>()
const route = useRoute()

const menuItems = computed(() => {
  return props.items.map(item => ({
    ...item,
    isActive: item.path === route.path || (item.children?.some(child => child.path === route.path) ?? false),
  }))
})

export type { Item }
</script>

<template>
  <SidebarGroup>
    <SidebarMenu>
      <template v-for="item in menuItems" :key="item.title">
        <SidebarMenuItem v-if="item.path">
          <SidebarMenuButton as-child :is-active="item.isActive">
            <RouterLink
              :to="item.path"
              active-class="font-semibold bg-muted"
            >
              <component :is="item.icon" v-if="item.icon" />
              <span>{{ item.title }}</span>
            </RouterLink>
          </SidebarMenuButton>
        </SidebarMenuItem>
        <Collapsible
          v-else
          :key="item.title"
          as-child
          :default-open="item.isActive"
          class="group/collapsible"
        >
          <SidebarMenuItem>
            <CollapsibleTrigger as-child>
              <SidebarMenuButton>
                <component :is="item.icon" />
                <span>{{ item.title }}</span>
                <ChevronRight class="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
              </SidebarMenuButton>
            </CollapsibleTrigger>
            <CollapsibleContent v-if="item.children?.length">
              <SidebarMenuSub>
                <SidebarMenuSubItem v-for="subItem in item.children" :key="subItem.title">
                  <SidebarMenuSubButton as-child>
                    <RouterLink
                      :to="subItem.path"
                      active-class="font-semibold bg-muted"
                    >
                      <span>{{ subItem.title }}</span>
                    </RouterLink>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              </SidebarMenuSub>
            </CollapsibleContent>
          </SidebarMenuItem>
        </Collapsible>
      </template>
    </SidebarMenu>
  </SidebarGroup>
</template>
