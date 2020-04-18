<template>
  <div class="columns is-centered">
    <div class="column is-one-third">

      <h1 class="title is-1">Login</h1>

      <div class="card">
        <form class="card-content" @submit.prevent="login">

          <div class="field ">
            <label class="label">Username</label>
            <div class="control">
              <input v-model="username" class="input" type="text" placeholder="e.g. commuter14" required>
            </div>
          </div>

          <div class="field">
            <label class="label">Password</label>
            <div class="control">
              <input v-model="password" class="input" type="password" placeholder="e.g. choochoo" required>
            </div>
          </div>

          <div class="field is-grouped">
            <div class="control">
              <button class="button is-link">Submit</button>
            </div>
            <div class="control">
              <button type="button" class="button is-light" @click="reset">Cancel</button>
            </div>
          </div>

        </form>
      </div>

      <section class="footnote">
        Don't have an account?
        <router-link to="/register">Register</router-link>
      </section>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      username: '',
      password: ''
    }
  },
  computed: {
    client() {
      return this.$store.getters.client;
    }
  },
  methods: {
    reset() {
      this.username = this.password = '';
    },
    async login() {
      try {
        const res = await this.client.post('api/login', {
          username: this.username,
          password: this.password
        });
        const { data: { username, userType, accessToken }} = res;
        this.$store.commit('setUser', {
          username,
          userType,
          accessToken,
        });
        this.$emit('message', {
          isError: false,
          message: 'Login successful!'
        });
        const path = userType === 'ADMIN' ? '/admin' : '/passenger';
        this.$router.replace(path);
      } catch(e) {
        this.$emit('message', {
          isError: true,
          message: 'Login failed. Please check your login credentials.'
        });
      }
    }
  },
  beforeMount() {
    if (this.$store.getters.isLoggedIn) {
      const redirectPath = this.$store.state.userType === 'PASSENGER' ? '/passenger' : '/admin';
      this.$router.replace(redirectPath);
    }
  }
}
</script>

<style scoped>
.footnote {
  margin-top: 2rem;
}
</style>
