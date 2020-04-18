<template>
  <div class="column is-one-third">
    <h1 class="title is-1">Start a Trip</h1>

    <div class="card">
      <div class="card-content">

        <label class="label">Your Breeze Card</label>
        <div class="field has-addons">
          <div class="control">           
            <div class="select">   
              <select v-model="selectedCard">
                <option :value="null" selected="true">Please select a card</option>
                <option v-for="(card, i) in cards" :key="i" :value="card">
                  {{card.breezecardNum}}
                </option>
              </select>
            </div>
          </div>
          <transition name="value">
            <div v-show="selectedCard" class="control">
              <p class="button is-info">{{selectedCardValue | currency}}</p>
            </div>
          </transition>
        </div>

        <label class="label">Current Station</label>
        <div class="field has-addons">
          <div class="control">
            <div class="select">              
              <select v-model="startStation" :disabled="tripStarted">
                <option :value="null" selected="true">Where are you right now?</option>
                <option v-for="(station, i) in stations" :key="i" :value="station">
                  {{station.name}}
                </option>
              </select>
            </div>
          </div>
          <transition name="value">
            <div v-show="startStation" class="control">
              <p class="button is-danger is-light">{{tripFare | currency}}</p>
            </div>
          </transition>
        </div>

        <div class="field">
          <label class="label">Destination</label>
          <div class="control select">
            <select v-model="endStation" :disabled="!tripStarted">
              <option :value="null" selected="true">Where are you going?</option>
              <option v-for="(station, i) in stations" :key="i" :value="station">
                {{station.name}}
              </option>
            </select>
          </div>
        </div>

        <div class="field">
          <div class="control">
            <button class="button is-danger"
              :class="[tripStarted ? '': 'is-light']"
              @click="tripStarted ? endTrip() : startTrip()">
              {{tripStarted ? 'End Trip' : 'Start Trip'}}
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
  data() {
    return {
      stations: [],
      selectedCard: null,
      startStation: null,
      endStation: null,
      tripStarted: false,
      startTime: null,
      endTime: null,
    }
  },
  computed: {
    client() {
      return this.$store.getters.client;
    },
    selectedCardValue() {
      return this.selectedCard?.value?.toFixed(2);
    },
    tripFare() {
      if (!this.startStation) return 0;
      return this.startStation.enterFare;
    }
  },
  watch: {
    cards(newCards) {
      if (this.selectedCard) {
        // Because the array has been swapped
        this.selectedCard = newCards.find(c => {
          return c.breezecardNum === this.selectedCard.breezecardNum
        }) ?? newCards[0];
      }
    }
  },
  methods: {
    getCurrentTime() {
      return new Date().toISOString().replace('T', ' ').replace(/\..*$/, '')
    },
    startTrip() {
       if (!this.selectedCard) {
        return this.$emit('message', {
          isError: true,
          message: 'Please select a card'
        });
      }
      if (!this.startStation) {
        return this.$emit('message', {
          isError: true,
          message: 'Please select a station'
        });
      }
      this.startTime = this.getCurrentTime();
      this.tripStarted = true;
    },
    async endTrip() {
      if (!this.endStation) {
        return this.$emit('message', {
          isError: true,
          message: 'Please select a station'
        });
      }
      this.endTime = this.getCurrentTime();
      try {
        await this.client.post('/api/trips', {
          breezecardNum: this.selectedCard.breezecardNum,
          tripFare: this.tripFare,
          startTime: this.startTime,
          startsAt: this.startStation.stopID,
          endsAt: this.endStation.stopID
        });

        this.$emit('tripCompleted');

        this.tripStarted = false;
        this.startStation = null;
        this.endStation = null;
        this.$emit('message', {
          isError: false,
          message: 'Trip completed. Thanks for choosing MARTA!'
        });
      } catch(e) {
        console.log(e);
      }
    },
    async loadStationData() {
      try {
        const { data: stations } = await this.client.get('/api/stations');
        this.stations = stations;
      } catch {
        console.log('Failed to load station data');
      }
    },
  },
  created() {
    this.loadStationData();
  },
}
</script>

<style scoped>
  button {
    width: 6rem;
  }
  .value-enter-active, .value-leave-active {
    transition: all 0.2s ease-in-out;
  }
  .value-enter, .value-leave-to {
    transform: translate3d(-5rem, 0, 0);
  }
  .control {
    max-width: calc(100% - 5rem) !important;
  }
  .select {
    z-index: 1;
  }
</style>
