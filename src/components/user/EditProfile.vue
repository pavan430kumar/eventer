  <template>
    <!-- <v-slide-x-transition> -->
        <v-container>
            <v-layout row>
                <v-flex xs12 lg8 offset-lg2>
                  <div class="white--text display-1">Edit Profile</div>
                </v-flex>
              </v-layout>
            <v-layout row>
                <v-flex xs12 lg8 offset-lg2>
                    <v-stepper v-model="e6" vertical>
                        <v-stepper-step step="1" v-bind:complete="e6 > 1">Personal Information</v-stepper-step>
                        <v-stepper-content step="1">
                            <v-card class=" lighten-1 z-depth-1 mb-5 lg-5" height="300px">
                                <v-card-text>
                                    <v-text-field label="First Name" v-model="firstName" required></v-text-field>
                                    <v-text-field label="Last Name" v-model="lastName" required></v-text-field>
                                    <v-menu lazy :close-on-content-click="false" v-model="menuDob" transition="scale-transition" full-width offset-y :nudge-left="40" max-width="290px">
                                        <v-text-field slot="activator" label="Date of Birth" v-model="dob"></v-text-field>
                                        <v-date-picker v-model="dob" dark actions>
                                            <template scope="{ save, cancel }">
                                                <v-card-actions>
                                                    <v-btn flat primary @click="cancel()">Cancel</v-btn>
                                                    <v-btn flat primary @click.native="save()">Save</v-btn>
                                                </v-card-actions>
                                            </template>
                                        </v-date-picker>
                                    </v-menu>
                                </v-card-text>
                            </v-card>
                            <v-btn primary @click="e6 = 2">Continue</v-btn>
                            <v-btn flat>Cancel</v-btn>
                        </v-stepper-content>
                        <v-stepper-step step="2" v-bind:complete="e6 > 2">Contact Information</v-stepper-step>
                        <v-stepper-content step="2">
                            <v-card class="lighten-1 z-depth-1 mb-5" height="400px">
                                <v-card-text>
                                    <h6 class="white--text">Phone</h6>
                                    <v-layout>
                                        <v-flex xs6>
                                            <v-text-field label="Primary Phone No" v-model="primaryPh" required></v-text-field>
                                        </v-flex>
                                        <v-flex xs6>
                                            <v-text-field label="Secoundry Phone No" v-model="secPh"></v-text-field>
                                        </v-flex>
                                    </v-layout>
                                    <br>
                                    <h6 class="white--text">Address</h6>
                                    <v-layout>
                                        <v-flex xs6>
                                            <v-text-field label="Street Address" v-model="street" required></v-text-field>
                                        </v-flex>
                                        <v-flex xs6>
                                            <v-text-field label="Apt No" v-model="apt"></v-text-field>
                                        </v-flex>
                                    </v-layout>
                                    <v-layout>
                                        <v-flex xs5>
                                            <v-text-field label="City" v-model="city" required></v-text-field>
                                        </v-flex>
                                        <v-flex xs3>
                                            <v-text-field label="State" v-model="state" required></v-text-field>
                                        </v-flex>
                                        <v-flex xs4>
                                            <v-text-field label="ZipCode" v-model="zipcode" required></v-text-field>
                                        </v-flex>
                                    </v-layout>
                                </v-card-text>
                            </v-card>
                            <v-btn primary @click="e6 = 3">Continue</v-btn>
                            <v-btn flat>Cancel</v-btn>
                        </v-stepper-content>
                        <v-stepper-step step="3" v-bind:complete="e6 > 3">Upload Profile Image</v-stepper-step>
                        <v-stepper-content step="3">
                            <v-card class="lighten-1 z-depth-1 mb-5" height="200px">
                                <v-card-text>
                                    <h6 class="white--text">Image Url</h6>
                                    <v-text-field label="Profile Picture Url" v-model="profileImgUrl"></v-text-field>
                                    <v-layout row>
                                        <v-flex xs12 lg4 offset-lg4>
                                            <div v-show="profileImgUrl != ''">
                                                <img :src="profileImgUrl" height="200" width="270">
                                            </div>
                                        </v-flex>
                                    </v-layout>
                                </v-card-text>
                            </v-card>
                            <v-btn primary @click="e6 = 1">Continue</v-btn>
                            <v-btn flat>Cancel</v-btn>
                        </v-stepper-content>
                    </v-stepper>
                </v-flex>
            </v-layout>
        </v-container>
    <!-- </v-slide-x-transition> -->
</template>

<<script>
export default {
  data () {
      return {
        e6: 1,
        menuDob: false,
        dob: null,
        firstName: '',
        lastName: '',
        primaryPh: '',
        secPh: '',
        street:'',
        apt:'',
        city:'',
        state:'',
        zipcode:'',
        profileImgUrl: ''
      }
    }
}
</script>

