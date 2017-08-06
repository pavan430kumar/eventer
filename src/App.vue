<template>
  <v-app dark standalone>
    <v-navigation-drawer temporary v-model="sideNav">
      <v-list>
        <v-list-tile v-for="item in inAppMenuItems" :key="item.title" :to="item.link">
          <v-list-tile-action>
            <v-icon left>{{item.icon}}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>{{item.title}}</v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
  
    <v-toolbar>
      <v-toolbar-side-icon @click.stop="sideNav =! sideNav" class="hidden-sm-and-up"></v-toolbar-side-icon>
      <v-toolbar-title style="cursor: pointer" @click="goToHome">
        <v-icon>event</v-icon>
        Eventer
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn flat v-for="item in outOfAppMenuItems" :key="item.title" :to="item.link" v-show="!isUserLoggedIn">
          <v-icon left>{{item.icon}}</v-icon>
          {{item.title}}
        </v-btn>
        <v-btn flat v-for="item in inAppMenuItems" :key="item.title" :to="item.link" v-show="isUserLoggedIn">
          <v-icon left>{{item.icon}}</v-icon>
          {{item.title}}
        </v-btn>
        <v-btn flat @click="signOut" v-show="isUserLoggedIn">
          <v-icon left>lock_outline</v-icon>
          Sign Out
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
  
    <main>
      <router-view></router-view>
    </main>
    <v-footer class="pa-3">
      <v-spacer></v-spacer>
      <div>Ception Inc. © {{ new Date().getFullYear() }}</div>
    </v-footer>
  </v-app>
</template>

<script>
import firebase from 'firebase'
export default {
  data() {
    return {
      sideNav: false,
      inAppMenuItems: [
        { icon: 'list', title: 'All Events', link: '/events' },
        { icon: 'add', title: 'Create Event', link: '/create' },
        { icon: 'person', title: 'Profile', link: '/profile' }
      ],
      outOfAppMenuItems: [
        { icon: 'face', title: 'Sign Up', link: '/signup' },
        { icon: 'lock_open', title: 'Sign In', link: '/signin' }
      ]
    }
  },
  computed: {
    isUserLoggedIn() {
      var user = firebase.auth().currentUser
      console.log(user)

      return user != null ? true : false
    }
  },
  methods: {
    goToHome() {
      this.$router.push('/')
    },
    signOut() {
      firebase.auth().signOut().then(() => {
        this.$router.push('/signin')
      }
      )
    }
  }
}
</script>

<style lang="stylus">
  @import './stylus/main'
</style>
