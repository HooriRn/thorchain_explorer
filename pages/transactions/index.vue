<template>
  <div class="transactions-container">
    <!-- transactions component -->
    <transactions v-if="txs && txs.actions" :txs="txs"></transactions>
    <pagination v-if="txs && txs.actions" :page="page" :pageCount="txs.count" @changePage="getActions"></pagination>
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
      page: undefined
    }
  },
  methods: {
    getActions(page=0) {
      if (page < 0 || page == this.page || page > Number.parseInt(this.txs?.count)-1) {
        return false
      }
      this.page = page;
      this.$api.getTxs(page)
      .then(res => {
        this.txs = res.data;
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