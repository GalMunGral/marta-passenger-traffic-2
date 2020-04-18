<template>
  <nav class="navbar level is-spaced is-light" role="navigation" aria-label="main navigation">
    <div class="level-left">
      <div class="navbar-brand">
        <div class="navbar-item">
          <img src="../assets/marta-logo.svg" alt="" width="150">
        </div>
      </div>
    </div>
    <div v-if="isLoggedIn" class="level-right">
      <button class="button is-info" @click="logout">Log Out</button>
    </div>

  </nav>
</template>

<script>
export default {
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    }
  },
  methods: {
    logout() {
      this.$store.commit('reset');
      this.$router.push('/login');
    }
  }
}
</script>
