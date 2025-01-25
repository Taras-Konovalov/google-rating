<script setup lang="ts">
import { computed, ref } from 'vue';

// Визначаємо властивості (props) з їхніми типовими значеннями
const props = withDefaults(defineProps<{
  variant?: 'primary' | 'secondary',  // Можливі варіанти стилів кнопки
  href?: string // URL, якщо кнопка є посиланням
}>(), {
  variant: 'primary', 
  href: '',
})

// Визначаємо події (emits), які компонент може викликати
const emits = defineEmits<{
  (e: 'click'): void
}>()

// Обчислюваний об'єкт для визначення класів кнопки залежно від варіанта стилю
const buttonClasses = computed(() => ({
  primary: props.variant === 'primary',
  secondary: props.variant === 'secondary',
}));
</script>

<template>
  <a
    v-if="href"
    :href="href"
    target="_blank"
    class="btn text-body-small"
    :class="buttonClasses"
  >
    <slot></slot>
  </a>
  <button
    v-else
    class="btn text-body-small"
    :class="buttonClasses"
    @click="emits('click')"
  >
    <slot></slot>
  </button>
</template>

<style scoped lang="scss">
@use '@/assets/main.scss' as *;

.primary {
  padding: 11px 20px;
  color: $white;
  background: linear-gradient(90.66deg, $green 0.57%, #1786AC 99.43%);

  &:hover {
    background: $green;
  }
}

.secondary {
  padding: 11px 20px;
  color: $black;
  background: linear-gradient(90deg, #E6F7F5 0%, #F8FCFC 100%);
  transition: all 0.3s ease-in-out;
  border: 1px solid #BDE1E0;

  &:hover {
    background: $green;
    color: $white;
    border: 1px solid transparent;
  }

}
</style>