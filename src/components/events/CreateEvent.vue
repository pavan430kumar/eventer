<template>
  <v-slide-x-transition>
    <v-container class="mt-3">
      <v-layout row>
        <v-flex xs12 sm6 lg6 offset-sm3>
          <h4 class="white--text">Create New Event</h4>
        </v-flex>
      </v-layout>
      <v-layout row>
        <v-flex xs12>
          <form @submit.prevent="onFormSubmit">
            <v-layout row>
              <v-flex xs12 sm6 offset-sm3>
                <v-text-field name="title" label="Title" id="title" v-model="title" required></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex xs12 sm6 offset-sm3>
                <v-text-field name="location" label="Location" id="location" v-model="location" required></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex xs12 sm6 offset-sm3>
                <v-text-field name="imageUrl" label="ImageUrl" id="imageUrl" v-model="imageUrl" required></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex xs12 sm6 offset-sm3>
                <img :src="imageUrl" height="200">
              </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex xs12 sm6 offset-sm3>
                <v-text-field name="description" label="Description" id="description" v-model="description" multi-line required></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex xs12 sm6 lg6 offset-sm3>
                <v-btn :disabled="!formIsValid" type="submit">Create Event</v-btn>
              </v-flex>
            </v-layout>
          </form>
        </v-flex>
      </v-layout>
    </v-container>
  </v-slide-x-transition>
</template>

<script>
export default {
  data() {
    return {
      title: '',
      location: '',
      imageUrl: '',
      description: ''
    }
  },
  computed: {
    formIsValid() {
      return this.title !== '' &&
        this.location !== '' &&
        this.imageUrl !== '' &&
        this.description !== ''
    }
  },
  methods: {
    onFormSubmit(){
      // if(!formIsValid){
      //   return
      // }
      const eventData = {
        title : this.title,
        description : this.description,
        imageUrl : this.imageUrl,
        location : this.location,
      }
      this.$store.dispatch('createEvent', eventData)
      this.$router.push('/events')
    }
  }
}
</script>

