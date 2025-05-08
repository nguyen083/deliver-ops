<script setup lang="ts">
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { FormControl, FormField, FormInput, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { useCreateLocationMutation } from '@/composables/use-location'
import { RoboflowError } from '@/types/error'
import { toTypedSchema } from '@vee-validate/zod'
import { Loader, Plus } from 'lucide-vue-next'
import { VisuallyHidden } from 'reka-ui'
import { useForm } from 'vee-validate'
import { z } from 'zod'

const open = ref(false)
const { mutate: createLocation, isPending } = useCreateLocationMutation()

const createLocationSchema = z.object({
  name: z.string()
    .min(4, 'Name must be at least 4 characters')
    .max(255, 'Name must be less than 255 characters')
    .regex(/^[a-z0-9 ]+$/i, 'Name can only contain letters, numbers and spaces'),
  rfidTag: z.string()
    .max(255, 'RFID Tag must be less than 255 characters'),
})

const form = useForm({
  validationSchema: toTypedSchema(createLocationSchema),
  initialValues: {
    name: '',
    rfidTag: '',
  },
})

const onSubmit = form.handleSubmit((values) => {
  createLocation(values, {
    onSuccess: () => {
      notification.success({
        message: 'Location created successfully',
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
        Create Location
      </Button>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Create New Location</DialogTitle>
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
                placeholder="Enter location name"
                v-bind="componentField"
                :disabled="isPending"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField
          v-slot="{ componentField }"
          name="rfidTag"
        >
          <FormItem>
            <FormLabel>RFID Tag</FormLabel>
            <FormControl>
              <FormInput
                type="text"
                placeholder="Enter RFID tag"
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
