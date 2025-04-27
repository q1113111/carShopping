<template>
  <svg :class="[iconClass, size, useColors]">
    <use :xlink:href="`#icon-${name}`" />
  </svg>
</template>
<script setup lang="ts">
import { IconProps } from '@/interface/index'
const props = withDefaults(defineProps<IconProps>(), {
  size: 'w-4 h-4',
  color: 'text-gary-400',
  disable: false,
  disableColor: '',
  iconClass: ''
})

const useColors = computed<string>(() => (props.disable ? props.disableColor : props.color))
</script>
