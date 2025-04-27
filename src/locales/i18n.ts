import { createI18n } from 'vue-i18n'
import cn from './cn.json'
import en from './en.json'

type MessageSchema = typeof cn

const i18n = createI18n<[MessageSchema], 'cn' | 'en'>({
  legacy: false,
  // locale: 'en',
  locale: 'cn',
  messages: {
    cn,
    en
  }
})

export default i18n
