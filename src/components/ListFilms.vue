<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12 class="text-xs-center" mt-5>
        <h1>List Films</h1>

      </v-flex>
      <v-flex xs12 class="text-xs-center" mt-3>
        <v-flex xs12 sm6 offset-sm3 mt-3 class="text-xs-left" mt-5>
        <h3>Films Of {{this.$store.getters.user.email}}</h3>
        <v-list>
          <v-list-tile v-for="holder in holders"
          :key="holder['.key'].split('_')[1]"
          :to="'films/' + holder['.key'].split('_')[0]" >
             {{holder.film_name}} - total {{holder.shots}} shots
          </v-list-tile>
        </v-list>
      </v-flex>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Vuex from 'vuex'
import firebase from 'firebase'

export default {
  computed: Vuex.mapState(['holders']),
  created () {
    this.$store.dispatch('setHoldersRef', firebase.database().ref('holders').child(this.$store.getters.user.uid))
  }
}
</script>
