import Vue from 'vue'
import Router from 'vue-router'
import SignIn from '@/components/Signin'
import SignUp from '@/components/Signup'
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
