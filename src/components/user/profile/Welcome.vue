<template>
    <v-slide-x-transition>
        <v-container class="mt-3">
            <v-layout row>
                <v-flex xs12 sm12 md8 lg6 xl6 offset-xl3 offset-lg3 offset-md2>
                    <v-card>
                        <v-card-media src="http://www.fonixevents.com/images/Slider3.jpg" height="200px">
                            <v-container fill-height fluid>
                                <v-layout fill-height>
                                    <v-flex xs12 align-end flexbox>
                                        <div class="headline">Welcome to Eventer!</div>
                                    </v-flex>
                                </v-layout>
                            </v-container>
                        </v-card-media>
                        <v-card-title primary-title>
                            <div>
                                <div class="headline">Create your profile </div>
                                <span class="grey--text">To explore 1,000's of events</span>
                            </div>
                        </v-card-title>
                        <v-card-actions>
                            <v-btn primary to="/profile/update">Proceed</v-btn>
                        </v-card-actions>
                    </v-card>
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
    mounted(){
        if(this.userProfile !== undefined)
        this.$router.push('/profile')
    },
    computed: {
        userProfile() {
            var loggedInUser = this.$store.getters.getFirebaseUser.userId
            return this.$store.getters.getUser(loggedInUser)
        }
    }
}
</script>

<style lang="stylus">
  .media
    height: 100%
    margin: 0
</style>