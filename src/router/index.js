import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Roll from '@/components/Carousel'
import Create from '@/components/Create'
import Events from '@/components/Events'
import Profile from '@/components/Profile'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Roll
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/create',
      component: Create
    },
    {
      path: '/events',
      component: Events
    },
    {
      path: '/profile',
      component: Profile
    }
  ],
  mode: 'history'
})
