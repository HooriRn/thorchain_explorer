<template>
  <div class="tx-container">
    <div class="tx-header">Transaction</div>
    <div class="tx-id">{{tx.in[0].txID}}</div>
    <div class="tx-date">{{(new Date(tx.date/10**6)).toLocaleString()}}</div>
    <div class="tx-inner-container">
      <div class="in-container">
        <div class="bubble">In</div>
        <div class="tx" v-if="tx.in[0] && tx.in[0].txID">{{tx.in[0].txID.slice(0,4)}}...{{tx.in[0].txID.slice(-4)}}</div>
        <div class="break"></div>
        <div class="tx-amount" v-if="tx.in[0] && tx.in[0].coins[0]">
          <img class="asset-coin" :src="assetImage(tx.in[0].coins[0].asset)" alt="in-coin">
          <span>{{tx.in[0].coins[0].amount/10**8 | number('0,0.0000')}} {{tx.in[0].coins[0].asset}}</span>
        </div>
        <div class="break"></div>
        <div class="tx-address" v-if="tx.in[0].address">
          {{tx.in[0].address.slice(0,6)}}...{{tx.in[0].address.slice(-6)}}
        </div>
      </div>
      <div class="out-container" v-if="tx.out[0]">
        <div class="bubble">Out</div>
        <div class="tx" v-if="tx.out[0].txID">{{tx.out[0].txID.slice(0,4)}}...{{tx.out[0].txID.slice(-4)}}</div>
        <div class="break"></div>
        <div class="tx-amount" v-if="tx.out[0].coins[0]">
          <img class="asset-coin" :src="assetImage(tx.out[0].coins[0].asset)" alt="in-coin">
          <span>{{tx.in[0].coins[0].amount/10**8 | number('0,0.0000')}} {{tx.out[0].coins[0].asset}}</span>
        </div>
        <div class="break"></div>
        <div class="tx-address" v-if="tx.out[0].address">
          {{tx.out[0].address.slice(0,6)}}...{{tx.out[0].address.slice(-6)}}
        </div>
      </div>
      <div class="break"></div>
      <div class="extra-details">
        <div class="item-detail" v-if="tx.height">
          <div class="header">Block height</div>
          <div class="value">{{tx.height | number('0,0')}}</div>
        </div>
        <div class="item-detail" v-if="tx.status">
          <div class="header">Status</div>
          <div class="value">{{tx.status | capitalize}}</div>
        </div>
        <div class="item-detail" v-if="tx.type">
          <div class="header">Type</div>
          <div class="value">{{tx.type | capitalize}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { AssetImage } from '~/classes/assetImage';

export default {
  methods: {
    assetImage(assetStr) {
      try {
        return AssetImage(assetStr) ?? require('~/assets/images/unknown.png');
      } catch (error) {
        console.error(error);
        return require('~/assets/images/unknown.png');
      }
    }
  },
  async asyncData({params, $api}) {
    const txid = params.txid;
    const tx = await $api.getTx(txid)
    return { txid, tx: tx.data.actions[0] }
  }
}
</script>

<style lang="scss" scoped>
.tx-container {
  .tx-header {
    font-size: 1.5rem;
    color: #e6e6e6;
  }

  .tx-id {
    margin: .4rem 0;
    color: #63FDD9;
  }

  .tx-date {
    color: #e6e6e6;
  }

  .tx-inner-container {
    display: flex;
    flex-wrap: wrap;
    background-color: #191C1E;
    padding: 1rem;
    border: 1px solid #263238;
    border-radius: .3rem;
    margin: .5rem 0;
    width: 100%;

    .in-container, .out-container {
      display: flex;
      align-items: flex-start;
      flex-wrap: wrap;
      width: 50%;
    }

    .tx {
      line-height: 1.2rem;
      color: #63FDD9;
    }

    .bubble {
      color: #e6e6e6;
      padding: 0 .5rem;
      border-radius: .2rem;
      display: inline-block;
      background-color: #2196F3;
      margin-right: .5rem;
    }

    .out-container .bubble {
      background-color: #4CAF50;
    }

    .tx-amount {
      display: flex;
      align-items: center;
      margin: .5rem 0;
      color: #e6e6e6;
      
      span {
        line-height: 1.2rem;
        margin-left: .5rem;
      }
    }

    .asset-coin {
      width: 1.5rem;
    }

    .tx-address {
      color: #63FDD9;
    }

    .extra-details {
      display: flex;
      flex: 1 0;
      justify-content: space-between;
      padding: 1rem;
      margin-top: 2rem;

      .item-detail {
        display: flex;
        flex-direction: column;
        flex: 1;

        .header {
          font-size: .8rem;
        }

        .value {
          color: #e6e6e6;
        }
      }
    }
  }
}
</style>