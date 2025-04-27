<template>
  <div class="flex h-full flex-col">
    <div class="flex flex-1 overflow-hidden">
      <SideBar />
      <div class="relative flex flex-1 overflow-hidden">
        <div class="flex flex-grow flex-col overflow-hidden p-5">
          <RouterView />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup></script>
