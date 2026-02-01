import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'

//  Bootstrap (CSS first, then JS)
 import 'bootstrap/dist/css/bootstrap.min.css'
 import 'bootstrap/dist/js/bootstrap.bundle.min.js'

//  Icons (optional)
import 'bootstrap-icons/font/bootstrap-icons.css'
// OR Font Awesome (recommended)
// import '@fortawesome/fontawesome-free/css/all.min.css'

//  AdminLTE (CSS first, then JS)
// import 'admin-lte/dist/js/adminlte.min.js'
import 'admin-lte/dist/css/adminlte.min.css'
// import 'admin-lte/dist/css/adminlte.css'
import 'admin-lte/dist/js/adminlte.min.js'

const app = createApp(App)
const pinia = createPinia()
app.use(pinia)
app.use(router)
app.mount('#app')
