<template>
  <v-slide-x-transition>
    <v-container class="mt-3">
      <v-layout row>
        <v-flex xs12 lg8 offset-lg2>
          <v-btn to='/profile/update'>Update Profile</v-btn>
        </v-flex>
      </v-layout>
      <v-layout row>
        <v-flex xs12 lg8 offset-lg2 v-if="userProfile !== undefined">
          <v-card>
            <v-card-media :src="userProfile.profilePic" height="300px">
              <v-layout column class="media">
                <v-spacer></v-spacer>
                <v-card-title class="white--text pl-5 pt-5">
                  <div class="display-1">{{userProfile.firstName}} {{userProfile.lastName}}</div>
                </v-card-title>
              </v-layout>
            </v-card-media>
          </v-card>
          <v-list two-line>
            <v-list-tile v-show="userProfile.dob !==''">
              <v-list-tile-action>
                <v-icon class="primary--text">calendar_today</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>{{userProfile.dob}}</v-list-tile-title>
                <v-list-tile-sub-title>Date Of Birth</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-divider inset></v-divider>
            <v-list-tile>
              <v-list-tile-action>
                <v-icon class="primary--text">phone</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>{{userProfile.phone}}</v-list-tile-title>
                <v-list-tile-sub-title>Mobile</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile v-show="userProfile.workPhone !== ''">
              <v-list-tile-action></v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>{{userProfile.workPhone}}</v-list-tile-title>
                <v-list-tile-sub-title>Work</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-divider inset></v-divider>
            <v-list-tile>
              <v-list-tile-action>
                <v-icon class="primary--text">mail</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>{{userProfile.email}}</v-list-tile-title>
                <v-list-tile-sub-title>Personal Email</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile v-show="userProfile.workEmail !== ''">
              <v-list-tile-action></v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>{{userProfile.workEmail}}</v-list-tile-title>
                <v-list-tile-sub-title>Work Email</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-divider inset></v-divider>
            <v-list-tile>
              <v-list-tile-action>
                <v-icon class="primary--text">location_on</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>{{userProfile.street}} {{userProfile.apt}}</v-list-tile-title>
                <v-list-tile-sub-title>{{userProfile.city}}, {{userProfile.state}} {{userProfile.zipcode}}</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-flex>
      </v-layout>
    </v-container>
  </v-slide-x-transition>
</template>

<script>
export default {
  created() {
    this.$store.dispatch('getUserProfile')
  },
  computed: {
    userProfile() {
      var loggedInUser = this.$store.getters.getFirebaseUser.userId
      var test = this.$store.getters.getUser(loggedInUser)
      console.log(test)
      return test
    }
  }
}
</script>

<style lang="stylus">
  .media
    height: 100%
    margin: 0
</style>

