  <template>
    <v-slide-x-transition>
        <v-container>
            <v-layout row>
                <v-flex xs12 lg8 offset-lg2 v-if="isFirstTimeUser">
                    <div class="white--text display-1">Create Profile</div>
                </v-flex>
                <v-flex xs12 lg8 offset-lg2 v-else>
                    <div class="white--text display-1">Update Profile</div>
                </v-flex>
            </v-layout>
            <v-layout row>
                <v-flex xs12 lg8 offset-lg2 class="mt-1">
                    <v-stepper v-model="updateModel" vertical>
                        <v-stepper-step step="1" v-bind:complete="updateModel > 1">Personal Information</v-stepper-step>
                        <v-stepper-content step="1">
                            <v-card class=" lighten-1 z-depth-1 mb-2 lg-5" height="280px">
                                <v-card-text>
                                    <v-text-field label="First Name" v-model="firstName" required></v-text-field>
                                    <v-text-field label="Last Name" v-model="lastName"></v-text-field>
                                    <v-menu lazy :close-on-content-click="false" v-model="menuDob" transition="scale-transition" full-width offset-y :nudge-left="40" max-width="290px">
                                        <v-text-field slot="activator" label="Date of Birth" v-model="dob" readonly></v-text-field>
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
                            <v-btn primary @click="updateModel = 2" :disabled="!isPersonalInfoValid">Continue</v-btn>
                        </v-stepper-content>
                        <v-stepper-step step="2" v-bind:complete="updateModel > 2">Contact Information</v-stepper-step>
                        <v-stepper-content step="2">
                            <v-card class="lighten-1 z-depth-1 mb-2" height="490px">
                                <v-card-text>
                                    <h6 class="white--text">Email and Phone </h6>
                                    <v-divider light></v-divider>
                                    <br>
                                    <v-layout>
                                        <v-flex xs6>
                                            <v-text-field label="Personal Email" v-model="email" required></v-text-field>
                                        </v-flex>
                                        <v-flex xs6>
                                            <v-text-field label="Work Email" v-model="workEmail"></v-text-field>
                                        </v-flex>
                                    </v-layout>
                                    <v-layout>
                                        <v-flex xs6>
                                            <v-text-field label="Mobile Phone" v-model="phone" required></v-text-field>
                                        </v-flex>
                                        <v-flex xs6>
                                            <v-text-field label="Work Phone" v-model="workPhone"></v-text-field>
                                        </v-flex>
                                    </v-layout>
                                    <h6 class="white--text">Address</h6>
                                    <v-divider light></v-divider>
                                    <br>
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
                            <v-btn primary @click="updateModel = 3" :disabled="!isContactInfoValid">Continue</v-btn>
                            <!-- <v-btn primary @click="updateModel = 1" >Back</v-btn> -->
                            <!-- <v-btn primary icon @click="updateModel = 1">
                                                    <v-icon>chevron_left</v-icon>
                                                </v-btn> -->
                        </v-stepper-content>
                        <v-stepper-step step="3" v-bind:complete="updateModel > 3">
                            Upload Profile Image
                            <small>Optional</small>
                        </v-stepper-step>
                        <v-stepper-content step="3">
                            <v-card class="lighten-1 z-depth-1 " height="135px">
                                <v-card-text>
                                    <h6 class="white--text">
                                        Image Url
                                        <!-- <v-btn primary icon small @click="updateModel = 1">
                                                            <v-icon>chevron_left</v-icon>
                                                        </v-btn> -->
                                    </h6>
                                    <v-divider light></v-divider>
    
                                    <v-text-field label="Profile Picture Url" v-model="profilePic"></v-text-field>
                                </v-card-text>
                            </v-card>
                            <v-card class="lighten-1 z-depth-1">
                                <v-layout>
                                    <v-flex xs12 lg6 md6 offset-lg3 offset-md3>
                                        <v-card class="portrait" v-show="profilePic != ''" :img="profilePic" height="200px" slot="activator"></v-card>
                                    </v-flex>
                                </v-layout>
                            </v-card>
                        </v-stepper-content>
                    </v-stepper>
                    <v-layout row>
                        <v-flex class="mt-2 text-xs-center">
                            <v-btn primary type="submit" @click="updateProfile" :disabled="!isSubmitValid" v-if="isFirstTimeUser">Create</v-btn>
                            <v-btn primary type="submit" @click="updateProfile" :disabled="!isSubmitValid" v-else>Update</v-btn>
                            <v-btn primary to="/profile" v-if="!isFirstTimeUser">Back</v-btn>
                        </v-flex>
                    </v-layout>
                </v-flex>
            </v-layout>
        </v-container>
    </v-slide-x-transition>
</template>

<<script>
export default {
  data () {
      return {
        updateModel: 1,
        menuDob: false,
        dob: null,
        firstName: '',
        lastName: '',
        email: '',
        workEmail: '',
        phone: '',
        workPhone: '',
        street:'',
        apt:'',
        city:'',
        state:'',
        zipcode:'',
        profilePic: ''
      }
    },
    mounted() {
      var user =  this.$store.getters.getFirebaseUser
         var userProfileInfo = this.$store.getters.getUser(user.userId)
         console.log(userProfileInfo)
           if(userProfileInfo){
               this.dob= userProfileInfo.dob,
               this.firstName= userProfileInfo.firstName,
               this.lastName= userProfileInfo.lastName,
               this.email= userProfileInfo.email,
               this.workEmail= userProfileInfo.workEmail,
               this.phone= userProfileInfo.phone,
               this.workPhone= userProfileInfo.workPhone,
               this.street=userProfileInfo.street,
               this.apt=userProfileInfo.apt,
               this.city=userProfileInfo.city,
               this.state=userProfileInfo.state,
               this.zipcode=userProfileInfo.zipcode,
               this.profilePic= userProfileInfo.profilePic
           }
    },
    computed: {
        isPersonalInfoValid(){
            return this.firstName != ''
        },
        isContactInfoValid(){
            return this.email != '' &&
            this.primaryPh != '' &&
            this.street != '' &&
            this.city != '' &&
            this.state != '' &&
            this.zipcode != ''
        },
        isSubmitValid(){
            return this.isPersonalInfoValid && this.isContactInfoValid
        },
        isFirstTimeUser() {
            var loggedInUser = this.$store.getters.getFirebaseUser.userId
            var profile = this.$store.getters.getUser(loggedInUser)
            return profile == undefined ? true : false
    }
    },
    methods: {
        onClearPersonalInfo(){ 
            this.firstName= '',
            this.lastName= '',
            this.dob= null
        },
        onClearContactlInfo(){ 
            this.email = '',
            this.workEmail = '',
            this.phone = '',
            this.workPhone = '',
            this.street = '',
            this.apt = '',
            this.city = '',
            this.state = '',
            this.zipcode = ''
        },
        updateProfile(){
            const updatedProfileInfo = {
                firstName: this.firstName,
                lastName : this.lastName,
                dob: this.dob,
                email: this.email,
                workEmail: this.workEmail,
                phone: this.phone,
                workPhone: this.workPhone,
                street: this.street,
                apt: this.apt,
                city: this.city,
                state: this.state,
                zipcode: this.zipcode,
                profilePic: this.profilePic
            }
            this.$store.dispatch('updateProfile', updatedProfileInfo)
        }
    }
}
</script>

