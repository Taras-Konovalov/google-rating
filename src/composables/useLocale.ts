import { useLocalStorage, useToggle } from '@vueuse/core'
import type { Ref } from 'vue'
import { useI18n } from 'vue-i18n'

// Опис інтерфейсу для локалізаційної
export interface LocaleComposition {
  currentLocale: Ref<string>
  changeLocale: (loc: string) => void
  availableLocales: string[]
  getLocaleName: (loc: string) => string
}

// Функція для роботи з локалями
export function useLocale(): LocaleComposition {
  // Збереження поточної локалі в localStorage
  const currentLocale = useLocalStorage('locale', 'en')
  // Отримуємо доступ до локалізації через vue-i18n
  const { availableLocales, locale } = useI18n()

  // Функція для зміни локалі
  const changeLocale = (loc: string) => {
     // Зміна поточної локалі та оновлення vue-i18n
    useToggle(currentLocale)(loc)
    locale.value = loc
  }

  // Функція для отримання назви локалі
  const getLocaleName = (loc: string) => {
    switch (loc) {
      case 'en':
        return 'English'
      case 'uk':
        return 'Українська'
      default:
        return loc
    }
  }

   // Повертаємо об'єкт з усіма необхідними властивостями та методами
  return {
    currentLocale,
    changeLocale,
    availableLocales,
    getLocaleName,
  }
}
