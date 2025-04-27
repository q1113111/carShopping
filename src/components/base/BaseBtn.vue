<template>
  <button
    class="cursor-pointer text-white"
    :class="[props.rounded, props.height, btnColor]"
  >
    {{ translate(props.label) }}
  </button>
</template>

<script setup lang="ts">
import { translate } from '@/utils'
const props = withDefaults(
  defineProps<{
    label: string
    disabled?: boolean
    rounded?: string
    height?: string
    color?: string
  }>(),
  {
    rounded: 'rounded-[5px] px-5',
    height: 'h-8',
    color: 'success'
  }
)

const btnColor = computed(() => {
  if (props.disabled) {
    return 'bg-gray-100 text-gray-400 pointer-events-none'
  }
  const btnClass = {
    success: 'bg-rose-300 hover:bg-rose-400 text-gray-700',
    error: 'bg-gray-200 hover:bg-gray-300 text-gray-700'
  }

  return btnClass[props.color as keyof typeof btnClass]
})
</script>
