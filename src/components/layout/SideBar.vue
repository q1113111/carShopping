<template>
  <nav class="flex basis-24 flex-col gap-1 rounded-lg bg-gray-50 p-2">
    <router-link
      to="/home"
      class="rounded-md p-2 text-gray-700 transition-colors hover:bg-rose-50"
      active-class="bg-rose-100"
    >
      購物清單
    </router-link>
    <router-link
      to="/shopping"
      class="rounded-md p-2 text-gray-700 transition-colors hover:bg-rose-50"
      active-class="bg-rose-100"
    >
      結帳
    </router-link>
  </nav>
</template>

<script setup lang="ts"></script>
