<template>
  <div class="stat-table">
    <div class="stat-header">
      <div class="stat-header-text">{{ header }}</div>
      <button v-if="button" class="stat-header-btn"></button>
    </div>
    <div class="stat-table-container">
      <div class="stat-table-row" v-for="(row, ri) in tableSettings" :key="ri">
        <div
          class="stat-table-item"
          v-for="(colItem, ci) in row"
          :key="ci + ',' + ri"
        >
          <div class="col-header">
            {{ colItem.name }}
          </div>
          <div class="col-value">
            {{ colItem.value }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "statTable",
  props: {
    header: String,
    tableSettings: Array,
  },
};
</script>

<style lang="scss">
.stat-table {
  width: 100%;

  .stat-header {
    display: flex;
    justify-content: space-between;
    font-weight: bold;
    padding: 1rem;

    .stat-header-btn {
      background-color: transparent;
      border: none;
    }
  }

  .stat-table-container {
    background-color: rgb(25, 28, 30);
    border-radius: 5px;
    border: 2px solid #263238;
  }

  .stat-table-row {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #263238;

    &:last-of-type {
      border-bottom: none;
    }

    .stat-table-item {
      flex: 1 0;
      padding: 0.5rem 1rem;

      .col-value {
        color: #e6e6e6;
      }

      .col-header {
        font-size: 0.75rem;
      }
    }
  }
}
</style>