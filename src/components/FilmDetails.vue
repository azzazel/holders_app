<template>
  <div>Film Details</div>
</template>

<script>

  export default {
    name: 'FilmDetails',
    data() {
      return {
        film: {}
      }
    },
    methods: {
      getFilm() {
        // get single film
      }
    },
    created() {
      this.getFilm()
    }
  }
</script>
