<template>
  <v-slide-x-transition>
    <v-container class="mt-3">
      <v-layout row>
        <v-flex xs12 lg8 offset-lg2>
          <v-card>
            <v-card-text>
              <v-layout row>
                <v-flex xs12 sm6 lg6 offset-sm3>
                  <div class="white--text display-1">Create New Event</div>
                  <br>
                </v-flex>
              </v-layout>
              <v-layout row>
                <v-flex xs12>
                  <form @submit.prevent="onFormSubmit">
                    <v-layout row>
                      <v-flex xs12 sm6 lg6 offset-sm3 offset-lg3>
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
                                <v-btn flat primary @click="cancel()">Cancel</v-btn>
                                <v-btn flat primary @click.native="save()">Save</v-btn>
                              </v-card-actions>
                            </template>
                          </v-date-picker>
                        </v-menu>
                      </v-flex>
                    </v-layout>
                    <v-layout row wrap>
                      <v-flex xs12 sm6 offset-sm3>
                          <v-layout>
                            <v-flex xs6>
                              <v-menu lazy :close-on-content-click="false" v-model="menuStartTime" transition="scale-transition" full-width offset-y :nudge-left="40" max-width="290px">
                                <v-text-field slot="activator" label="Start Time" v-model="startTime" prepend-icon="access_time" readonly required></v-text-field>
                                <v-time-picker v-model="startTime" dark actions>
                                  <template scope="{ save, cancel }">
                                    <v-card-actions>
                                      <v-btn flat primary @click="cancel()">Cancel</v-btn>
                                      <v-btn flat primary @click="save()">Save</v-btn>
                                    </v-card-actions>
                                  </template>
                                </v-time-picker>
                              </v-menu>
                            </v-flex>
                            <v-flex xs6>
                              <v-menu lazy :close-on-content-click="false" v-model="menuEndTime" transition="scale-transition" full-width offset-y :nudge-left="40" max-width="290px">
                                <v-text-field slot="activator" label="End Time" v-model="endTime" prepend-icon="access_time" readonly required></v-text-field>
                                <v-time-picker v-model="endTime" dark actions>
                                  <template scope="{ save, cancel }">
                                    <v-card-actions>
                                      <v-btn flat primary @click="cancel()">Cancel</v-btn>
                                      <v-btn flat primary @click="save()">Save</v-btn>
                                    </v-card-actions>
                                  </template>
                                </v-time-picker>
                              </v-menu>
                            </v-flex>
                          </v-layout>
                      </v-flex>
                    </v-layout>
                    <v-layout row>
                      <v-flex xs12 sm6 offset-sm3>
                        <v-text-field name="imageUrl" label="ImageUrl" id="imageUrl" v-model="imageUrl" prepend-icon="image" required></v-text-field>
                      </v-flex>
                    </v-layout>
                    <v-layout row>
                      <v-flex xs10 lg6 sm6 offset-sm3 offset-lg3 offset-xs1>
                         <v-card class="portrait" v-show="imageUrl != ''" :img="imageUrl" height="200px" slot="activator"></v-card>
                      </v-flex>
                    </v-layout>
                    <v-layout row>
                      <v-flex xs12 sm6 offset-sm3>
                        <v-text-field name="description" label="Description" id="description" v-model="description" multi-line prepend-icon="comment" required counter max="150"></v-text-field>
                      </v-flex>
                    </v-layout>
                    <v-layout row>
                      <v-flex class="text-xs-center" xs12 sm6 lg6 offset-sm3>
                        <v-btn :disabled="!formIsValid" type="submit">Create Event</v-btn>
                      </v-flex>
                    </v-layout>
                  </form>
                </v-flex>
              </v-layout>
            </v-card-text>
          </v-card>
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
      description: '',
      date: null,
      startTime: null,
      endTime: null,
      menuDate: false,
      menuStartTime: false,
      menuEndTime: false
    }
  },
  computed: {
    formIsValid() {
      return this.title !== '' &&
        this.location !== '' &&
        this.imageUrl !== '' &&
        this.description !== '' &&
        this.date != null &&
        this.startTime != null &&
        this.endTime != null
    }
  },
  methods: {
    onFormSubmit() {
      if (!this.formIsValid) {
        return
      }
      const eventData = {
        title: this.title,
        location: this.location,
        date: new Date(this.date),
        startTime: this.startTime,
        endTime: this.endTime,
        description: this.description,
        imageUrl: this.imageUrl
      }
      this.$store.dispatch('createEvent', eventData)
      this.$router.push('/events')
    }
  }
}
</script>

