<template>
  <div class="network-container">
    <div style="width: 100%">
      <stat-table :tableSettings="networkOverview"></stat-table>
    </div>
    <div style="height: 1rem; width: 100%"></div>
    <div style="width: 50%">
      <stat-table :tableSettings="topActiveBonds"></stat-table>
    </div>
    <div style="width: 50%">
      <stat-table :tableSettings="topStandbyBonds"></stat-table>
    </div>
  </div>
</template>

<script>
import StatTable from '~/components/StatTable.vue'
export default {
  components: { StatTable },
  data() {
    return {
      networkOverview: [],
      topActiveBonds: [],
      topStandbyBonds: []
    }
  }
}
</script>

<style>
.network-container {
  display: flex;
}
</style>