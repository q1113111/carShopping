export default {
  localStorage: (key: string) => {
    return {
      load() {
        return JSON.parse(localStorage.getItem(key) || 'null')
      },
      save<T>(data: T) {
        if (data) {
          localStorage.setItem(key, JSON.stringify(data))
        }
      },
      remove() {
        return localStorage.removeItem(key)
      }
    }
  },
  sessionStorage: (key: string) => {
    return {
      load() {
        return JSON.parse(sessionStorage.getItem(key) || 'null')
      },
      save<T>(data: T) {
        if (data) {
          sessionStorage.setItem(key, JSON.stringify(data))
        }
      },
      remove() {
        return sessionStorage.removeItem(key)
      }
    }
  }
}
