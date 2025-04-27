<template>
  <div class="h-full">
    <BaseAlert v-bind="alertOption" />
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import { alertOptionStore } from '@/stores'
import { storeToRefs } from 'pinia'

const alertStore = alertOptionStore()

const { option: alertOption } = storeToRefs(alertStore)
</script>
<style></style>
