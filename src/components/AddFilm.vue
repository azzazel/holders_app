<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12 class="text-xs-center" mt-5>
        <h1>Add Film</h1>
      </v-flex>
      <v-flex xs12 sm6 offset-sm3 mt-3>
        <form @submit.prevent="addFilm">
          <v-layout column>
            <v-flex>
              <v-alert type="error" dismissible v-model="alert">
                {{ error }}
              </v-alert>
            </v-flex>
            <v-flex>
              <v-text-field
                name="film_name"
                label="film_name"
                id="film_name"
                type="text"
                v-model="film_name"
                required></v-text-field>
            </v-flex>
            <v-flex>
              <v-text-field
                name="shots"
                label="shots"
                id="shots"
                type="text"
                v-model="shots"
                required></v-text-field>
            </v-flex>
            <v-flex class="text-xs-center" mt-5>
              <v-btn color="primary" type="submit" :disabled="loading">Add Film</v-btn>
            </v-flex>
          </v-layout>
        </form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
// import firebase from 'firebase'

export default {
  data () {
    return {
      film_name: '',
      status: 0,
      shots: '',
      alert: false
    }
  },
  computed: {
    comparePasswords () {
      return this.password === this.passwordConfirm ? true : 'Passwords don\'t match'
    },
    error () {
      return this.$store.state.error
    },
    loading () {
      return this.$store.state.loading
    }
  },
  methods: {
    addFilm () {
      // Validataion!!!!
      // if (this.comparePasswords !== true) {
      //   return
      // }
      // .child(this.$store.getters.user.uid)
      // this.$store.dispatch('setHoldersRef', firebase.database().ref('holders'))
      this.$store.dispatch('addFilm', { film_name: this.film_name, status: this.status, shots: this.shots })
    }
  },
  watch: {
    error (value) {
      if (value) {
        this.alert = true
      }
    },
    alert (value) {
      if (!value) {
        this.$store.commit('setError', null)
      }
    }
  }
}
</script>
