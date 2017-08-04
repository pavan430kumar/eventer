<template>
  <v-slide-x-transition>
    <v-container class="mt-3">
      <v-card>
        <v-card-text>
          <v-layout row>
            <v-flex xs12 sm6 lg6 offset-sm3>
              <h4 class="white--text">Create New Event</h4>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12>
              <form @submit.prevent="onFormSubmit">
                <v-layout row>
                  <v-flex xs12 sm6 lg6  offset-sm3 offset-lg3>
                    <v-text-field name="title" label="Title" id="title" v-model="title" prepend-icon="flag" required></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12 sm6 offset-sm3>
                    <v-text-field name="location" label="Location" id="location" v-model="location" prepend-icon="map" required></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12 sm6 offset-sm3>
                    <v-menu lazy :close-on-content-click="false" v-model="menuDate" transition="scale-transition" full-width offset-y :nudge-left="40" max-width="290px">
                      <v-text-field slot="activator" label="Pick Event Date" v-model="date" prepend-icon="event" readonly required></v-text-field>
                      <v-date-picker v-model="date" dark actions>
                        <template scope="{ save, cancel }">
                          <v-card-actions>
                            <v-btn flat primary @click.native="cancel()">Cancel</v-btn>
                            <v-btn flat primary @click.native="save()">Save</v-btn>
                          </v-card-actions>
                        </template>
                      </v-date-picker>
                    </v-menu>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12 sm6 offset-sm3>
                    <v-menu lazy :close-on-content-click="false" v-model="menuTime" transition="scale-transition" full-width offset-y :nudge-left="40" max-width="290px">
                      <v-text-field slot="activator" label="Pick Event Time" v-model="time" prepend-icon="access_time" readonly required></v-text-field>
                      <v-time-picker v-model="time" dark actions>
                        <template scope="{ save, cancel }">
                          <v-card-actions>
                            <v-btn flat primary @click.native="cancel()">Cancel</v-btn>
                            <v-btn flat primary @click.native="save()">Save</v-btn>
                          </v-card-actions>
                        </template>
                      </v-time-picker>
                    </v-menu>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12 sm6 offset-sm3>
                    <v-text-field name="imageUrl" label="ImageUrl" id="imageUrl" v-model="imageUrl" prepend-icon="image" required></v-text-field>
                    <!-- <div>
                      <img :src="imageUrl" height="200" width="270">
                    </div> -->
                  </v-flex>
                </v-layout>
                 <v-layout row>
                  <v-flex xs12 lg4 offset-lg4 >
                    <div v-show="imageUrl !== ''">
                      <img :src="imageUrl" height="200" width="270">
                    </div>
                  </v-flex>
                </v-layout> 
                <v-layout row>
                  <v-flex xs12 sm6 offset-sm3>
                    <v-text-field name="description" label="Description" id="description" v-model="description" multi-line prepend-icon="comment" required ></v-text-field>
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
        </v-card-text>
      </v-card>
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
      description: '',
      date: null,
      time: null,
      menuDate: false,
      menuTime: false
    }
  },
  computed: {
    formIsValid() {
      return this.title !== '' &&
        this.location !== '' &&
        this.imageUrl !== '' &&
        this.description !== '' &&
        this.date != null &&
        this.time != null
    }
  },
  methods: {
    onFormSubmit() {
      if (!this.formIsValid) {
        return
      }
      const eventData = {
        title: this.title,
        description: this.description,
        imageUrl: this.imageUrl,
        location: this.location,
      }
      this.$store.dispatch('createEvent', eventData)
      this.$router.push('/events')
    }
  }
}
</script>

