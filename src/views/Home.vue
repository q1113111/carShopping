<template>
  <div class="h-full overflow-auto">
    <div class="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3">
      <ul
        class="flex flex-col gap-3 rounded-lg bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
        v-for="items of data"
        :key="items.id"
      >
        <li class="flex">
          <span class="whitespace-nowrap">課程名稱:</span>
          <span class="truncate">{{ items.name }}</span>
        </li>
        <li>
          開課狀態:
          <span :class="items.status === '已加入' ? 'text-indigo-500' : 'text-gray-500'">{{
            items.status
          }}</span>
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
        <li>
          <BaseBtn
            @click="setCar(items)"
            :disabled="items.status === '尚未開始' || items.status === '已加入'"
            label="加入"
          />
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import Api from '@/api/order'
import { Order } from '@/interface'
import { addCarStore, alertOptionStore } from '@/stores'

const useAddCarStore = addCarStore()
const alertStore = alertOptionStore()

const setCar = (data: Order) => {
  alertStore.setOption({
    code: 1,
    show: 1,
    content: '加入成功'
  })
  data.status = '已加入'
  useAddCarStore.setOrderData(data)
}

const data = ref([
  {
    id: '1758051268318220289',
    name: '狂美《久石讓的燦爛樂章》交響音樂會-2024再現',
    displayCategory: '音樂',
    imageUrl: 'https://s3.resource.opentix.life/upload/program/1710929296686xSXZ4TpVh3.jpeg',
    startDateTime: 1720000000,
    endDateTime: 1730000000,
    price: 2200,
    ageRestriction: '7歲以上',
    status: '已開始'
  },
  {
    id: '1784862638494830592',
    name: '2024 馬辛－龍之聲世界巡演台灣站',
    displayCategory: '音樂',
    imageUrl: 'https://s3.resource.opentix.life/upload/program/1714967180923XS2gISJhI3.jpeg',
    startDateTime: 1720000000,
    endDateTime: 1720000000,
    price: 2500,
    ageRestriction: '4歲以上',
    status: '已開始'
  },
  {
    id: '1772170841003401217',
    name: '躍演《勸世三姊妹》中文音樂劇',
    displayCategory: '戲劇',
    imageUrl: 'https://s3.resource.opentix.life/upload/program/1714449616854Zyw4J4CGoH.jpeg',
    startDateTime: 1720000000,
    endDateTime: 1720000000,
    price: 3600,
    ageRestriction: '12歲以上',
    status: '已開始'
  },
  {
    id: '1782384429793337345',
    name: '面粉趴2024夏',
    displayCategory: '戲劇',
    imageUrl: 'https://s3.resource.opentix.life/upload/program/17146397582702RN8zIwyTo.jpeg',
    startDateTime: 1720000000,
    endDateTime: 1720000000,
    price: 1000,
    ageRestriction: '輔15級',
    status: '尚未開始'
  },
  {
    id: '1783015237651550209',
    name: '音樂劇《跑跑殭丙仁》',
    displayCategory: '戲劇',
    imageUrl: 'https://s3.resource.opentix.life/upload/program/1715127950033jbYDDq1I6V.jpeg',
    startDateTime: 1720000000,
    endDateTime: 1730000000,
    price: 2000,
    ageRestriction: '6歲以上',
    status: '已結束'
  },
  {
    id: '1771072679226855425',
    name: '聞笛',
    displayCategory: '音樂',
    imageUrl: 'https://s3.resource.opentix.life/upload/program/1711588445650rd86vj6XhI.jpeg',
    startDateTime: 1720000000,
    endDateTime: 1720000000,
    price: 300,
    ageRestriction: '普遍級',
    status: '已開始'
  },
  {
    id: '1606151416662671362',
    name: '親子音樂劇《阿甯咕又闖禍了YA~》小兒子動畫劇場 ①',
    displayCategory: '親子',
    imageUrl: 'https://s3.resource.opentix.life/upload/program/17092736496549f700TXn8s.png',
    startDateTime: 1720000000,
    endDateTime: 1720000000,
    price: 1600,
    ageRestriction: '4歲以上',
    status: '尚未開始'
  },
  {
    id: '1770728060409761793',
    name: '福爾摩沙合唱團三十週年藝文推廣系列音樂會之一',
    displayCategory: '音樂',
    imageUrl: 'https://s3.resource.opentix.life/upload/program/1712140373140AHiTWOMyUu.png',
    startDateTime: 1720000000,
    endDateTime: 1720000000,
    price: 1000,
    ageRestriction: '普遍級',
    status: '尚未開始'
  },
  {
    id: '1782976868097384449',
    name: '【歌仔戲】秀琴歌劇團《黃金美人島》《陳守娘傳奇》《薛平貴與王寶釧》',
    displayCategory: '戲劇',
    imageUrl: 'https://s3.resource.opentix.life/upload/program/1713929677527H0jPoCnUnx.jpeg',
    startDateTime: 1730000000,
    endDateTime: 1730000000,
    price: 1200,
    ageRestriction: '7歲以上',
    status: '已結束'
  },
  {
    id: '1783060649972731905',
    name: '歡聲歌唱．快樂向前-台北愛樂少年及兒童合唱團夏日音樂會',
    displayCategory: '音樂',
    imageUrl: 'https://s3.resource.opentix.life/upload/program/1714033221285WTINSAGHgC.jpeg',
    startDateTime: 1720000000,
    endDateTime: 1720000000,
    price: 150,
    ageRestriction: '普遍級',
    status: '已開始'
  }
])
const getData = async () => {
  const res = await Api.Google()
  data.value = res
}

// getData()
</script>
