<template>
  <div class="address-container">
    <div class="address-header">Address</div>
    <div class="address-name">{{address}}</div>
    <div style="margin: 1rem 0"></div>
    <transactions v-if="addrTxs && addrTxs.actions" :txs="addrTxs"></transactions>
    <pagination v-if="addrTxs && addrTxs.actions && count" :limit="10" :offset="offset" :count="count" @changePage="getActions"></pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      offset: 0,
      count: undefined
    }
  },
  methods: {
    getActions(offset=0) {
      this.offset = offset;
      this.$api.getAddress(this.address, this.offset)
      .then(res => {
        this.addrTxs = res.data;
        this.count = res.data.count;
      })
      .catch(error => {
        console.error(error)
      })
    }
  },
  async asyncData({params, $api}) {
    const address = params.adderid;
    const addrTxs = await $api.getAddress(address, 0);
    const count = addrTxs.data.count;
    return { address, addrTxs: addrTxs.data, count }
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