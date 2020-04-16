import Vue from 'vue';
import App from './App.vue';
import store from './store/store';
import router from './routes';

Vue.config.productionTip = false;

const vm = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');

console.log(vm);