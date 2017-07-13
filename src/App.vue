<template>
  <v-app dark>
    <v-navigation-drawer v-model="sideNav">
      <v-list>
        <v-list-tile>
          <v-list-tile-action>
            <v-icon left>add</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>CREATE</v-list-tile-content>
        </v-list-tile>
      </v-list>
      <v-list>
        <v-list-tile>
          <v-list-tile-action>
            <v-icon left>list</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>EVENTS</v-list-tile-content>
        </v-list-tile>
      </v-list>
      <v-list>
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
      <v-toolbar-title>
        <v-icon>event</v-icon>
        Eventer
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn flat>
          <v-icon left>add</v-icon>
          Create
        </v-btn>
        <v-btn flat>
          <v-icon left>list</v-icon>
          Events
        </v-btn>
        <v-btn flat>
          <v-icon left>person</v-icon>
          Profile
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
  
    <main>
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
      sideNav: false
    }
  }
}
</script>

<style lang="stylus">
  @import './stylus/main'
</style>
