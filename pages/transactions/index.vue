<template>
  <div class="transactions-container">
    <!-- transactions component -->
    <transactions v-if="txs && txs.actions" :txs="txs"></transactions>
    <pagination></pagination>
  </div> 
</template>

<script>
import Transactions from '~/components/Transactions.vue'
export default {
  components: { Transactions },
  name: 'txsPage',
  data() {
    return {
      txs: undefined
    }
  },
  mounted() {
    this.$api.getTxs()
    .then(res => this.txs = res.data)
    .catch(error => {
      console.log(error)
    })
  }
}
</script>

<style>

</style>