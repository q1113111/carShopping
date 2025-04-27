<template>
  <div class="h-full overflow-auto">
    <div class="flex flex-col gap-5">
      <ul
        class="relative flex flex-col gap-3 rounded-lg bg-white p-4 pl-10 shadow-sm transition-shadow hover:shadow-md"
        v-for="items of orderData"
        :key="items.id"
      >
        <li class="absolute left-1">
          <input
            v-show="!items.done"
            type="checkbox"
            v-model="items.checked"
          />
        </li>
        <li class="flex">
          <span class="whitespace-nowrap">課程名稱:</span>
          <span class="truncate">{{ items.name }}</span>
        </li>
        <li class="flex gap-2">
          <div>縮圖:</div>
          <img
            class="w-20 object-cover"
            :src="items.imageUrl"
            alt=""
          />
        </li>
        <li>單價: {{ items.price }}</li>
        <li></li>
      </ul>
    </div>
    <div class="mt-2 flex items-center justify-between">
      <div class="sm:text-2xl">總計:{{ total }}</div>
      <div class="flex gap-2">
        <BaseBtn
          @click="addCar"
          label="送出"
        />
        <BaseBtn
          color="error"
          @click="deleteCar"
          label="刪除"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { addCarStore, alertOptionStore } from '@/stores'

const useAddCarStore = addCarStore()
const alertStore = alertOptionStore()
const { orderData } = toRefs(useAddCarStore)
const total = computed(() => orderData.value.reduce((sum, item) => sum + item.price, 0))

const addCar = () => {
  alertStore.setOption({
    code: 1,
    show: 1,
    content: '送出成功'
  })
  const filterData = orderData.value.filter((item) => item.checked)
  filterData.forEach((item) => {
    item.done = true
  })
}

const deleteCar = () => {
  alertStore.setOption({
    code: 1,
    show: 1,
    content: '刪除成功'
  })
  const filterData = orderData.value.filter((item) => !item.checked)
  console.log(filterData)

  useAddCarStore.clearData(filterData)
}
</script>
