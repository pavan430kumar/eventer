<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12 lg10 offset-lg1 class="mt-2">
        <v-carousel style="cursor: pointer">
          <v-carousel-item v-for="event in myEvents" v-bind:src="event.src" :key="event.id" @click="goToSelectedEvent(event.id)">
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
</template>

<script>
export default {
  computed: {
    myEvents(){
      return this.$store.getters.loadFeaturedEvents
    }
  },
  methods: {
    goToSelectedEvent (id) {
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

