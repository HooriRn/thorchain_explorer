<template>
  <div class="constants-container">
    Constants component
    <stat-table :tableSettings="networkConstants"></stat-table>
  </div>
</template>

<script>
import StatTable from '~/components/StatTable.vue'
export default {
  components: { StatTable },
  data() {
    return {
      networkConstants: [],
    }
  }
}
</script>

<style>

</style>