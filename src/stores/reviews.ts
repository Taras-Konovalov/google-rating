import { defineStore } from 'pinia'
import axios from 'axios'
import { API } from '@/enum/api'
import { useNotify } from '@/composables/useNotify'
import type { IReviewItem } from './models'
import { useI18n } from 'vue-i18n'

// Інтерфейс стану сховища
interface IStoreState {
  reviews: IReviewItem[]
  isLoading: boolean
}

export const useStore = defineStore('reviews', {
  state: (): IStoreState => {
    return {
      reviews: [], // Початковий пустий список відгуків
     isLoading: false // Початковий стан завантаження 
    }
  },
   // Гетери для доступу до стану
  getters: {
    // Повертає список відгуків
    getRewies(state) {
      return state.reviews
    },
     // Повертає стан завантаження
    getIsLoading(state){
      return state.isLoading
    }
  },
  // Дії для зміни стану або виконання асинхронних задач
  actions: {
    // Завантаження відгуків з сервера
    async loadReviews(): Promise<void> {
      const { notifySuccess, notifyError } = useNotify()
      this.setIsLoading(true)

      try {
        const response = await axios.get<IReviewItem[]>(API.BASE_URL)

        if (response.status === 200) {
          this.setReviews(response.data)
          notifySuccess('Відгуки успішно отримані')
          this.setIsLoading(false)
        }
      } catch (error) {
        notifyError('Сталась помилка')
      }
    },
    // Встановлення отриманих відгуків у стан
    setReviews(reviews: IReviewItem[]) {
      this.reviews = reviews
    },
    // Встановлення стану завантаження
    setIsLoading(flag: boolean) {
      this.isLoading = flag
    }
  },
})
