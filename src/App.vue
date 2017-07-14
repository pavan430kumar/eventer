<template>
  <v-app dark standalone>
    <v-navigation-drawer temporary v-model="sideNav">
      <v-list @click.native="goToCreate">
        <v-list-tile>
          <v-list-tile-action>
            <v-icon left>add</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>CREATE</v-list-tile-content>
        </v-list-tile>
      </v-list>
      <v-list @click.native="goToEvents">
        <v-list-tile>
          <v-list-tile-action>
            <v-icon left>list</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>EVENTS</v-list-tile-content>
        </v-list-tile>
      </v-list>
      <v-list @click.native="goToProfile">
        <v-list-tile>
          <v-list-tile-action>
            <v-icon left>person</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>PROFILE</v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
  
    <v-toolbar>
      <v-toolbar-side-icon @click.native.stop="sideNav =! sideNav" class="hidden-sm-and-up"></v-toolbar-side-icon>
      <v-toolbar-title style="cursor: pointer" @click="goToHome">
        <v-icon>event</v-icon>
        Eventer
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn flat @click.native="goToCreate">
          <v-icon left>add</v-icon>
          Create
        </v-btn>
        <v-btn flat @click.native="goToEvents">
          <v-icon left>list</v-icon>
          Events
        </v-btn>
        <v-btn flat @click.native="goToProfile">
          <v-icon left>person</v-icon>
          Profile
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
  
    <main>
      <router-view></router-view>
    </main>
    <v-footer :absolute="true" class="pa-3">
      <v-spacer></v-spacer>
      <div>Ception Inc. © {{ new Date().getFullYear() }}</div>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      sideNav: null
    }
  },
  methods: {
    goToProfile () {
      this.$router.push('/profile')
    },
    goToCreate () {
      this.$router.push('/create')
    },
    goToEvents () {
      this.$router.push('/events')
    },
    goToHome () {
      this.$router.push('/')
    }
  }
}
</script>

<style lang="stylus">
  @import './stylus/main'
</style>
