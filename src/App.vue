<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="mt-2 ml-10">
    <TranslateMenu />
  </div>
  <RouterView />
  <TheNotifications />
</template>

<style scoped lang="scss">

</style>
