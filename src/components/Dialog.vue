<script setup lang="ts">
import { useI18n } from 'vue-i18n'

// Отримуємо метод t для перекладів
const { t } = useI18n()

// Визначаємо властивості (props), які приймає компонент
defineProps<{
  isOpen: boolean
}>()

// Визначаємо події (emits), які компонент може викликати
const emit = defineEmits<{
  (e: 'close'): void
}>()

</script>

<template>
  <v-dialog
    max-width="500px"
    :model-value="isOpen"
    persistent
  >
    <v-card>
      <v-card-title>
        <h4 class="headline">
          <slot name="title"></slot>
        </h4>
      </v-card-title>

      <v-card-text>
        <p>
          <slot name="text"></slot>
        </p>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn
          color="red darken-1"
          variant="text"
          @click="emit('close')"
        >
          {{ t('app.dialog.button.close') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped>

</style>