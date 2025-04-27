<template>
  <div
    class="flex"
    :class="isColumn ? 'flex-col' : align"
  >
    <div :class="labelClass">
      <div
        class="label text-sm font-bold"
        :class="[
          props.labelTextClass,
          isColumn ? 'mb-2' : 'mr-3',
          { 'mt-[7px]': props.align === 'top' }
        ]"
      >
        <span
          v-if="isRequired"
          class="text-danger-default mr-1"
          >*</span
        >
        <span>{{ translate(label) }}</span>
      </div>
      <slot name="label" />
    </div>
    <div class="flex-1">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { FormItem } from '@/interface/index'
import { translate } from '@/utils/index'

const props = withDefaults(defineProps<FormItem>(), {
  isRequired: true,
  isColumn: false,
  align: 'center',
  labelClass: '',
  labelTextClass: ''
})

const align: ComputedRef<string> = computed(() => {
  switch (props.align) {
    case 'top':
      return 'items-start'
    case 'bottom':
      return 'items-end'
    default:
      return 'items-center'
  }
})
</script>
