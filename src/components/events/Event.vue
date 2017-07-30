<<template>
  <v-container>
      <v-layout row wrap>
        <v-flex xs12 md10 lg8 offset-md1 offset-lg2>
            <v-card>
                <v-card-title>
                    <h4 class="white--text">{{ selectedEvent.title }}</h4>
                </v-card-title>
                <v-card-media :src="selectedEvent.src" height="400px"></v-card-media>
                <v-card-text>
                    <div>
                        <h6 class="white--text">{{selectedEvent.date}}</h6>
                        <div>Listen to your favorite artists and albums whenenver and wherever, online and offline.</div>
                    </div>
                </v-card-text>
                <v-card-actions>
                     <v-spacer></v-spacer> 
                    <v-btn>Register</v-btn>
                </v-card-actions>
            </v-card>
        </v-flex>
      </v-layout>
  </v-container>
</template>

<script>
export default {
  props: ['id'],
  computed: {
      selectedEvent(){
          return this.$store.getters.loadSelectedEvent(this.id)
      }
  }
}
</script>

