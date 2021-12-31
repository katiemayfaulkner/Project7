import Vue from 'vue'
import App from './App.vue'
import router from './router/main'
import store from './store/main'
import Axios from 'axios';
import VueObserveVisibility from 'vue-observe-visibility'
import VueSimpleAlert from "vue-simple-alert";

Vue.config.productionTip = false

// set auth header
Axios.defaults.headers.common['Authorization'] = `Bearer ${store.state.token}`;
Axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

new Vue({
  el: '#app',
  router,
  store,
  VueObserveVisibility,
  VueSimpleAlert,
  render: h => h(App)
}).$mount('#app')