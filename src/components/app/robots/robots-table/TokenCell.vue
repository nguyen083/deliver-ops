<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Eye, EyeOff } from 'lucide-vue-next'
import { ref } from 'vue'

const props = defineProps<{
  token: string
}>()

const isVisible = ref(false)
</script>

<template>
  <div class="flex items-center gap-2">
    <span class="font-mono text-xs">
      {{ isVisible ? props.token : '******************' }}
    </span>
    <Button
      variant="ghost"
      size="icon"
      class="w-6 h-6"
      @click="isVisible = !isVisible"
    >
      <Eye v-if="!isVisible" class="w-4 h-4" />
      <EyeOff v-else class="w-4 h-4" />
    </Button>
  </div>
</template>
