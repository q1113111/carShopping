import { config } from '@vue/test-utils'
import i18n from './src/locales/i18n'
config.global.plugins = [i18n]
config.global.mocks = {
  $t: tKey => tKey // just return translation key
}
