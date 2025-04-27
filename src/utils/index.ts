import { TranslationParams } from '@/interface'
import i18n from '@/locales/i18n'

const { t } = i18n.global

export const translate = (params: TranslationParams | undefined | null) => {
  if (!params) return undefined

  if (Array.isArray(params)) {
    return t(...(params as [string, { [key: string]: string | number }]))
  } else {
    return t(params)
  }
}

export const ignore = <T>(params: T): T => {
  const newParams: Partial<T> = {}

  for (const item in params) {
    if (params[item] === '' || params[item] === undefined || params[item] === null) {
      continue
    }
    newParams[item] = params[item]
  }
  return newParams as T
}

export const dateFormat: (time: number | string, format: string) => string = (
  time: number | string,
  format: string
): string => {
  const date = new Date(time)

  let localDate: Date
  if (typeof time === 'string') {
    localDate = new Date(date.getTime() - new Date().getTimezoneOffset() * 60000)
  } else {
    localDate = date
  }

  const tf: (i: number, isMilliseconds?: boolean) => string = (
    i: number,
    isMilliseconds?: boolean
  ): string => {
    return isMilliseconds
      ? i < 100
        ? (i < 10 ? '00' : '0') + i
        : i.toString()
      : (i < 10 ? '0' : '') + i
  }

  return format.replace(/yyyy|MM|dd|HH|mm|ss|ms/g, (a: string) => {
    switch (a) {
      case 'yyyy':
        return tf(localDate.getFullYear())
      case 'MM':
        return tf(localDate.getMonth() + 1)
      case 'mm':
        return tf(localDate.getMinutes())
      case 'dd':
        return tf(localDate.getDate())
      case 'HH':
        return tf(localDate.getHours())
      case 'ss':
        return tf(localDate.getSeconds())
      case 'ms':
        return tf(localDate.getMilliseconds(), true)
      default:
        return ''
    }
  })
}
