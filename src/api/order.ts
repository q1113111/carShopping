import { Order } from '@/interface'
import { rest } from './index'
export const Api = {
  Google:
    'https://script.google.com/macros/s/AKfycbyGmoZukCQze0nw3UF-VX9ELODVy5Rs6CIQ1U-YbwNHfG3JIjGz4JThKAvWJB1P0qTg/exec' // 登入
}

export default {
  Google: (): Promise<Order[]> => {
    return rest.get(Api.Google)
  }
}
