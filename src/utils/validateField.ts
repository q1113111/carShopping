import { ValidateField } from '@/interface/index'
import regex from './regex'

let passwordCache = ''

export default (): ValidateField => {
  return {
    empty: () => {
      return true
    },
    required: (value = '', rule = 'FORM_ERROR002') => (value.length < 1 ? rule : true),
    nickName: (value = '') => {
      if (value === '') {
        return 'FORM_ERROR_001'
      } else if (!regex.normalName.test(value)) {
        return 'FORM_ERROR_007'
      } else {
        return true
      }
    },
    account: (value = '', rule = 'login') => {
      if (value === '') {
        return 'FORM_ERROR_001'
      } else if (value.length < 6) {
        return rule === 'login' ? 'FORM_ERROR_002' : 'FORM_ERROR_008'
      } else if (!regex.temporaryAccount.test(value)) {
        return rule === 'login' ? 'FORM_ERROR_003' : 'FORM_ERROR_008'
      } else if (!regex.frontLast.test(value)) {
        return 'FORM_ERROR_004'
      } else {
        return true
      }
    },
    password: (value = '', rule = 'login') => {
      if (value === '') {
        return 'FORM_ERROR_001'
      } else if (value.length < 6) {
        return rule === 'register' ? 'FORM_ERROR_006' : 'FORM_ERROR_005'
      } else if (!regex.temporaryAccount.test(value)) {
        return rule === 'register' ? 'FORM_ERROR_006' : 'FORM_ERROR_005'
      } else {
        passwordCache = value
        return true
      }
    },
    passwordConfirm: (value = '') => {
      if (value === '') {
        return 'FORM_ERROR_001'
      } else if (
        value !== passwordCache ||
        value.length < 6 ||
        !regex.temporaryAccount.test(value)
      ) {
        return 'FORM_ERROR_009'
      } else {
        return true
      }
    }
  }
}
