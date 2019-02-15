import Vue from 'vue'
import VueRouter from 'vue-router'

import WelcomePage from './components/welcome/welcome.vue'
import SignupPage from './components/auth/signup.vue'
import SigninPage from './components/auth/signin.vue'
import BookmarkPage from './components/bookmarks.vue'
Vue.use(VueRouter)

const routes = [
  { 
    path: '/', 
    component: WelcomePage 
  },
  { 
    path: '/signup', 
    component: SignupPage 
  },
  { 
    path: '/signin', 
    name: 'signin', 
    component: SigninPage,
  },
  { 
    path: '/bookmaks', 
    name: 'bookmarks', 
    component:BookmarkPage,
  },
  
]

export default new VueRouter({mode: 'history', routes})