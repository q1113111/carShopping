<template>
  <div
    class="fixed top-5 right-0 left-0 z-[2000] mx-auto max-w-max rounded whitespace-nowrap transition-transform duration-500"
    :class="[classDefault, transform, customClass, alertType]"
  >
    <div class="flex items-center justify-between">
      <div class="flex items-center">
        <Icon
          v-show="icon"
          data-test="icon"
          class="mr-[10px]"
          :name="IconName"
        />
        <div
          data-test="content"
          class="text-base"
        >
          {{ translate(content) }}
        </div>
      </div>
      <Icon
        v-show="!icon"
        data-test="close"
        class="cursor-pointer"
        name="close"
        size="w-4 h-4"
        @click="alertStore.closeAlert"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { TypeColor } from '@/interface'
import { AlertOption } from '@/interface/index'
import stateCode from '@/utils/stateCode'
import { alertOptionStore } from '@/stores'
import { translate } from '@/utils/index'

const alertStore = alertOptionStore()
const props = defineProps<AlertOption>()
const IconName = computed<string>(() => {
  const map: TypeColor = {
    primary: 'info',
    success: 'success',
    danger: 'error',
    warning: 'warning',
    info: 'info'
  }
  return map[props.type as keyof TypeColor]
})

const classDefault = computed<string>(() => {
  const map: TypeColor = {
    primary: 'bg-green-700 border-green-300 text-green-200',
    success: 'bg-success-light09 border-success-light08 text-success-default',
    danger: 'bg-danger-light09 border-danger-light08 text-danger-default',
    warning: 'bg-warning-light09 border-warning-light08 text-warning-default',
    info: 'bg-info-light09 border-info-light08 text-info-default'
  }
  return map[props.type as keyof TypeColor]
})

const content = computed<string>(() => stateCode(props.code, props.content) as string)

const transform = computed<string>(() => (props.show ? '' : 'translate-y-[-200%]'))

const alertType = computed(() =>
  props.icon
    ? 'border border-solid py-3 pl-5 pr-4 min-w-[380px]'
    : 'py-2 px-4 min-w-[400px] text-sm'
)
</script>
