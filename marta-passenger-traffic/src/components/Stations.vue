<template>
  <div class="card">
    <div class="card-content">
      <table class="table is-striped is-fullwidth">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Fare</th>
            <th>Type</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(station, i) in stations" :key="i">
            <td>{{station.stopID}}</td>
            <td><i>{{station.name}}</i></td>
            <td><i>{{station.enterFare | currency}}</i></td>
            <td>{{station.isTrain ? 'TRAIN' : 'BUS'}}</td>
            <td>{{station.closedStatus ? 'CLOSED' : 'OPEN'}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      stations: []
    }
  },
  computed: {
    client() {
      return this.$store.getters.client;
    }
  },
  async mounted() {
    const { data: stations } = await this.client.get('/api/stations');
    this.stations = stations;
  }
}
</script>
