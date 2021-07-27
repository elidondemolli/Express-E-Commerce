import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { BootstrapVue, IconsPlugin} from 'bootstrap-vue'
import VueSweetalert2 from 'vue-sweetalert2';
import Vuelidate from 'vuelidate'
import store from './store/store'
import axios from 'axios';
axios.defaults.headers.common['x-auth-token'] = localStorage.getItem('token');
console.log(axios.defaults.headers.common['x-auth-token'])

Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueSweetalert2)
Vue.use(Vuelidate)

import 'sweetalert2/dist/sweetalert2.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')