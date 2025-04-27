import router from '@/router'
import { alertOptionStore } from '@/stores'
import axios from 'axios'
import qs from 'qs'
import { ignore } from '@/utils'
import modules from '@/module'
// import { Logout } from '@/utils/logout'

const alertStore = alertOptionStore()

axios.defaults.timeout = 60000
// axios.defaults.withCredentials = true
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
// axios.defaults.baseURL = 'https://teligi.fiami.com.tw'
// POST传参序列化
axios.interceptors.request.use(
  (config) => {
    // const token = modules.localStorage('token').load()
    // if (token && !config.url?.includes(userApiUrl.GetFacebookToken)) {
    //   config.headers.Authorization = `Bearer ${token}`
    // }

    return config
  },
  (error) => {
    // console.log('错误的传参')
    return Promise.reject(error)
  }
)

declare global {
  interface Window {
    tipLock: boolean
  }
}

// 返回状态判断
window.tipLock = false
axios.interceptors.response.use(
  async (res) => {
    if (res.status !== 200) {
      return Promise.reject(res)
    }
    const code = res.data.code
    const token = modules.localStorage('token').load()
    // if (code !== 1) {
    //   // const modalStore = modalOptionsStore()

    //   // 商戶無法交易，關閉 我的掛單、我的訂單、掛單市場 選單，清除 tab
    //   // if (code === -60006) {
    //   //   modalStore.setOption({
    //   //     visible: true,
    //   //     title: 'PROMPT',
    //   //     content: 'C-60006',
    //   //     icon: true,
    //   //     cancelShow: false,
    //   //     confirmLabel: 'I_KNOW',
    //   //     yes: () => redirect(),
    //   //     no: () => redirect()
    //   //   })
    //   // }

    //   // 警告排除(確定是全域排除可以直接寫在這邊)
    //   // const excludeList = [-1006, -60006]
    //   // if (!excludeList.includes(code)) {
    //   //   alertStore.setOption({ show: true, type: 'danger', code: code || 0, content: res.data?.data })
    //   // }
    //   if (code === undefined) {
    //     // 排除 facebook 回傳參數
    //     return res
    //   }

    //   // 登入密碼錯誤提示
    //   if (code === -1002) {
    //     if (res.data?.data.loginFailedAttempts < 5 || res.data?.data < 5) {
    //       alertStore.setOption({
    //         show: true,
    //         code: 1001,
    //         content: res.data?.data.loginFailedAttempts || res.data?.data
    //       })
    //     } else {
    //       alertStore.setOption({ show: true, code: 1002 })
    //     }
    //     return res
    //   }

    //   if (code === -1006 && token) {
    //     Logout(false, true)
    //   }

    //   // -6 = token過期 => 重新獲取 token
    //   if (code === -6) {
    //     const originalConfig = res.config
    //     const refreshUrl = 'api/user/token'

    //     if (originalConfig.url?.includes(refreshUrl)) {
    //       // 進入此條件代表 cookie 內的 refresh token 也過期了，需要使用者手動重新登入
    //       Logout(false, true)
    //     } else {
    //       // 發送請求，後端會驗證 cookie 內的 refresh token 並回傳新的 access token
    //       const { data: newToken, code: resCode } = await userApi.UserToken()
    //       if (resCode === 1) {
    //         modules.localStorage('token').save(newToken)

    //         // 重新發送一次先前因 token 失效而失敗的請求
    //         originalConfig.headers.Authorization = `Bearer ${newToken}`
    //         axios(originalConfig)
    //       }
    //       return res
    //     }
    //   }
    //   alertStore.setOption({
    //     show: true,
    //     code: code || 0,
    //     content: res.data?.data
    //   })
    // }
    return res
  },
  (error) => {
    if (error.response.config.url.includes('facebook')) {
      alertStore.setOption({
        show: true,
        code: 1,
        content: 'FACEBOOK_ERROR'
      })
      router.push({ name: '/' })
    }
    if (!window.tipLock) {
      window.tipLock = true
    }
    return Promise.reject(error)
  }
)

export const rest = {
  create<T extends Record<string, any>>(url: string, params?: T): Promise<any> {
    return new Promise((resolve, reject) => {
      const formData = new FormData()
      for (const key in params) {
        const value = params[key]
        if (value === '' || value === undefined || value === null) continue
        formData.append(key, value)
      }
      axios
        .post(url, params, {
          method: 'post',
          headers: { 'Content-Type': 'multipart/form-data' }
        })
        .then(
          (response) => {
            resolve(response.data)
          },
          (error) => {
            if (error.message === '取消请求') return
            reject(error.data)
          }
        )
        .catch((error) => {
          reject(error.data)
        })
    })
  },
  post: <T>(url: string, params?: T): Promise<any> => {
    return new Promise((resolve, reject) => {
      axios
        .post(url, qs.stringify(ignore(params)))
        .then(
          (response) => {
            resolve(response.data)
          },
          (error) => {
            if (error.message === '取消请求') return
            reject(error.data)
          }
        )
        .catch((error) => {
          reject(error.data)
        })
    })
  },
  postJson: <T>(url: string, params?: T, isIgnore = true): Promise<any> => {
    const newParas = isIgnore ? ignore(params) : params
    return new Promise((resolve, reject) => {
      axios
        .post(url, newParas, {
          method: 'post',
          headers: { 'Content-Type': 'application/json' }
        })
        .then(
          (response) => {
            resolve(response.data)
          },
          (error) => {
            if (error.message === '取消请求') return
            reject(error.data)
          }
        )
        .catch((error) => {
          reject(error.data)
        })
    })
  },
  get: <T>(url: string, params?: T, returnRes = false): Promise<any> => {
    return new Promise((resolve, reject) => {
      // const param:any = params || {}
      const paramData: Record<string, any> = {}
      for (const item in params) {
        if (params[item] === null || params[item] === undefined || params[item] === '') {
          continue
        }
        paramData[item] = encodeURIComponent(params[item] as string | number | boolean)
      }
      const uri = getStrUrl(url, paramData)
      // console.log(uri)
      axios
        .get(uri)
        .then(function (res) {
          if (!returnRes) {
            resolve(res.data)
          } else {
            resolve(res)
          }
        })
        .catch(function (error) {
          reject(error)
        })
    })
  }
}
export function getStrUrl<T>(url: string, params: T) {
  if (params) {
    let uri = '?'
    for (const item in params) {
      uri = uri + item + '=' + params[item] + '&'
    }
    return url + uri
  }
  return url
}
