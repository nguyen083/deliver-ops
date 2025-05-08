<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { FormControl, FormField, FormInput, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { useCreateRobotMutation } from '@/composables/use-robot'
import { RoboflowError } from '@/types/error'
import { toTypedSchema } from '@vee-validate/zod'
import { Loader, Plus } from 'lucide-vue-next'
import { VisuallyHidden } from 'reka-ui'
import { useForm } from 'vee-validate'
import { ref } from 'vue'
import { z } from 'zod'

const open = ref(false)
const { mutate: createRobot, isPending } = useCreateRobotMutation()

const createRobotSchema = z.object({
  name: z.string()
    .min(4, 'Name is required')
    .max(255, 'Name must be less than 255 characters')
    .regex(/^[a-z0-9 ]+$/i, 'Name can only contain letters, numbers and spaces'),
})

const form = useForm({
  validationSchema: toTypedSchema(createRobotSchema),
  initialValues: {
    name: '',
  },
})

const onSubmit = form.handleSubmit((values) => {
  createRobot(values, {
    onSuccess: () => {
      notification.success({
        message: 'Robot created successfully',
      })
      open.value = false
      form.resetForm()
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
})
</script>

<template>
  <Dialog v-model:open="open">
    <DialogTrigger as-child>
      <Button>
        <Plus class="w-4 h-4 mr-2" />
        Create Robot
      </Button>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Create New Robot</DialogTitle>
        <VisuallyHidden>
          <DialogDescription />
        </VisuallyHidden>
      </DialogHeader>
      <form class="space-y-4" @submit="onSubmit">
        <FormField
          v-slot="{ componentField }"
          name="name"
        >
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <FormInput
                type="text"
                placeholder="Enter robot name"
                v-bind="componentField"
                :disabled="isPending"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <div class="flex justify-end">
          <Button
            type="submit"
            :disabled="isPending"
          >
            <Loader v-if="isPending" class="w-4 h-4 mr-2 animate-spin" />
            Create
          </Button>
        </div>
      </form>
    </DialogContent>
  </Dialog>
</template>
