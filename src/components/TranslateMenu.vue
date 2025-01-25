<script setup lang="ts">
import { useLocale } from '@/composables/useLocale';

const { availableLocales, changeLocale, getLocaleName, currentLocale } = useLocale()
</script>

<template>
  <v-menu
    location="top end"
    rounded
    offset="16"
    internal-activator
  >
    <template #activator="{ props }">
      <v-btn
        class="mr-1"
        append-icon="mdi-chevron-down"
        v-bind="props"
      >
        <span class="mr-2">{{ currentLocale }}</span>
        <v-icon>mdi-translate</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-list
        density="compact"
      >
        <v-list-item
          v-for="locale in availableLocales"
          :key="locale"
          @click="changeLocale(locale)"
        >
          <v-list-item-title class="text-caption">
            {{ getLocaleName(locale) }}
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-card>
  </v-menu>
</template>
