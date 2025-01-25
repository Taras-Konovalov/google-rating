import { useLocalStorage } from '@vueuse/core'
import { createI18n } from 'vue-i18n'
import { set } from 'lodash-es'

type Recordable<T = any> = Record<string, T>

// Динамічне імпортування файлів перекладів для англійської мови
const modulesEn = import.meta.glob('../../locales/en/**/*.json', { eager: true })
// Динамічне імпортування файлів перекладів для української мови
const modulesUk = import.meta.glob('../../locales/uk/**/*.json', { eager: true })

// Отримання поточної мови інтерфейсу з localStorage або використання значення за замовчуванням ('en')
const currentLocale = useLocalStorage('locale', 'en')

// Ініціалізація i18n
export const i18n = createI18n({
  legacy: false, // Використання Composition API замість Options API
  locale: currentLocale.value || 'en',  // Встановлення поточної мови
  fallbackLocale: 'en', // Резервна мова у випадку відсутності перекладу
  useScope: 'global', // Глобальний доступ до i18n
  globalInjection: true, // Дозволяє використовувати $t і $i18n без імпорту
  messages: {
    en: genMessage(modulesEn, 'en'), // Генерація повідомлень для англійської мови
    uk: genMessage(modulesUk, 'uk'), // Генерація повідомлень для української мови
  }, 
})

// Функція для генерації структури перекладів на основі файлів
export function genMessage(langs: Record<string, any>, prefix = 'lang') {
  const obj: Recordable = {}

  // Обробка кожного імпортованого модуля
  Object.keys(langs).forEach((key) => {
    const langFileModule = langs[key].default // Отримання вмісту файлу перекладу
    let fileName = key.replace(`../../locales/${prefix}/`, '').replace(/^\.\//, '') // Видалення зайвого шляху
    const lastIndex = fileName.lastIndexOf('.') // Пошук останньої крапки у назві файлу
    fileName = fileName.substring(0, lastIndex) // Видалення розширення файлу
    const keyList = fileName.split('/') // Розбиття шляху на частини
    const moduleName = keyList.shift() // Витяг першої частини шляху (назва модуля)
    const objKey = keyList.join('.') // Формування ключа для вкладеної структури

    if (moduleName) {
      if (objKey) {
         // Якщо є вкладені ключі, створюємо вкладену структуру
        set(obj, moduleName, obj[moduleName] || {})
        set(obj[moduleName], objKey, langFileModule)
      }
      else {
        // Якщо ключ один, додаємо модуль напряму
        set(obj, moduleName, langFileModule || {})
      }
    }
  })
  // Повертаємо готову структуру
  return obj
}