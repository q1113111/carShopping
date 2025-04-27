import { IconProps } from './iconProps.interface'

export interface FieldItem {
  icon?: IconProps
  fieldName: string
  placeholder?: string
  inputType?: string
  password?: boolean
  maxlength?: number
  rule?: string
}
