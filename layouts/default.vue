<template>
  <main id="default-layout">
    <!-- Sidebar -->
    <div id="side-bar">
      <sidebar :mini="mini" />
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
  name: 'DefaultLayout',
  data() {
    return {
      mini: false
    }
  },
  methods: {
    resizedWindow() {
      // get smaller than lg
      if (document.body.offsetWidth < 992) {
        this.mini = true;
      }
      else {
        this.mini = false;
      }
    }
  },
  mounted() {
    this.resizedWindow();
    window.addEventListener('resize', () => {
      this.resizedWindow();
    });
  }
}
</script>

<style lang="scss">
#default-layout {
  display: flex;

  #side-bar {
    background-color: $bgSidebar;
    padding: 1rem;
    background-color: rgba(0,0,0, 0.2); /* Black w/opacity/see-through */

    @include lg {
      display: block;
      flex: 0 0 13.75rem;
    }
  }
}
</style>
