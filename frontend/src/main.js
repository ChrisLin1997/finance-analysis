import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import loading from '@/components/loading/loading'
import '@/assets/scss/index.scss'
import './assets/tailwind.css'

library.add(fas)
library.add(fab)

const app = createApp(App)

app.component('awesome-icon', FontAwesomeIcon)

app.directive('loading', loading)

app.use(router)

app.mount('#app')
