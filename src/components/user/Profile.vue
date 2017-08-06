<template>
  <v-slide-x-transition>
    <v-container class="mt-3">
      <v-layout row>
        <v-flex xs12 lg8 offset-lg2>
          <v-card>
            <v-btn to='/editprofile'>Edit Profile</v-btn>
            <v-card-media :src="profileImage" height="300px">
              <v-layout column class="media">
                <v-spacer></v-spacer>
                <v-card-title class="white--text pl-5 pt-5">
                  <div class="display-1">Pavan Kumar</div>
                </v-card-title>
              </v-layout>
            </v-card-media>
          </v-card>
          <v-list two-line>
            <v-list-tile>
              <v-list-tile-action>
                <v-icon class="primary--text">phone</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>{{phoneNo}}</v-list-tile-title>
                <v-list-tile-sub-title>Contact Number</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-divider inset></v-divider>
            <v-list-tile>
              <v-list-tile-action>
                <v-icon class="primary--text">mail</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>{{emailId}}</v-list-tile-title>
                <v-list-tile-sub-title>Email Address</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-divider inset></v-divider>
            <v-list-tile>
              <v-list-tile-action>
                <v-icon class="primary--text">location_on</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>{{Street}}</v-list-tile-title>
                <v-list-tile-sub-title>{{City}}, {{State}} {{Zipcode}}</v-list-tile-sub-title>
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
  data() {
    return {
      profileImage: 'https://s-media-cache-ak0.pinimg.com/originals/5e/f4/79/5ef47920fc689db66b4c69be072771b6.jpg',
      phoneNo: '(650) 555-1234',
      emailId: 'eventeradmin@example.com',
      Street: '1400 Main Street',
      City: 'Orlando',
      State: 'FL',
      Zipcode: '79938'
    }
  }
}
</script>

<style lang="stylus">
  .media
    height: 100%
    margin: 0
</style>

