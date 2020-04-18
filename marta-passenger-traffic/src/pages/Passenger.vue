<template>
  <div class="columns">

    <aside class="menu column is-one-fifth">
      <p class="menu-label">
        Passenger
      </p>
      <ul class="menu-list">
        <li><a @click="activate('Trip')">New Trip</a></li>
        <li><a @click="activate('Wallet')">My Wallet</a></li>
        <li><a @click="activate('History')">History</a></li>
      </ul>
    </aside>

    <transition name="tabs" mode="out-in">
      <keep-alive :exclude="'History'">
        <component
          :is="activeComponent"
          :cards="cards"
          @message="onMessage"
          @requestCard="requestCard"
          @deactivateCard="deactivateCard"
          @tripCompleted="loadCardData"
        ></component>
      </keep-alive>
    </transition>

  </div>
</template>

<script>
import Trip from '../components/Trip';
import Wallet from '../components/Wallet';
import History from '../components/History';

export default {
  components: {
    Trip,
    Wallet,
    History
  },
  data() {
    return {
      cards: [],
      activeComponent: 'Trip'
    }
  },
  computed: {
    username() {
      return this.$store.state.username;
    },
    client() {
      return this.$store.getters.client;
    },
  },
  methods: {
    activate(component) {
      this.activeComponent = component;
    },
    onMessage(message) {
      this.$emit('message', message);
    },
    async loadCardData() {
      try {
        const { data: cards } = await this.client.get('/api/cards', {
          params: { belongsTo: this.username }
        });
        this.cards = cards;
      } catch {
        console.log('Failed to load card data');
      }
    },
    async requestCard() {
      try {
        const { data: { breezecardNum } } = await this.client.post('/api/cards/', {
          username: this.username
        });
        await this.loadCardData();
        this.$emit('message', {
          isError: false,
          message: `Received new card: #${breezecardNum}`
        });
      } catch {
        this.$emit('message', {
          isError: true,
          message: `Couldn't get a new card`
        })
      }
    },
    async deactivateCard(card) {
      try {
        await this.client.delete(`/api/cards/${card.breezecardNum}`);
        await this.loadCardData();
        this.$emit('message', {
          isError: false,
          message: `Card #${card.breezecardNum} has been removed`
        });
      } catch {
        this.$emit('message', {
          isError: true,
          message: `Failed to deactivate card #${card.breezecardNum}`
        })
        console.log('Failed to deactivate card', card);
      }
    }
  },
  created() {
    this.loadCardData();
  }
}
</script>

<style scoped>
  .tabs-enter-active, .tabs-leave-active {
    transition: all 0.2s ease-in-out;
  }
  .tabs-enter, .tabs-leave-to {
    opacity: 0;
    transform: translate3d(0, 0, -1000px);
  }
  .columns {
    transform-style: preserve-3d;
    perspective: 1000px;
    perspective-origin: 100vw 100vh;
  }
</style>
