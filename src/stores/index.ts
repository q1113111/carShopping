import { createPinia, defineStore } from 'pinia'
import storeReset from './plugins/storeReset'
import { AlertOption, Order } from '@/interface'
import module from '@/module'

export const addCarStore = defineStore('modal', () => {
  const orderData: Ref<Order[]> = ref([])
  const setOrderData = (params: Order) => {
    orderData.value.push(params)
  }

  const clearData = (params: Order[]) => {
    orderData.value = params
    console.log(orderData.value)
  }

  return { orderData, setOrderData, clearData }
})

// alert設置
export const alertOptionStore = defineStore('alertOption', () => {
  let timer: ReturnType<typeof setTimeout>
  let clearTimer: ReturnType<typeof setTimeout>
  const option: Ref<AlertOption> = ref({
    code: 0,
    show: false,
    type: 'primary',
    content: '',
    customClass: ''
  })

  const closeAlert = () => {
    clearTimeout(clearTimer)
    option.value.show = false
    clearTimer = setTimeout(() => {
      option.value.content = ''
    }, 1000)
  }

  const setOption = <T>(payload: T) => {
    clearTimeout(timer)
    clearTimeout(clearTimer)
    option.value = {
      ...option.value,
      ...payload
    }
    timer = setTimeout(() => {
      closeAlert()
    }, 1000)
  }

  return { option, setOption, closeAlert }
})

// 使用者登入資訊
export const userInfoStore = defineStore('userInfo', () => {
  const userInfo: Ref<any | null> = ref(module.localStorage('userInfo').load())

  const setUserInfo = (payload: any) => {
    userInfo.value = payload
    module.localStorage('userInfo').save(userInfo.value)
  }
  const clearInfo = () => {
    userInfo.value = null
    module.localStorage('userInfo').remove()
  }

  return { userInfo, setUserInfo, clearInfo }
})

const store = createPinia()
store.use(storeReset)

export default store
