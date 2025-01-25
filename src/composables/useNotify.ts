import { useNotification } from '@kyvg/vue3-notification'

const { notify } = useNotification()

// Інтерфейс для композиції повідомлень
export interface NotifyComposition {
  notifySuccess: (text: string, duration?: number) => void
  notifyError: (text: string, duration?: number) => void
  notifyWarning: (text: string, duration?: number) => void
  notifyInfo: (text: string, duration?: number) => void
}

// Функція для роботи з повідомленнями
export function useNotify(): NotifyComposition {
  // Функція для показу повідомлення про успіх
  const notifySuccess = (text: string, duration?: number) => {
    notify({
      type: 'success',
      title: 'Success',
      text,
      duration,
    })
  }

   // Функція для показу повідомлення про помилку
  const notifyError = (text: string, duration?: number) => {
    notify({
      type: 'error',
      title: 'Error',
      text,
      duration,
    })
  }

   // Функція для показу інформаційного повідомлення
  const notifyWarning = (text: string, duration?: number) => {
    notify({
      type: 'warn',
      title: 'Warn',
      text,
      duration,
    })
  }

  const notifyInfo = (text: string, duration?: number) => {
    notify({
      type: 'info',
      title: 'Info',
      text,
      duration,
    })
  }

  // Повертаємо об'єкт з усіма методами для повідомлень
  return {
    notifySuccess,
    notifyError,
    notifyWarning,
    notifyInfo,
  }
}
