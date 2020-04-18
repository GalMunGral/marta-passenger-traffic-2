<template>
  <div class="card">
    <div class="card-content">
      <table class="table is-striped is-fullwidth">
        <thead>
          <tr>
            <th>Breeze Card #</th>
            <th>Balance</th>
            <th>Owner</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(card, i) in cards" :key="i">
            <td>{{card.breezecardNum}}</td>
            <td><i>{{card.value | currency}}</i></td>
            <td>{{card.belongsTo}}</td>
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
      cards: []
    }
  },
  computed: {
    client() {
      return this.$store.getters.client;
    }
  },
  async mounted() {
    const { data: cards } = await this.client.get('/api/cards');
    this.cards = cards;
  }
}
</script>
