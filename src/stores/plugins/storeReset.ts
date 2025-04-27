import cloneDeep from 'lodash.clonedeep'
import { PiniaPluginContext } from 'pinia'
export default function storeReset({ store }: PiniaPluginContext) {
  const initialState = cloneDeep(store.$state)
  store.$reset = () => store.$patch(cloneDeep(initialState))
}
