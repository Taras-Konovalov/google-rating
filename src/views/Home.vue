<script setup lang="ts">
import { onMounted } from 'vue';
import { useStore } from '@/stores/reviews'

const store = useStore()

onMounted(async () => {
   // Створення штучної затримки на 2 секунди для імітації завантаження даних із сервера
  await new Promise(resolve => setTimeout(resolve, 2000))

  // Виклик методу для завантаження відгуків із сервера
  store.loadReviews()
})
</script>

<template>
  <section class="container wrapper">
    <Rating
      title="app.googleReviewTitle"
      :rating="store.reviews[0] || null"
    >
      <template #icon>
        <GoogleIcon />
      </template>
    </Rating>
  </section>
</template>

<style scoped lang="scss">
.wrapper {
  margin-top: 50px;
}
</style>