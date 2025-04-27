export interface Order {
  id: string
  name: string
  displayCategory: string
  imageUrl: string
  startDateTime: number
  endDateTime: number
  price: number
  ageRestriction: string
  status: string
  checked?: boolean
  done?: boolean
}
