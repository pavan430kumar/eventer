<template>
  <v-slide-x-transition>
    <v-container>
      <v-layout row wrap v-for="event in allEvents" :key="event.id" class="mb-2">
        <v-flex xs12 lg8 offset-lg2 class="mt-3">
          <v-card>
            <v-container fluid>
              <v-layout row>
                <v-flex xs5 md4 lg4>
                  <v-card-media :src="event.imageUrl" height="150px"></v-card-media>
                </v-flex>
                <v-flex xs7 md8 lg8>
                  <v-card-title primary-title>
                    <div>
                      <h4 class="white--text"> {{ event.title }} </h4>
                      <div> {{event.date}} </div>
                    </div>
                  </v-card-title>
                  <v-card-actions>
                    <v-btn :to="'/events/' + event.id">
                      <v-icon>arrow_forward</v-icon>
                      View Event</v-btn>
                  </v-card-actions>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-slide-x-transition>
</template>

<script>
export default {
  computed: {
    allEvents() {
      return this.$store.getters.loadEvents
    }
  }
}
</script>
