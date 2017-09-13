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
import Welcome from '@/components/user/profile/Welcome'
import firebase from 'firebase'
import { store } from '../store'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '*',
      redirect: '/signup'
    },
    {
      path: '/',
    //  beforeEnter: checkProfileLoaded,
      redirect: '/home',
      meta: {
        requiresAuth: true,
        requiresProfile: true
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
     // beforeEnter: checkProfileLoaded,
      component: Home,
      meta: {
        requiresAuth: true,
        requiresProfile: true
      }
    },
    {
      path: '/create',
      component: Create,
      meta: {
        requiresAuth: true,
        requiresProfile: true
      }
    },
    {
      path: '/events',
      component: Events,
      meta: {
        requiresAuth: true,
        requiresProfile: true
      }
    },
    {
      path: '/events/:id',
      props: true,
      component: Event,
      meta: {
        requiresAuth: true,
        requiresProfile: true
      }
    },
    {
      path: '/profile',
      component: Profile,
      meta: {
        requiresAuth: true,
        requiresProfile: true
      }
    },
    {
      path: '/welcome',
      component: Welcome,
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
  ]
  // ,
  // mode: 'history'
})

router.beforeEach((to, from, next) => {

  if(to.fullPath == '/home'){
  checkProfileLoaded(to, from, next)}
  let currentUser = firebase.auth().currentUser;
  //This will check if he is first time user with no profile created
  // let isFirstTimeUser = store.getters.getUser(currentUser == null ? currentUser : currentUser.uid) == undefined ? true : false
  let profile = store.getters.getUser(currentUser == null ? currentUser : currentUser.uid)
  let isFirstTimeUser = profile == undefined ? true : false
  let requiresAuth = to.matched.some(request => request.meta.requiresAuth);
  let requiresProfile = to.matched.some(request => request.meta.requiresProfile);

  console.log('In router')
  console.log((currentUser == null ? currentUser : currentUser.uid) + ' -Current User')
  console.log(profile, ' -User Profile Infoo')
  console.log(isFirstTimeUser + ' -isFirstTimeUser')
  console.log(requiresProfile + ' -RequireProfile')
  console.log(to.fullPath + ' -path')
  console.log(store.state._user, ' -State User Profile')
  console.log('out of router')

  if (requiresAuth && !currentUser) next('/signin')
  else if (currentUser && isFirstTimeUser && requiresProfile) next('/welcome')
  else if (!requiresAuth && currentUser && !isFirstTimeUser) next('/')
  else next()
})

const checkProfileLoaded = (to, from, next) => {
 var lenth =  store.state._user
 console.log(length, ' -state length')
 function proceed() {
    if (store.state._user.length != 0) {
      console.log('-------IN Check--------------')
      next()
    }
  }
  if (store.state._user.length == 0) { 
    console.log('-------IN watch--------------')
    store.watch(
      (state) => state._user,
      (value) => {
        if (value != 0) {
          console.log('-------Go to Proceed again--------------')
          proceed()
        }
      }
    )
  } else {
    proceed()
  }
}

export default router