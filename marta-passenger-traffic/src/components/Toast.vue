<template>
  <div :class="[isError ? 'is-danger' : 'is-success']" class="notification is-light">
    <button class="delete" @click="close"></button>
    <h4 class="title is-4">{{isError ? 'Error' : 'Success'}}</h4>
    <p>{{message}}</p>
  </div>
</template>

<script>
export default {
  props: {
    message: String,
    isError: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    close() {
      this.$emit('close');
    }
  },
}
</script>

<style scoped>
.notification {
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  height: 8rem;
  width: 30rem;
}
</style>
