import { IconProps, TranslationParams } from './index'
export interface FormField {
  label?: string
  fieldName?: string
  inputType?: string
  password?: boolean
  placeholder?: TranslationParams
  ruleName?: string
  icon?: IconProps
  isLogin?: boolean
  numState?: boolean
}

export interface NormalFormInfo {
  [propName: string]: any
}
