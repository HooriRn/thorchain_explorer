<template>
  <div class="constants-container">
    <stat-table :tableSettings="networkConstants"></stat-table>
  </div>
</template>

<script>
import StatTable from '~/components/StatTable.vue'
export default {
  components: { StatTable },
  data() {
    return {
      networkConstans: [],
    }
  }
}
</script>

<style>

</style>