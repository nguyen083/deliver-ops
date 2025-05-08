<script setup lang="ts">
interface Props {
  robotId: number
  robotName: string
}
const props = defineProps<Props>()
</script>

<template>
  <RouterLink :to="`/robots/${props.robotId}`">
    <a class="hover:underline text-primary">
      {{ props.robotName }}
    </a>
  </RouterLink>
</template>
