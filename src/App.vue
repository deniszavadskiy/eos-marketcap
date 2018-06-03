<template>
  <div id="app">
    <h1 >EOS</h1>
    <p v-if="eos" class="coin-rank">#{{ eos.rank }}</p>
    <img src="./assets/eos_spinning_logo.gif" alt="coin-logo" class="coin-logo">
    <div v-if="eos" class="coin-data">
      <h2>${{ eos.quotes.USD.price.toFixed(2) }}</h2>
      <div class="coin-data_percent_change">
        <p>
          <span v-if="oneHourRise">😃</span><span v-else>😟</span>
          <b>1h</b>
          {{ eos.quotes.USD.percent_change_1h }}%
        </p>
        <p>
          <span v-if="dayRise">😃</span><span v-else>😟</span>
          <b>1d</b>
          {{ eos.quotes.USD.percent_change_24h }}%
        </p>
        <p>
          <span v-if="weekRise">😃</span><span v-else>😟</span>
          <b>1w</b>
          {{ eos.quotes.USD.percent_change_7d }}%
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { Observable } from 'rx';

export default {
  name: 'app',
  components: {},
  computed: {
    oneHourRise() {
      return this.eos.quotes.USD.percent_change_1h > 0;
    },
    dayRise() {
      return this.eos.quotes.USD.percent_change_24h > 0;
    },
    weekRise() {
      return this.eos.quotes.USD.percent_change_7d > 0;
    },
  },
  subscriptions() {
    return {
      eos: Observable
        .timer(0, 15000)
        .flatMap(() => this.$http.get('https://api.coinmarketcap.com/v2/ticker/1765/'))
        .map(({ data }) => data.data),
    };
  },
};
</script>

<style>
  body {
    background: linear-gradient(to right, #1d2b64, #f8cdda);
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: white;
    width: 300px;
    margin: 60px auto;
  }

  #app h1,
  #app .coin-rank {
    text-align: center;
    margin: 0;
  }

  .coin-logo {
    width: 300px;
  }

  .coin-data {
    width: 300px;
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }

  .coin-data h2 {
    text-align: center;
  }
</style>
