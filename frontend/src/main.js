import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import router from './router'
import { BootstrapVue, IconsPlugin} from 'bootstrap-vue'
import axios from 'axios';
axios.defaults.headers.common['x-auth-token'] = localStorage.getItem('token');
console.log(axios.defaults.headers.common['x-auth-token'])

Vue.config.productionTip = false
Vue.use(Vuex)

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

const store = new Vuex.Store({
  state: {
    user: null,
  },
  getters: {
    user: (state) => {
      return state.user;
    }
  },
  actions: {
    user(context, user) {
      context.commit('user', user);
    }
  },
  mutations: {
    user(state, user) {
      state.user = user;
    }
  },
});

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
