<template>
   <v-app dark standalone> 
    <v-navigation-drawer temporary v-model="sideNav">
      <v-list>
        <v-list-tile v-for="item in menuItems" :key="item.title" :to="item.link">
          <v-list-tile-action>
            <v-icon left>{{item.icon}}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>{{item.title}}</v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="signOut" v-show="isUserLoggedIn">
          <v-list-tile-action>
          <v-icon left>lock_outline</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>Sign Out</v-list-tile-content>
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
        <v-btn flat v-for="item in menuItems" :key="item.title" :to="item.link">
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
import * as firebase from 'firebase'
export default {
  data() {
    return {
      sideNav: false
    }
  },
  computed: {
    menuItems() {
      let menuItems = []
      if (!this.isUserLoggedIn) {
        menuItems = [
          { icon: 'face', title: 'Sign Up', link: '/signup' },
          { icon: 'lock_open', title: 'Sign In', link: '/signin' }
        ]
      }
      if (this.isUserLoggedIn) {
        menuItems = [
          { icon: 'list', title: 'All Events', link: '/events' },
          { icon: 'add', title: 'Create Event', link: '/create' },
          { icon: 'person', title: 'Profile', link: '/profile' }
        ]
      }
      return menuItems
    },
    isUserLoggedIn() {
      var test = this.$store.getters.getFirebaseUser
      return test !== null && test !== undefined
    }
  },
  methods: {
    goToHome() {
      this.$router.push('/')
    },
    signOut() {
      this.$store.dispatch('signOutUser')
    }
  }
}
</script>

<style lang="stylus">
  @import './stylus/main'
</style>
