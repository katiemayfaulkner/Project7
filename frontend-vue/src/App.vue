<template>
  <div id="app">
    <Header/>
    <Welcome v-if="loggedIn"/>

    <router-view/>
  </div>
</template>

<script>
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-vue/dist/bootstrap-vue.css"

import Welcome from './components/welcome.vue'
import Header from './components/header.vue'

export default {
  name: 'app',
  loggedIn: false,
  components: {
    Welcome,
    Header,
  }
}

</script>

<style>
*{
  scroll-behavior: smooth;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
}
</style>
