<script setup lang="ts">
import type { Location } from '@/types/location'
import { Button } from '@/components/ui/button'
import { FormControl, FormField, FormInput, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { useUpdateLocationMutation } from '@/composables/use-location'
import { RoboflowError } from '@/types/error'
import { toTypedSchema } from '@vee-validate/zod'
import { Loader } from 'lucide-vue-next'
import { useForm } from 'vee-validate'
import { z } from 'zod'

const props = defineProps<{
  location: Location
}>()

const isOpen = defineModel<boolean>('isOpen', { required: true })
const { mutate, isPending } = useUpdateLocationMutation()

const createLocationSchema = z.object({
  name: z.string()
    .min(4, 'Name must be at least 4 characters')
    .max(255, 'Name must be less than 255 characters')
    .regex(/^[a-z0-9 ]+$/i, 'Name can only contain letters, numbers and spaces'),
  rfidTag: z.string()
    .min(4, 'RFID Tag must be at least 4 characters')
    .max(255, 'RFID Tag must be less than 255 characters'),
})

const form = useForm({
  validationSchema: toTypedSchema(createLocationSchema),
  initialValues: {
    name: props.location.name,
    rfidTag: props.location.rfidTag,
  },
})

const onSubmit = form.handleSubmit((values) => {
  mutate({ id: props.location.id, body: values }, {
    onSuccess: () => {
      notification.success({
        message: 'Location updated successfully',
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
})

watch([isOpen, () => props.location], ([isOpenValue, newLocation]) => {
  if (isOpenValue) {
    form.resetForm({
      values: {
        name: newLocation.name,
        rfidTag: newLocation.rfidTag,
      },
    })
  }
}, { immediate: true })
</script>

<template>
  <Sheet v-model:open="isOpen">
    <SheetContent>
      <form class="space-y-4" @submit="onSubmit">
        <SheetHeader>
          <SheetTitle>Edit Location</SheetTitle>
          <SheetDescription>
            Make changes to location {{ props.location.name }} here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>

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

        <SheetFooter>
          <Button type="submit" :disabled="isPending">
            <Loader v-if="isPending" class="w-4 h-4 mr-2 animate-spin" />
            Save
          </Button>
        </SheetFooter>
      </form>
    </SheetContent>
  </Sheet>
</template>
