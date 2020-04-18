<template>
  <div class="columns is-centered">
    <div class="column is-two-thirds">
      <section class="level">
        <div class="level-left">
          <h1 class="title is-1">
            {{viewingStations ? 'All Stations' : 'All Breeze Cards'}}
          </h1>
        </div>
        <div class="level-right">
          <a @click="toggleView">
            <strong>
              {{viewingStations ? 'View All Breeze Cards' : 'View All Stations'}}
            </strong>
          </a>
        </div>
      </section>

      <transition name="flip" mode="out-in">
        <keep-alive>
          <component :is="activeComponent"></component>
        </keep-alive>
      </transition>

    </div>
  </div>
</template>

<script>
import Card from '../components/Cards';
import Stations from '../components/Stations';

export default {
  components: {
    Card,
    Stations
  },
  data() {
    return {
      viewingStations: true,
      stations: []
    }
  },
  computed: {
    client() {
      return this.$store.getters.client;
    },
    activeComponent() {
      return this.viewingStations ? Stations: Card;
    }
  },
  methods: {
    toggleView() {
      this.viewingStations = !this.viewingStations;
    }
  },
  async mounted() {
    const { data: stations } = await this.client.get('/api/stations');
    this.stations = stations;
  }
}
</script>

<style scoped>
  .column {
    transform-style: preserve-3d;
    perspective: 2000px;
    perspective-origin: 50% 50vh;
  }
  .flip-enter-active, .flip-leave-active {
    transition: transform 0.3s linear;
  }
  .flip-enter {
    transform: rotateY(-90deg);
  }
  .flip-leave-to {
    transform: rotateY(90deg);
  }
</style>
