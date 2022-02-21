<template>
  <main id="default-layout">
    <!-- Sidebar -->
    <div id="side-bar">
      <sidebar />
    </div>
    <div id="right-content">
      <!-- Searchbar -->
      <div id="search-bar">
        <searchbar />
      </div>
      <div class="vd-2"></div>
      <!-- Main content -->
      <div id="main-content">
        <Nuxt />
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: 'DefaultLayout'
}
</script>

<style lang="scss">
#default-layout {
  display: flex;

  #side-bar {
    background-color: $bgSidebar;
    flex: 0 0 13.75rem;
    padding: 1rem;
    background-color: rgba(0,0,0, 0.2); /* Black w/opacity/see-through */
  }
}
</style>
