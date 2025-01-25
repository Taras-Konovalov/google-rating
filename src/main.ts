import './assets/main.scss'
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Notifications from '@kyvg/vue3-notification'
import App from './App.vue'
import { createVuetify } from 'vuetify'
import router from './router'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import { i18n } from '@/modules/i18n'

import Google from './components/svg/Google.vue'
import Button from './components/ui/Button.vue'
import Dialog from './components/Dialog.vue'
import TheNotifications from './components/TheNotifications.vue'
import Rating from './components/Rating.vue'
import TranslateMenu from './components/TranslateMenu.vue'

const vuetify = createVuetify({
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
})

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(vuetify)
app.use(Notifications)
app.use(i18n)
app.component('GoogleIcon', Google)
app.component('Button', Button)
app.component('Dialog', Dialog)
app.component('TheNotifications', TheNotifications)
app.component('Rating', Rating)
app.component('TranslateMenu', TranslateMenu)
app.mount('#app')
