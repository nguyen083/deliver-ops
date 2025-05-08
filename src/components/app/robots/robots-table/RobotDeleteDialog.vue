<script setup lang="ts">
import type { Robot } from '@/types/robot'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { useDeleteRobotMutation } from '@/composables/use-robot'
import { RoboflowError } from '@/types/error'
import { Loader } from 'lucide-vue-next'

const props = defineProps<{
  robot: Robot
}>()
const isOpen = defineModel<boolean>('isOpen', { required: true })
const { mutate, isPending } = useDeleteRobotMutation()

function handleDelete() {
  mutate(props.robot.id, {
    onSuccess: () => {
      notification.success({
        message: 'Robot deleted successfully',
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
        <DialogTitle>Delete Robot</DialogTitle>
        <DialogDescription>
          Are you sure you want to delete this robot?
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
