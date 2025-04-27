export interface FormItem {
  label: string
  isRequired?: boolean
  isColumn?: boolean
  type?: string
  align?: 'center' | 'top' | 'bottom'
  labelClass?: string
  labelTextClass?: string
}
