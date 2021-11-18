import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import QR from '../views/QR.vue'
import AddPost from '../views/AddPost.vue'
import EditPost from '../views/EditPost.vue'
import Shop from '../views/Shop.vue'
import Product from '../views/Product.vue'
import SearchPost from '../views/SearchPost.vue'
import ContactUs from '../views/ContactUs.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import ForgotPassword from '../views/ForgotPassword.vue'
import ResetPassword from '../views/ResetPassword.vue'
import Dashboard from '../views/Dashboard.vue'
import EditUser from '../views/EditUser.vue'
import ShoppingCart from '../views/ShoppingCart.vue'

import { getUserById } from '../api/user'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/discount/:id',
    name: 'QR',
    component: QR
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    beforeEnter: (to, from, next) => {
      if(!localStorage.getItem('token')){
        next();
      } else {
        next("/");
      }
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    beforeEnter: (to, from, next) => {
      if(!localStorage.getItem('token')){
        next();
      } else {
        next("/");
      }
    }
  },
  {
    path: '/forgot-password',
    name: 'ForgotPassword',
    component: ForgotPassword,
    beforeEnter: (to, from, next) => {
      if(!localStorage.getItem('token')){
        next();
      } else {
        next("/");
      }
    }
  },
  {
    path: '/reset-password/:token',
    name: 'ResetPassword',
    component: ResetPassword,
    beforeEnter: (to, from, next) => {
      if(!localStorage.getItem('token')){
        next();
      } else {
        next("/");
      }
    }
  },
  {
    path: '/add-post',
    name: 'Add-post',
    component: AddPost,
    beforeEnter: async (to, from, next) => {
      if(localStorage.getItem('id')){
        const result = await getUserById(localStorage.getItem('id'));
        if(result.role == 'Admin' && localStorage.getItem('token')){
          next();
        } else {
          next("/");
        }
      } else {
        next("/");
      }
    }
  },
  {
    path: '/edit-post/:id',
    name: 'Edit-post',
    component: EditPost,
    beforeEnter: async (to, from, next) => {
      if(localStorage.getItem('id')){
        const result = await getUserById(localStorage.getItem('id'));
        if(result.role == 'Admin' && localStorage.getItem('token')){
          next();
        } else {
          next("/");
        }
      } else {
        next("/");
      }
    }
  },
  {
    path: '/cart',
    name: 'ShoppingCart',
    component: ShoppingCart,
  },
  {
    path: '/search',
    name: 'SearchPost',
    component: SearchPost
  },
  {
    path: '/product/:id',
    name: 'Product',
    component: Product,
  },
  {
    path: '/contact',
    name: 'Contact',
    component: ContactUs
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    beforeEnter: async (to, from, next) => {
      if(localStorage.getItem('id')){
        const result = await getUserById(localStorage.getItem('id'));
        if(result.role == 'Admin' && localStorage.getItem('token')){
          next();
        } else {
          next("/");
        }
      } else {
        next("/");
      }
    }
  },
  {
    path: '/edit-user/:id',
    name: 'EditUser',
    component: EditUser,
    beforeEnter: async (to, from, next) => {
      if(localStorage.getItem('id')){
        const result = await getUserById(localStorage.getItem('id'));
        if(result.role == 'Admin' && localStorage.getItem('token')){
          next();
        } else {
          next("/");
        }
      } else {
        next("/");
      }
    }
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 };
  }
})

export default router
