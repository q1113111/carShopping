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
        :maxlength="maxlength"
        class="autofill:shadow-autofill flex-1 text-sm placeholder-gray-400"
        :placeholder="translate(placeholder)"
        :class="[{ 'pointer-events-none': disable }]"
        :type="inputType"
        @keyup.enter="enterHandler"
        @blur="blurHandler"
        @compositionstart="isLock = true"
        @compositionend="isLock = false"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { BaseInputProps, ValidateField, TranslationParams } from '@/interface/index'
import regex from '@/utils/regex'
import { useField } from 'vee-validate'
import validateField from '@/utils/validateField'
import { translate } from '@/utils'
const isLock = ref(false)
const props = withDefaults(defineProps<BaseInputProps>(), {
  password: false,
  placeholder: '',
  maxlength: 20,
  fieldName: 'empty',
  disable: false,
  rule: undefined,
  ruleName: '',
  initValidate: false,
  showLimit: false
})
const emit = defineEmits<{
  (e: 'keyupEnter'): void
  (e: 'blur', value: string): void
}>()

const modelValue = defineModel<string>({ required: true })
const inputType = defineModel<string>('inputType', { default: 'text' })

const isRuleName = computed(() => (props.ruleName ? props.ruleName : props.fieldName))
const { value } = useField(
  () => props.fieldName,
  (val) => validateField()[isRuleName.value as keyof ValidateField](val as string, props.rule)
)

const eventState = ref('')
const blurHandler = () => {
  eventState.value = 'blur'
  value.value = modelValue.value

  emit('blur', modelValue.value)
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
