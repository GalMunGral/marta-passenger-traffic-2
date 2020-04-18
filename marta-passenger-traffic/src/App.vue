<template>
  <div id="app">

    <nav-bar></nav-bar>

    <router-view
      class="container is-fluid"
      @message="showToast"
    ></router-view>

    <transition name="toast">
      <toast v-show="displayToast"
        :is-error="error"
        :message="toastMessage"
        :timestamp="toastTimestamp"
        @close="hideToast"
      ></toast>
    </transition>

  </div>
</template>

<script>
import NavBar from './components/NavBar';
import Toast from './components/Toast';

export default {
  components: {
    NavBar,
    Toast,
  },
  data() {
    return {
      displayToast: false,
      error: false,
      toastMessage: '',
      toastTimestamp: '',
    }
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    },
    currentPath() {
      return this.$router.currentRoute.path;
    },
    authorizedPath() {
      return this.$store.state.userType === 'ADMIN' ? '/admin' : '/passenger';
    }
  },
  methods: {
    showToast({ isError, message }) {
      this.toastMessage = message;
      this.error = isError;
      this.displayToast = true;
      setTimeout(this.hideToast, 3000);
    },
    hideToast() {
      this.displayToast = false;
    }
  },
  created() {
    if (!this.isLoggedIn) {
      if (this.currentPath !== '/login' && this.currentPath !== '/register') {
        this.$router.replace('/login');
      } 
    } else if (this.currentPath !== this.authorizedPath) {
      this.$router.replace(this.authorizedPath);
    }
  }
}
</script>

<style>
body {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow-y: scroll;
  -webkit-user-select: none;  /* Chrome all / Safari all */
  -moz-user-select: none;     /* Firefox all */
  -ms-user-select: none;      /* IE 10+ */
  user-select: none;          /* Likely future */
}
body::-webkit-scrollbar {
  display: none;
}
.toast-enter-active {
  transition: transform 0.2s ease-out;
}
.toast-leave-active {
  transition: transform 0.2s ease-in;
}
.toast-enter, .toast-leave-to {
  transform: translate3d(300px, 0, 0)
}
</style>
