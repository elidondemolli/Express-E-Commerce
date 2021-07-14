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
// window.Broadcast = new Vue();

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

const store = new Vuex.Store({
  state: {
    user: null,
    authenticated: false,
  },
  getters: {
    user: (state) => {
      return state.user;
    },
    authenticated: (state) => {
      return state.authenticated;
    }
  },
  actions: {
    user(context, user) {
      context.commit('user', user);
    },
    authenticated(context, authenticated) {
      context.commit('authenticated', authenticated);
    }
  },
  mutations: {
    user(state, user) {
      state.user = user;
    },
    authenticated(state, authenticated) {
      state.authenticated = authenticated;
    },
  },
});

// window.Store = store;

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')

export default store