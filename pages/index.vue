<template>
  <div class="overview-container">
    <div class="stats-container">
      <stat-table header="Stats" :tableSettings="statsSettings"></stat-table>
    </div>
    <div class="network-container">
      <stat-table header="Network" :tableSettings="networkSettings"></stat-table>
    </div>
  </div>
</template>

<script>
import {networkQuery, runePriceQuery, volumeHistoryQuery} from '~/_gql_queries'

export default {
  name: "OverviewPage",
  data() {
    return {
      network: [],
      rune: '',
    };
  },
  computed: {
    networkSettings: function () {
      return [
        [
          {
            name: 'Bonding APY',
            value: this.stringToPercentage(this.network.bondingAPY)
          },
          {
            name: 'Liquidity APY',
            value: this.stringToPercentage(this.network.liquidityAPY)
          }
        ],
        [
          {
            name: 'Total Standby Bonded',
            value: this.$options.filters.currency(((this.network.bondMetrics?.standby?.totalBond ?? 0) / 10**8) * 1/this.rune.runePrice) ?? 0
          },
          {
            name: 'Total Active Bonded',
            value: this.$options.filters.currency(((this.network.bondMetrics?.active?.totalBond ?? 0) / 10**8) * 1/this.rune.runePrice) ?? 0
          }
        ],
        [
          {
            name: 'Active Node Count',
            value: this.network.activeNodeCount
          },
          {
            name: 'Standby Node Count',
            value: this.network.standbyNodeCount
          }
        ],
        [
          {
            name: 'Next Churn Height',
            value: this.$options.filters.number(this.network.nextChurnHeight, '0,0')
          }
        ],
        [
          {
            name: 'Pool Activation Countdown',
            value: this.$options.filters.number(this.network.poolActivationCountdown, '0,0')
          }
        ],
        [
          {
            name: 'Pool Share Factor',
            value: this.stringToPercentage(this.network.poolShareFactor)
          }
        ],
        [
          {
            name: 'Total Reserve',
            value: this.$options.filters.number((this.network.totalReserve ?? 0) / 10**8, '0,0')
          }
        ],
        [
          {
            name: 'Total Pooled Rune',
            value: this.$options.filters.number((this.network.totalPooledRune ?? 0) / 10**8, '0,0')
          }
        ],

      ]
    },
    statsSettings: function() {
      return [
        [
          {
            name: 'Daily Active Users',
            value: 10
          },
          {
            name: 'Monthly Active Users',
            value: 10
          },
        ]
      ]
    }
  },
  methods: {
    stringToPercentage(val) {
      return (Number.parseFloat(val ?? 0) * 100).toFixed(2).toString() + ' %'
    }
  },
  apollo: {
    $prefetch: false,

    network: networkQuery,
    rune: {
      query: runePriceQuery,
    },
    volumeHistoryQuery: {
      query: volumeHistoryQuery,
      update: data => data.volumeHistory,
      variables() {
        let d = new Date()
        let until = Math.round(Date.now() / 1000);
        let from = Math.round(d.setDate(d.getDate() - 7) / 1000);

        return { from, until }
      }
    },
  },
};
</script>

<style lang="scss">
.overview-container {
  display: flex;
  justify-content: space-between;
}

.stats-container,
.network-container {
  width: calc(50% - 1rem);
}
</style>
