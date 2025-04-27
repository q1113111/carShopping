import { setActivePinia, createPinia } from 'pinia'
import { useCounterStore } from '../index'
import { it, describe, expect, beforeEach } from 'vitest'

describe('counter store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('increment', () => {
    const store = useCounterStore()

    expect(store.count).toBe(0)
    expect(store.doubleCount).toBe(0)
    store.increment()

    expect(store.count).toBe(1)
    expect(store.doubleCount).toBe(2)
  })
})
