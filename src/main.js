import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import { store } from './store'
import firebase from 'firebase'

Vue.use(Vuetify)

firebase.initializeApp({
  apiKey: 'AIzaSyDabTprxU3aDl2nTnQAR77OYI6FtXcsCYw',
  authDomain: 'holders-685f8.firebaseapp.com',
  databaseURL: 'https://holders-685f8.firebaseio.com',
  projectId: 'holders-685f8',
  storageBucket: 'holders-685f8.appspot.com',
  messagingSenderId: '640390299540'
})

Vue.config.productionTip = false

/* eslint-disable no-new */
const unsubscribe = firebase.auth()
.onAuthStateChanged((firebaseUser) => {
  new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App),
    created () {
      if (firebaseUser) {
        store.dispatch('autoSignIn', firebaseUser)
      }
    }
  })
  unsubscribe()
})
