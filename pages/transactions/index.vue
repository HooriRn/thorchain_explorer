<template>
  <div class="transactions-container">
    <!-- transactions component -->
    <transactions v-if="txs && txs.actions" :txs="txs"></transactions>
    <pagination v-if="txs && txs.actions" :limit="10" :offset="offset" :count="count" @changePage="getActions"></pagination>
  </div> 
</template>

<script>
import Transactions from '~/components/Transactions.vue'
export default {
  components: { Transactions },
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

</style>