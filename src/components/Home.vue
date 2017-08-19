<template>
  <v-slide-x-transition>
    <v-container>
      <v-layout row wrap>
        <v-flex xs12 lg8 offset-lg2 class="mt-2" v-if="isEventsLoading">
          <v-progress-circular indeterminate v-bind:size="200" v-bind:width="7" class="primary--text"></v-progress-circular>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex xs12 lg8 offset-lg2 class="mt-2" v-if="!isEventsLoading">
          <v-carousel style="cursor: pointer">
            <v-carousel-item v-for="event in myEvents" :src="event.imageUrl" :key="event.id" transition="fade-transition" reverseTransition="fade-transition" @click="goToSelectedEvent(event.id)">
              <div class="title">{{event.title}}</div>
            </v-carousel-item>
          </v-carousel>
        </v-flex>
      </v-layout>
      <v-layout row wrap class="mt-2">
        <v-flex xs-12 class="text-xs-center">
          <p> Join our Events! </p>
        </v-flex>
      </v-layout>
    </v-container>
  </v-slide-x-transition>
</template>

<script>
export default {
  created() {
    this.$store.dispatch('getEvents')
  },
  computed: {
    myEvents() {
      return this.$store.getters.loadFeaturedEvents
    },
    isEventsLoading() {
      return this.$store.getters.getIsLoading
    }
  },
  methods: {
    goToSelectedEvent(id) {
      this.$router.push('/events/' + id)
    }
  }
}
</script>

<<style scoped>
  .title{
    position: absolute;
    bottom: 50px;
    background-color: rgba(0,0,0,0.5);
    font-size: 2em;
     padding: 15px; 
  }
</style>

