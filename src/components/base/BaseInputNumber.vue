<template>
  <div class="relative">
    <div
      class="border-gary-500 relative flex h-9 items-center overflow-hidden rounded border border-solid px-3 py-2.5"
    >
      <Icon
        v-if="icon?.name"
        class="pointer-events-none z-10 mr-2"
        :name="icon.name"
        :size="icon.size"
        :color="icon.color"
      />
      <input
        ref="inputRef"
        v-model="modelValue"
        class="autofill:shadow-autofill flex-1 text-sm placeholder-gray-400"
        :placeholder="translate(placeholder)"
        :class="[{ 'pointer-events-none': disable }]"
        type="number"
        @keyup.enter="enterHandler"
        @blur="blurHandler"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { BaseInputNumberProps, ValidateField } from '@/interface/index'
import { useField } from 'vee-validate'
import validateField from '@/utils/validateField'
import { translate } from '@/utils'
const props = withDefaults(defineProps<BaseInputNumberProps>(), {
  placeholder: '',
  fieldName: 'empty',
  disable: false,
  ruleName: '',
  initValidate: false,
  min: 0,
  max: 100,
  percent: 1
})
const emit = defineEmits<{
  (e: 'keyupEnter'): void
  (e: 'blur', value: number): void
}>()

const changeVal = (val: number | string): number | string => {
  if (typeof val === 'string') {
    return val
  }
  if (val < props.min) {
    return props.min
  }
  if (val > props.max) {
    return props.max
  }
  const percent = 10 ** props.percent
  return Math.round((val as number) * percent) / percent
}

const modelValue = defineModel<number | string>({ required: true })

const isRuleName = computed(() => (props.ruleName ? props.ruleName : props.fieldName))
const { value } = useField(
  () => props.fieldName,
  (val) => validateField()[isRuleName.value as keyof ValidateField](val as string, props.rule)
)

const eventState = ref('')
const blurHandler = () => {
  eventState.value = 'blur'
  value.value = changeVal(modelValue.value)
  modelValue.value = changeVal(modelValue.value)
}

const inputRef = ref<HTMLInputElement | null>(null)
const enterHandler = () => {
  inputRef.value?.blur()
  value.value = modelValue.value
  emit('keyupEnter')
}

const setFocus = () => {
  inputRef.value?.focus()
}

onMounted(() => {
  if (props.initValidate) {
    value.value = modelValue.value
  }
})

const setValue = () => {
  value.value = modelValue.value
}

// 如果規則有變動，則重新驗證
watch(
  () => props.rule,
  () => {
    setValue()
  }
)

defineExpose({ setFocus, setValue })
</script>

<style scoped>
/* edge 隱藏顯示密碼圖示 */
input[type='password']::-ms-reveal {
  display: none;
}
</style>
