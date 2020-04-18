<template>
  <div class="column is-three-quarters">
    <h1 class="title is-1">Trip History</h1>
    <section class="scrollable" :class="[loading ? 'blur' : '']">
      <div class="card">
        <div class="card-content">
          <table class="table is-striped is-fullwidth">
            <thead>
              <tr>
                <th>Started At</th>
                <th>From Station</th>
                <th>To Station</th>
                <th>Fare</th>
                <th>Card</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(record, i) in history" :key="i">
                <td>{{record.startTime | time}}</td>
                <td><i>{{record.startStation}}</i></td>
                <td><i>{{record.endStation}}</i></td>
                <td>{{record.tripFare | currency}}</td>
                <td>{{record.breezecardNum}}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      history: [],
      loading: true,
    }
  },
  computed: {
    username() {
      return this.$store.state.username;
    },
    client() {
      return this.$store.getters.client;
    }
  },
  async mounted() {
    // Refresh every time
    try {
      const { data: history } = await this.client.get('/api/trips', {
        params: { username: this.username }
      });
      this.history = history;
      this.$nextTick(() => {
        this.loading = false;
      });
    } catch {
      this.$emit('message', {
        isError: true,
        message: 'Failed to load trip history'
      })
    }
  }

}
</script>

<style scoped>
  .scrollable {
    height: 60vh;
    overflow-y: scroll;
    padding: 2rem;
    background-color: #eeeeee;
    box-shadow: inset 0 0 10px lightgray;
    transition: all 0.5s ease-out;
  }
  table {
    position: relative;
    z-index: 0;
  }
  td {
    font-family: monospace;
  }
  .blur {
    opacity: 0;
  }
</style>
