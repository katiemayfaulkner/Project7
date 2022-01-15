<template>
  <div id="app">
    <Header />
    <Welcome v-if="!isLoggedIn" />
    <router-view />
  </div>
</template>

<script>
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-vue/dist/bootstrap-vue.css"

import Welcome from './components/welcome.vue'
import Header from './components/header.vue'

export default {
  name: 'app',
  components: {
    Welcome,
    Header,
  },
  computed: {
    isLoggedIn: function() {
      return this.$store.getters['isLoggedIn'];
    }
  }
}

</script>

<style>
* {
  scroll-behavior: smooth;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
}
</style>
