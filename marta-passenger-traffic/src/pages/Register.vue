<template>
  <div>
    <h1>Register</h1>
    <p>{{count}}</p>
    <router-link to="/login">Login</router-link>
  </div>
</template>

<script>
export default {
  computed: {
    count() {
      return this.$store.state.count;
    }
  }
}
</script>
