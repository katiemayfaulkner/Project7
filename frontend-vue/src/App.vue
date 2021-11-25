<template>
  <div id="app">
    <Welcome v-if="loggedIn"/>
    <router-view/>

  </div>
</template>

<script>
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-vue/dist/bootstrap-vue.css"

import Welcome from './components/welcome.vue'


export default {
  name: 'app',
  loggedIn: false,
  components: {
    Welcome,
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
