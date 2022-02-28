<template>
  <div>
    <div v-if="pool.poolQuery" class="pool-container">
      <img class="asset-icon" :src="assetImage(pool.poolQuery.asset)">
      <div class="pool-header">{{pool.poolQuery.asset}}</div>
      <!-- nuxt child -->
      <div class="pool-overview">
        <div class="pool-detail-header">
          <div class="item">
            <div class="header">Asset Price</div>
            <div class="value">{{Number.parseFloat(pool.poolQuery.price)*(1/rune.runePrice) | currency}}</div>
          </div>
          <div class="item">
            <div class="header">Pool APY</div>
            <div class="value">{{Number.parseFloat(pool.poolQuery.poolAPY) | percent}}</div>
          </div>
          <div class="item">
            <div class="header">Status</div>
            <div class="value">{{pool.poolQuery.status | capitalize}}</div>
          </div>
          <div class="item">
            <div class="header">Asset Depth</div>
            <div class="value">{{pool.poolQuery.depth.assetDepth/10**8 | number('0,0')}} <span style="font-size: .7rem">{{assetString(pool.poolQuery.asset)}}</span></div>
          </div>
          <div class="item">
            <div class="header">Rune Depth</div>
            <div class="value">{{pool.poolQuery.depth.runeDepth/10**8 | number('0,0')}} <span style="font-size: .7rem">THOR.RUNE</span></div>
          </div>
          <div class="item">
            <div class="header">Units</div>
            <div class="value">{{pool.poolQuery.units/10**8 | number('0,0.00')}}</div>
          </div>
        </div>
        <volume-chart :chartSettings="pool.volumeHistory"></volume-chart>
        <div class="pool-swap-detail">

        </div>
      </div>
    </div>
    <div v-else class="loading">
      <BounceLoader color="#9F9F9F" size="3rem"/>
    </div>
  </div>
</template>

<script>
import { poolQuery, runePriceQuery } from '~/_gql_queries';
import BounceLoader from 'vue-spinner/src/BounceLoader.vue';
import { AssetImage } from '~/classes/assetImage';
import { assetFromString } from '@xchainjs/xchain-util';

export default {
  async asyncData({ params }) {
    return {poolName: params.poolName}
  },
  components: {
    BounceLoader,
    VolumeChart: () => {
      if(process.client) {
        return import('~/components/page_components/volumeChart.vue')
      }
    }
  },
  methods: {
    assetImage(assetStr) {
      try {
        return AssetImage(assetStr) ?? require('~/assets/images/unknown.png');
      } catch (error) {
        return require('~/assets/images/unknown.png');
      }
    },
    assetString(assetStr) {
      const {chain, ticker} = assetFromString(assetStr);
      return `${chain}.${ticker}`
    }
  },
  data() {
    return {
      pool: [],
    }
  },
  apollo: {
    $prefetch: false,
    rune: runePriceQuery,
    pool: {
      query: poolQuery,
      update(data) {
        return data
      },
      variables() {
        let d = new Date()
        const until = Math.round(Date.now() / 1000);
        const from = Math.round(d.setDate(d.getDate() - 7) / 1000);

        return {until, from, asset: this.poolName}
      }
    }
  },
  watch: {
    rune: function() {
      if (this.rune && this.rune.runePrice) {
        this.$store.commit('setRunePrice', (1/this.rune.runePrice))
      }
    }
  }
}
</script>

<style lang="scss">
.pool-container {
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  .asset-icon {
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    margin-right: .4rem;
  }

  .pool-header {
    font-weight: bold;
    color: #e6e6e6;
    font-size: 1.2rem;
  }

  .pool-overview {
    margin-top: 1rem;
    width: 100%;
    display: flex;
    flex-direction: column;
    background-color: #191C1E;
    border: 1px solid #263238;
    padding: 1rem;
    border-radius: .4rem;

    .chart-wrapper {
      border-color: transparent;
    }
  }

  .pool-detail-header {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(10rem, 1fr));
    grid-gap: .5rem;

    .item {

      .header {
        font-size: .8rem;
      }

      .value {
        color: #e6e6e6;
      }
    }
  }
}

.loading {
  display: flex;
  justify-content: center;
}
</style>