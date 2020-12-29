import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'
import loading from '@/components/loading/loading'

library.add(fas)

const app = createApp(App)

app.component('awesome-icon', FontAwesomeIcon)

app.directive('loading', loading)

app.use(store).use(router)

app.mount('#app')
