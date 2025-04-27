import { alertOptionStore, userInfoStore } from '@/stores'
import userApi from '@/api/user'
import router from '@/router'

// isLocal: 是否為前端登出(只清 token)
export const Logout = async (isAlert = false, isLocal = false) => {
  const alertStore = alertOptionStore()
  if (!isLocal) {
    await userApi.UserLogout()
  }
  if (isAlert) {
    alertStore.setOption({ show: true, code: 2 })
  }
  const userStore = userInfoStore()
  userStore.clearInfo()
  sessionStorage.clear()
  localStorage.clear()
  router.push({ name: '/' })
}
