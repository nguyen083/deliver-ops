<script setup lang="ts">
import type { Location } from '@/types/location'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Ellipsis, Pencil, Trash } from 'lucide-vue-next'
import LocationDeleteDialog from './LocationDeleteDialog.vue'
import LocationEditSheet from './LocationEditSheet.vue'

const props = defineProps<{
  location: Location
}>()

const isEditOpen = ref(false)
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
      <DropdownMenuItem @click="isEditOpen = true">
        <Pencil />
        Edit
      </DropdownMenuItem>
      <DropdownMenuItem class="text-destructive" @click="isDeleteOpen = true">
        <Trash />
        Delete
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
  <LocationEditSheet v-model:is-open="isEditOpen" :location="props.location" />
  <LocationDeleteDialog v-model:is-open="isDeleteOpen" :location="props.location" />
</template>
