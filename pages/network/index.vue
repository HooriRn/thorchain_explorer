<template>
  <div class="network-index-container">
    <div style="width: 100%">
      <stat-table :tableSettings="networkSettings" header="Network Overview"></stat-table>
    </div>
    <div style="width: 50%">
      <stat-table :tableSettings="topActiveBonds"></stat-table>
    </div>
    <div style="width: 50%">
      <stat-table :tableSettings="topStandbyBonds"></stat-table>
    </div>
  </div>
</template>

<script>
import {networkQuery, runePriceQuery} from '~/_gql_queries'
import StatTable from "~/components/StatTable.vue";

export default {
  components: { StatTable },
  data() {
    return {
      network: [],
      rune: [],
      topActiveBonds: [],
      topStandbyBonds: [],
    };
  },
  //This could be mixin
  watch: {
    rune: function() {
      if (this.rune && this.rune.runePrice) {
        this.$store.commit('setRunePrice', (1/this.rune.runePrice))
      }
    }
  },
  apollo: {
    $prefetch: false,
    network: networkQuery,
    rune: {
      query: runePriceQuery,
    },
  },
  computed: {
    networkSettings: function () {
      return [
        [
          {
            name: "Bonding APY",
            value: this.$options.filters.percent(this.network.bondingAPY, 2),
            filter: true,
          },
          {
            name: "Liquidity APY",
            value: this.$options.filters.percent(this.network.liquidityAPY, 2),
            filter: true,
          },
        ],
        [
          {
            name: "Next Churn Height",
            value: this.network.nextChurnHeight,
          },
          {
            name: "Pool Activation Countdown",
            value: this.network.poolActivationCountdown,
          },
          {
            name: "Pool Share Factor",
            value: this.$options.filters.percent(this.network.poolShareFactor),
            filter: true,
          },
        ],
        [
          {
            name: "Total Reserve",
            value: (this.network.totalReserve ?? 0) / 10 ** 8,
            usdValue: true
          },
          {
            name: "Total Pooled Rune",
            value: (this.network.totalPooledRune ?? 0) / 10 ** 8,
            usdValue: true
          },
        ],
        [
          {
            name: 'Block Reward / Day',
            value: ((this.network.blockRewards?.blockReward/10**8) ?? 0) * (5256000 / 365),
            usdValue: true
          },
          {
            name: 'Block Bond Reward / Day',
            value: ((this.network.blockRewards?.bondReward/10**8) ?? 0) * (5256000 / 365),
            usdValue: true
          },
          {
            name: 'Block Pool Reward / Day',
            value: ((this.network.blockRewards?.poolReward/10**8) ?? 0) * (5256000 / 365),
            usdValue: true
          },
          {
            name: 'Block Reward / Node / Month',
            value: ((this.network.blockRewards?.bondReward/10**8)/(this.network.activeNodeCount) ?? 0) * (5256000 / 12),
            usdValue: true
          }
        ]
      ];
    },
  },
};
</script>

<style>
.network-index-container {
  display: flex;
  flex-wrap: wrap;
}
</style>