import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'
import router from '@/router'
import { firebaseMutations, firebaseAction } from 'vuexfire'
import uuidv4 from 'uuid/v4'

// import uuidv4 from 'uuid/v4'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    appTitle: 'Film Holders App',
    user: null,
    error: null,
    loading: false,
    holders: [],
    newHolder: ''
  },
  mutations: {
    ...firebaseMutations,
    setUser (state, payload) {
      state.user = payload
    },
    setError (state, payload) {
      state.error = payload
    },
    setLoading (state, payload) {
      state.loading = payload
    },
    ADD_FILM (state, payload) {
      console.log('-----------------------------------------------')
      console.log(payload)
      console.log('-----------------------------------------------')
      state.newHolder = payload
    }
  },
  actions: {
    userSignUp ({commit}, payload) {
      commit('setLoading', true)
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
      .then(firebaseUser => {
        commit('setUser', {email: firebaseUser.email})
        commit('setLoading', false)
        router.push('/home')
      })
      .catch(error => {
        commit('setError', error.message)
        commit('setLoading', false)
      })
    },
    userSignIn ({commit}, payload) {
      commit('setLoading', true)
      firebase.auth()
      .signInWithEmailAndPassword(payload.email, payload.password)
        .then(firebaseUser => {
          commit('setUser', {email: firebaseUser.email})
          commit('setLoading', false)
          commit('setError', null)
          router.push('/home')
        })
        .catch(error => {
          commit('setError', error.message)
          commit('setLoading', false)
        })
    },
    autoSignIn ({commit}, payload) {
      commit('setUser', {email: payload.email, uid: payload.uid})
    },
    userSignOut ({commit}) {
      firebase.auth().signOut()
      commit('setUser', null)
      router.push('/')
    },
    setHoldersRef: firebaseAction(({
      bindFirebaseRef
    }, ref) => {
      bindFirebaseRef('holders', ref)
    }),
    addFilm ({ commit }, payload) {
      let dbRef = firebase.database().ref('holders')
      var newPostRef = dbRef.child(this.state.user.uid).child(uuidv4())

      newPostRef.set({
        film_name: payload.film_name,
        shots: payload.shots,
        status: payload.status,
        added: new Date().getTime()
      }, function (error) {
        if (error) {
          alert('Data could not be saved.' + error)
        } else {
          commit('ADD_FILM', payload)
          router.push('/films')
        }
      })

      newPostRef.set()
    }
  },
  getters: {
    isAuthenticated (state) {
      return state.user !== null && state.user !== undefined
    },
    user (state) {
      let user = null
      if (state.user !== null && state.user !== undefined) {
        user = state.user
      }
      return user
    },
    holders: state => state.holders
  }
})
