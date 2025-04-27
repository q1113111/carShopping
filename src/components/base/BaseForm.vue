<template>
  <form
    class="flex flex-col"
    @submit.prevent="submitHandler"
  >
    <slot />
  </form>
</template>

<script setup lang="ts">
import { useForm } from 'vee-validate'
import { alertOptionStore } from '@/stores'

const { resetForm, validate } = useForm()
const alertStore = alertOptionStore()

const emit = defineEmits<{
  (e: 'submit'): void
  (e: 'error', errors: Partial<Record<string, string>>): void
}>()

interface Props {
  labelWidth?: string | number
  labelPosition?: 'left' | 'right' | 'justify'
  autoReset?: boolean
  notShowError?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  labelWidth: 'auto',
  labelPosition: 'left',
  autoReset: true,
  notShowError: false
})

const submitHandler = async () => {
  const { valid, errors } = await validate()

  if (Object.keys(errors).length > 0 && !props.notShowError) {
    alertStore.setOption({
      code: 1,
      show: true,
      content: errors[Object.keys(errors)[0]]
    })
  }

  if (!valid) {
    emit('error', errors)
  } else {
    emit('submit')
    if (props.autoReset) {
      resetForm()
    }
  }
}

defineExpose({ submitHandler, resetForm })
</script>

<style scoped>
:deep(.label) {
  display: inline-block;
  width: v-bind('props.labelWidth');
  text-align: v-bind('props.labelPosition');
}
</style>
