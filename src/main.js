import Vue from 'vue'
import App from './App.vue'
import router from './router'
import firebase from 'firebase'
import Store from './store'
import requests from './requests'  //Запросы

Vue.config.productionTip = false

var firebaseConfig = { 
  apiKey: "AIzaSyCEfISXS_X6hcw6HWesOZePDswmh5ppaf0", 
  authDomain: "eventsapp-3754f.firebaseapp.com", 
  databaseURL: "https://eventsapp-3754f.firebaseio.com", 
  projectId: "eventsapp-3754f", 
  storageBucket: "eventsapp-3754f.appspot.com", 
  messagingSenderId: "447689233975", 
  appId: "1:447689233975:web:11d66a3745dee2530e11b2" 
  }; 
  // Initialize Firebase 
  firebase.initializeApp(firebaseConfig); 

Vue.use(requests)

new Vue({
  router,
  data: Store,
  render: h => h(App)
}).$mount('#app')
