import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './App'
import router from './router'
import { store } from './store'
import firebase from 'firebase'
import AlertComp from './components/shared/Alert.vue'

Vue.use(Vuetify)
Vue.config.productionTip = false
Vue.component('app-alert',AlertComp)

let app;

// Initialize Firebase
var config = {
  apiKey: "AIzaSyAybxtda9xSXXV_7jKgdMrOYzJaYfGrua0",
  authDomain: "eventer-47f10.firebaseapp.com",
  databaseURL: "https://eventer-47f10.firebaseio.com",
  projectId: "eventer-47f10",
  storageBucket: "eventer-47f10.appspot.com",
  messagingSenderId: "972833276874"
};
firebase.initializeApp(config);

firebase.auth().onAuthStateChanged(
  user => {
    if (!app) {
      app = new Vue({
        el: '#app',
        router,
        store,
        render: h => h(App)
      })
    }
  });

