<script setup lang="ts">
import { ref } from 'vue'
import { useStore } from '@/stores/reviews'
import type { IReviewItem } from '@/stores/models';
import { useI18n } from 'vue-i18n'

// Визначаємо властивості (props) компонента
defineProps<{
  title: string
  rating: IReviewItem | null
}>()

// Ініціалізуємо функцію локалізації для перекладів
const { t } = useI18n()
// Отримуємо доступ до магазину для отримання даних відгуків
const store = useStore()
// Змінна для контролю відкриття діалогового вікна
const isOpenDialog = ref(false)
</script>

<template>
  <div class="rating-container">
    <div class="rating-container__body">
      <div class="rating-container__body__title">
        <div v-if="$slots.icon" class="h-40 w-40">
           <slot name="icon"></slot>
        </div>
        <p class="text-body-large">
          {{ t(title) }}
        </p>
      </div>
      <v-skeleton-loader
        v-if="store.isLoading"
        type="text"
        class="skeleton"
      ></v-skeleton-loader>
      <div 
        v-else-if="!store.isLoading && rating" 
        class="rating-container__body__rating"
      >
        <span class="text-body-h3 black">
            {{ store.getRewies[0]?.grade }}
          </span>
        <v-rating
          :modelValue="rating.grade"
          half-increments
          size="30"
          color="#FCC141"
        ></v-rating>
        <span
          class="text-body-small gray"
        >
          {{ `${rating.count_reviews} ${t('app.reviews')}` }}
        </span>
      </div>
      <v-skeleton-loader
        v-else
        type="text"
        class="skeleton"
      ></v-skeleton-loader>
    </div>
    <div class="rating-container__actions">
      <Button
        href="https://www.google.com/" 
        variant="secondary"
      >
      {{ t('app.button.review') }}
      </Button>
      <Button @click="isOpenDialog = true">
        {{ t('app.button.save') }}
      </Button>
      
    </div>
  </div>
  <!-- Обгорнув діалогове вікно в div v-if="isOpenDialog", щоб компонент не монтувався, коли вікно не відкрите -->
  <div v-if="isOpenDialog">
    <Dialog
      :isOpen="isOpenDialog"
      @close="isOpenDialog = false"
    >
      <template #title>
        {{ t('app.dialog.title') }}
      </template>
      <template #text>
        {{ t('app.dialog.text') }}
      </template>
    </Dialog>
  </div>
</template>


<style scoped lang="scss">
@use "@/assets/main.scss" as *;

.skeleton {
  width: 400px;

  @media (max-width: 900px) {
    width: 200px;
  }
}

.rating-container {
  background-color: $white;
  padding: 30px; 
  box-shadow: $box-shadow;
  border-radius: 8px;
  display: flex;
  align-items: center;

  @media (max-width: 750px) {
    flex-direction: column;
    gap: 20px;
  }

  &__body {
    display: flex;
    align-items: center;
    gap: 60px;

    @media (max-width: 1199px) {
      flex-direction: column;
      gap: 10px;
    }

    @media (max-width: 750px) {
      align-self: flex-start;
    }


    &__title {
      display: flex;
      gap: 20px;
      align-items: center;
    }

    &__rating {
      display: flex;
      gap: 20px;
      align-items: center;

      @media (max-width: 1199px) {
        align-self: flex-start;
      }

      @media (max-width: 576px) {
        gap: 6px;
        flex-wrap: wrap;
      }

    }
  }

  &__actions {
    display: flex;
    flex: 1;
    justify-content: flex-end;
    gap: 10px;

    @media (max-width: 750px) {
      width: 100%;
    }

    @media (max-width: 750px) {
      flex-direction: column;
    }
  }
}
</style>