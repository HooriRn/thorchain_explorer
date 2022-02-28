<template>
  <div class="txs-wrapper">
    <div v-if="txs && txs.actions" class="transactions-container">
      <!-- transactions component -->
      <transactions :txs="txs"></transactions>
      <pagination :limit="10" :offset="offset" :count="count" @changePage="getActions"></pagination>
    </div>
    <div v-else class="loading">
      <BounceLoader color="#9F9F9F" size="3rem"/>
    </div>
  </div>
</template>

<script>
import Transactions from '~/components/Transactions.vue';
import BounceLoader from 'vue-spinner/src/BounceLoader.vue';

export default {
  components: { Transactions, BounceLoader },
  name: 'txsPage',
  data() {
    return {
      txs: undefined,
      offset: undefined,
      count: undefined
    }
  },
  methods: {
    getActions(offset=0) {
      this.offset = offset;
      this.$api.getTxs(this.offset)
      .then(res => {
        this.txs = res.data;
        this.count = res.data.count;
      })
      .catch(error => {
        console.error(error)
      })
    }
  },
  mounted() {
    this.getActions(0);
  }
}
</script>

<style>
.loading {
  display: flex;
  justify-content: center;
}
</style>