import Vue from 'vue'
import Router from 'vue-router'
import SignIn from '@/components/user/Signin'
import SignUp from '@/components/user/Signup'
import Home from '@/components/Home'
import Create from '@/components/events/CreateEvent'
import Events from '@/components/events/AllEvents'
import Profile from '@/components/user/Profile'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/signin',
      component: SignIn
    },
    {
      path: '/signup',
      component: SignUp
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
