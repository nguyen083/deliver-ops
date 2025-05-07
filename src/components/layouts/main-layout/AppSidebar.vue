<script setup lang="ts">
import type { SidebarProps } from '@/components/ui/sidebar'
import { Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar'
import { menus } from './menu'
import Navigation from './Navigation.vue'

const props = withDefaults(defineProps<SidebarProps>(), {
  collapsible: 'icon',
})
</script>

<template>
  <Sidebar v-bind="props" class="bg-popover">
    <SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton size="lg"
            class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground hover:bg-transparent">
            <img alt="Vue logo" src="@/assets/logo.svg" width="32" height="32">
            <span class="font-semibold truncate">DeliverOps</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
    <SidebarContent>
      <Navigation :items="menus" />
    </SidebarContent>
  </Sidebar>
</template>
