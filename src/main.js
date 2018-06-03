import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import Rx from 'rx';
import VueRx from 'vue-rx';
import App from './App.vue';

Vue.use(VueRx, Rx);
Vue.use(VueAxios, axios);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app');
