import { IconProps, TranslationParams } from './index'

export interface BaseInputProps {
  disable?: boolean
  icon?: IconProps
  isLogin?: boolean
  maxlength?: number
  password?: boolean
  placeholder?: TranslationParams
  fieldName?: string
  height?: string
  rule?: any
  ruleName?: string
  initValidate?: boolean
}

export interface BaseInputNumberProps {
  modelValue: number | string
  disable?: boolean
  icon?: IconProps
  placeholder?: TranslationParams
  fieldName?: string
  height?: string
  rule?: any
  ruleName?: string
  initValidate?: boolean
  min: number
  max: number
  percent: number
}
