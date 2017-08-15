<template>
  <v-slide-x-transition>
    <v-container class="mt-3">
      <v-layout row wrap>
        <v-flex xs12 lg4 offset-lg4>
          <v-layout>
            <v-flex v-if="error">
              <app-alert @dismissed="onDismissed" :text="error.message"></app-alert>
            </v-flex>
          </v-layout>
          <v-card>
            <v-card-text>
              <v-layout row>
                <v-flex>
                  <h5 class="white--text">
                    <b>Login</b>
                  </h5>
                </v-flex>
              </v-layout>
              <v-layout row>
                <v-flex>
                  <form @submit.prevent="onLogin">
                    <v-layout row>
                      <v-flex>
                        <v-text-field name="email" type="email" label="Email Address" id="email" v-model="email" required></v-text-field>
                      </v-flex>
                    </v-layout>
                    <v-layout row>
                      <v-flex>
                        <v-text-field name="password" type="password" label="Password" id="password" v-model="password" required></v-text-field>
                      </v-flex>
                    </v-layout>
                    <v-layout row>
                      <v-flex>
                        <v-spacer></v-spacer>
                        <v-btn type="submit" :disabled="!loginFormIsValid">Login</v-btn>
                      </v-flex>
                    </v-layout>
                  </form>
                </v-flex>
              </v-layout>
            </v-card-text>
          </v-card>
          <br>
          <v-divider></v-divider>
          <br>
          <v-card>
            <v-card-text>
              New to Eventer?
              <v-btn class="primary white--text" to='/signup'>Create new account!</v-btn>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
      <v-layout>
        <v-flex>
          <v-dialog v-model="isLoading" persistent>
            <v-progress-circular v-if="isLoading" indeterminate v-bind:size="75" class="primary--text"></v-progress-circular>
          </v-dialog>
        </v-flex>
      </v-layout>
    </v-container>
  </v-slide-x-transition>
</template>

<script>
import firebase from 'firebase'
export default {
  data() {
    return {
      email: '',
      password: ''
    }
  },
  computed: {
    loginFormIsValid() {
      return this.email != '' &&
        this.password != ''
    },
    isUserAuthenticated() {
      return this.$store.getters.getFirebaseUser
    },
    isLoading() {
      return this.$store.getters.getIsLoading
    },
    error() {
      var test = this.$store.getters.getError
      return test
    }
  },
  watch: {
    isUserAuthenticated(value) {
      if (value != null)
        this.$router.push('/')
    }
  },
  methods: {
    onLogin() {
      this.$store.dispatch('signInUser', { email: this.email, password: this.password })
    },
    onDismissed() {
      console.log('dismissed !!!')
      this.$store.dispatch('clearError')
    }
  }
}
</script>

<style lang="stylus" scoped>
  .progress-circular
    margin: 1rem
</style>

