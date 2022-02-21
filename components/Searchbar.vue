<template>
  <div class="search-bar-container">
    <input class="search-bar-input" type="text" placeholder="Enter Transaction ID or Address">
  </div>
</template>

<script>
export default {
  name: 'SearchBar'
}
</script>

<style lang="scss">
.search-bar-container {
  .search-bar-input {
    width: 100%;
    border-radius: 5px;
    height: 3rem;
    background-color: #191C1E;
  }
}
</style>