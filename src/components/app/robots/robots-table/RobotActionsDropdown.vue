<script setup lang="ts">
import type { Robot } from '@/types/robot'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Ellipsis, Trash } from 'lucide-vue-next'
import RobotDeleteDialog from './RobotDeleteDialog.vue'

const props = defineProps<{
  robot: Robot
}>()

const isDeleteOpen = ref(false)
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="ghost" size="icon">
        <Ellipsis />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent class="w-56">
      <DropdownMenuItem @click="isDeleteOpen = true">
        <Trash />
        Delete
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
  <RobotDeleteDialog v-model:is-open="isDeleteOpen" :robot="props.robot" />
</template>
