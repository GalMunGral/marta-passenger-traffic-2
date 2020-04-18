<template>
  <div class="columns is-centered">
    <div class="column is-one-third">

      <h1 class="title is-1">Register</h1>

      <div class="card">
        <form class="card-content" @submit.prevent="register">

          <div class="field ">
            <label class="label">Username</label>
            <div class="control">
              <input v-model="username" class="input" type="text" placeholder="e.g. commuter14" required>
            </div>
          </div>

          <div class="field">
            <label class="label">Email</label>
            <div class="control">
              <input v-model="email" class="input" type="email" placeholder="e.g. user@example.com" required>
            </div>
          </div>

          <div class="field">
            <label class="label">Password</label>
            <div class="control">
              <input v-model="password1" class="input" type="password" placeholder="e.g. choochoo" required>
            </div>
          </div>

          <div class="field">
            <label class="label">Confirm Password</label>
            <div class="control">
              <input v-model="password2" class="input" type="password" placeholder="e.g. choochoo" required>
            </div>
          </div>

          <div class="field is-grouped">
            <div class="control">
              <button class="button is-link">Submit</button>
            </div>
            <div class="control">
              <button class="button is-light" @click="$router.go(-1)">Cancel</button>
            </div>
          </div>
          
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      username: '',
      password1: '',
      password2: '',
      email: '',
    }
  },
  computed: {
    passwordMatch() {
      return this.password1 === this.password2;
    }
  },
  methods: {
    async register() {
      if (!this.passwordMatch) {
        return this.$emit('message', {
          isError: true,
          message: 'Passwords do not match.'
        });
      }
      try {
        const res = await axios.post('api/register', {
          username: this.username,
          email: this.email,
          password: this.password1
        });
        res;
        this.$emit('message', {
          isError: false,
          message: 'Registration successful! Please log in with your credentials'
        });
        this.$router.push('/login');
      } catch(e) {
        this.$emit('message', {
          isError: true,
          message: 'Registration failed. Please try again.'
        });
      }
    }
  },
}
</script>
