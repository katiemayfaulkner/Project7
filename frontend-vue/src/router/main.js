import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Welcome from '../components/welcome.vue'
import Login from '../components/login.vue'
import Signup from '../components/signup.vue'
import Home from '../components/mainPage.vue'
import createPost from '../components/createPost.vue'
import viewProfile from '../components/viewProfile.vue'
import editProfile from '../components/editProfile.vue'

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  
  routes: [
    {
      path: '/',
      name: 'Welcome',
      component: Welcome
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/create-post',
      name: 'createPost',
      component: createPost
    },
    {
      path: '/profile',
      name: 'viewProfile',
      component: viewProfile
    },
    {
      path: '/edit-profile',
      name: 'editProfile',
      component: editProfile
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})