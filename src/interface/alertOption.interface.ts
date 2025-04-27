type Data = {
  [key: string]: string | number
}

export interface AlertOption {
  code: number
  type?: string
  show: boolean
  icon?: boolean
  customClass: string
  content?: string | number | Data
  data?: number
}
