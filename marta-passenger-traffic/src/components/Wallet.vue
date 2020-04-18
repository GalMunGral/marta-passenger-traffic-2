<template>
  <div class="column is-one-third">
    <h1 class="title is-1">My Wallet</h1>
    <div class="card">
      <div class="card-content">
        <table class="table is-hoverable">
          <thead>
            <tr>
              <th>Card Number</th>
              <th>Balance</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="card in cards" :key="card.breezecardNum">
              <td>{{card.breezecardNum}}</td>
              <td><i>{{card.value | currency}}</i></td>
              <td>
                <button
                  class="button is-danger is-small"
                  @click="$emit('deactivateCard', card)"
                >
                  Deactivate
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="field">
          <div class="control">
            <button
              class="button is-link is-light"
              @click="$emit('requestCard')"
            >
              Request a new card
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    cards: Array
  },
  computed: {
    client() {
      return this.$store.getters.client;
    }
  },
  methods: {
    
  }
}
</script>
