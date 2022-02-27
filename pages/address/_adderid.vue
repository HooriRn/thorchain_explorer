<template>
  <div class="address-container">
    <div class="address-header">Address</div>
    <div class="address-name">{{address}}</div>
    <div style="margin: 1rem 0"></div>
    <transactions v-if="addrTxs && addrTxs.actions" :txs="addrTxs"></transactions>
    <pagination v-if="addrTxs && addrTxs.actions" :page="page" :pageCount="addrTxs.count" @changePage="getActions"></pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      page: 0,
    }
  },
  methods: {
    getActions(page=0) {
      if (page < 0 || page == this.page || page > Number.parseInt(this.addrTxs?.count)-1) {
        return false
      }
      this.page = page;
      this.$api.getAddress(this.address, page)
      .then(res => {
        this.addrTxs = res.data;
      })
      .catch(error => {
        console.error(error)
      })
    }
  },
  async asyncData({params, $api}) {
    const address = params.adderid;
    const addrTxs = await $api.getAddress(address, 0);
    return { address, addrTxs: addrTxs.data }
  }
}
</script>

<style lang="scss" scoped>
.address-container {
  .address-header {
    font-size: 1.5rem;
    color: #e6e6e6;
  }
  .address-name {
    margin: .4rem 0;
    color: #63FDD9;
  }
}
</style>