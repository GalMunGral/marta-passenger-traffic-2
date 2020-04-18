import Vue from 'vue';
import App from './App.vue';
import store from './store/store';
import router from './routes';
import 'bulma/css/bulma.css'

Vue.config.productionTip = false;

Vue.filter('currency', value => {
  value = Number(value);
  if (Number.isNaN(value)) return '';
  return '$' + value.toFixed(2);
})

Vue.filter('time', value => {
  return new Date(value).toISOString()
    .replace('T', ' ')
    .replace(/\..*$/, '');
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
