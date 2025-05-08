<script setup lang="ts">
import type { Location } from '@/types/location'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { useDeleteLocationMutation } from '@/composables/use-location'
import { RoboflowError } from '@/types/error'
import { Loader } from 'lucide-vue-next'

const props = defineProps<{
  location: Location
}>()
const isOpen = defineModel<boolean>('isOpen', { required: true })
const { mutate, isPending } = useDeleteLocationMutation()

function handleDelete() {
  mutate(props.location.id, {
    onSuccess: () => {
      notification.success({
        message: 'Location deleted successfully',
      })
      isOpen.value = false
    },
    onError: (error) => {
      if (error instanceof RoboflowError) {
        notification.error({
          title: error.errorCode,
          message: error.message,
        })
      }
    },
  })
}
</script>

<template>
  <Dialog v-model:open="isOpen">
    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Delete Location</DialogTitle>
        <DialogDescription>
          Are you sure you want to delete this location?
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <Button variant="destructive" :disabled="isPending" @click="handleDelete">
          <Loader v-if="isPending" class="w-4 h-4 mr-2 animate-spin" />
          Yes
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
