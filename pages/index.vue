<template>
  <div class="overview-container">
    <div class="stats-container">
      <stat-table header="Stats" :tableSettings="tableSettings"></stat-table>
    </div>
    <div class="network-container">
      <stat-table header="Network" :tableSettings="tableSettings"></stat-table>
    </div>
  </div>
</template>

<script>
import {networkQuery, volumeHistoryQuery} from '~/_gql_queries'

export default {
  name: "IndexPage",
  data() {
    return {
      tableSettings: [
        [
          {
            name: "Daily Active Users",
            value: 248,
          },
          {
            name: "Monthly Active Users",
            value: 5045,
          },
        ],
        [
          {
            name: "Daily Active Users",
            value: 248,
          },
          {
            name: "Monthly Active Users",
            value: 5045,
          },
        ],
      ],
    };
  },
  apollo: {
    $prefetch: false,

    network: networkQuery,

    volumeHistoryQuery: {
      query: volumeHistoryQuery,
      update: data => data.volumeHistory,
      variables() {
        let d = new Date()
        let until = Math.round(Date.now() / 1000);
        let from = Math.round(d.setDate(d.getDate() - 7) / 1000);

        return { from, until }
      }
    },
  },
};
</script>

<style lang="scss">
.overview-container {
  display: flex;
  justify-content: space-between;
}

.stats-container,
.network-container {
  width: calc(50% - 1rem);
}
</style>
