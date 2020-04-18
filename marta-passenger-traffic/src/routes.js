import Vue from 'vue';
import VueRouter from 'vue-router';

import Login from './pages/Login.vue';
import Register from './pages/Register';
import Passenger from './pages/Passenger';
import Administrator from './pages/Administrator';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '/login', component: Login },
    { path: '/register', component: Register },
    { path: '/passenger', component: Passenger },
    { path: '/admin', component: Administrator },
    { path: '/', redirect: '/login' },
  ]
});

export default router;
