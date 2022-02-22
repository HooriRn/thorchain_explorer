<template>
  <div class="side-bar-container">
      <img class="logo" src="@/assets/images/thorchain.png" alt="">
      <div class="side-bar-lists">
        <button :class="[{active: index == 0}, 'side-bar-item']" v-for="(item, index) in sidebarLists" :key="index">
          {{item.name}}
        </button>
      </div>
  </div>
</template>

<script>
export default {
  name: 'SideBar',
  data() {
    return {
      sidebarLists: [
        {
          name: 'Overview'
        },
        {
          name: 'Nodes'
        },
        {
          name: 'Network'
        },
        {
          name: 'Transactions'
        },
        {
          name: 'Pools'
        }
      ]
    }
  }
}
</script>

<style lang="scss">
.side-bar-container {
  .logo {
    border-radius: .3rem;
    width: 2rem;
    height: 2rem;
    margin-bottom: 2.25rem;
  }

  .side-bar-lists {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .side-bar-item {
    cursor: pointer;
    display: block;
    background: transparent;
    border: none;
    margin-bottom: 1rem;
    color: $mainFontColor;

    &:hover {
      color: #e6e6e6;
    }

    &.active {
      color: #e6e6e6;
    }
  }
}
</style>