import Vue from 'vue'
import Router from 'vue-router'
import SignIn from '@/components/user/Signin'
import SignUp from '@/components/user/Signup'
import Home from '@/components/Home'
import Create from '@/components/events/CreateEvent'
import Events from '@/components/events/AllEvents'
import Profile from '@/components/user/profile/Profile'
import Event from '@/components/events/Event'
import UpdateProfile from '@/components/user/profile/UpdateProfile'
import firebase from 'firebase'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '*',
      redirect: '/signup'
    },
    {
      path: '/',
      redirect: '/home',
      meta: {
        requiresAuth: true
      }
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
      path: '/home',
      component: Home,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/create',
      component: Create,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/events',
      component: Events,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/events/:id',
      props: true,
      component: Event,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/profile',
      component: Profile,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/profile/update',
      component: UpdateProfile,
      meta: {
        requiresAuth: true
      }
    }
  ],
  mode: 'history'
})

router.beforeEach((to, from, next) => {

  let currentUser = firebase.auth().currentUser;
  let requiresAuth = to.matched.some(request => request.meta.requiresAuth);

  if (requiresAuth && !currentUser) next('/signin')
  else if (!requiresAuth && currentUser) next('/home')
  else next()
})

export default router