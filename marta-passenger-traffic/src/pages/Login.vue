<template>
  <div>
    <p>{{count}}</P>
    <div><button @click="increment">INCREMENT</button></div>
    <router-link to="/register">Register</router-link>
  </div>
</template>
<script>
export default {
  computed: {
    count() {
      return this.$store.state.count;
    }
  },
  methods: {
    increment() {
      this.$store.commit('increment');
    }
  },
  mounted() {

  }
}
</script>