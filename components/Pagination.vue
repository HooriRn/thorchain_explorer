<template>
  <div class="pagination-container">
    <div class="nav-icons" @click="$emit('changePage', 0)">
      <angleDoubleLeft></angleDoubleLeft>
    </div>
    <div class="nav-icons" @click="$emit('changePage', page-1)">
      <angleLeft></angleLeft>
    </div>
    <div class="page">
      Page {{ pageNumber }} of {{ pageCount }}
    </div>
    <div class="nav-icons" @click="$emit('changePage', page+1)">
      <angleRight></angleRight>
    </div>
    <div class="nav-icons" @click="$emit('changePage', pageCount-1)">
      <angleDoubleRight></angleDoubleRight>
    </div>
  </div>
</template>

<script>
import angleDoubleLeft from '@/assets/images/angle-double-left.svg';
import angleLeft from '@/assets/images/angle-left.svg';
import angleRight from '@/assets/images/angle-right.svg';
import angleDoubleRight from '@/assets/images/angle-double-right.svg';

export default {
  name: 'Pagination',
  props: ['page', 'pageCount'],
  emits: {
    changePage(payload) {
      if (payload >= 0 && payload <= Number.parseInt(this.pageCount)) {
        return true;
      }
      else {
        return false;
      }
    }
  },
  components: {
    angleDoubleLeft,
    angleLeft,
    angleRight,
    angleDoubleRight
  },
  computed: {
    pageNumber() {
      return (Number.parseInt(this.page) ?? 0) + 1;
    }
  },
  methods: {
    changePage() {

    }
  }
}
</script>

<style lang="scss">
.pagination-container {
  display: flex;
  justify-content: center;
  margin-top: 1rem;

  .nav-icons {
    display: flex;
    align-items: center;
    cursor: pointer;
    margin: 0 .5rem;
    padding: .3rem;
    border-radius: .2rem;

    svg {
      fill: #9F9F9F;
      width: 1.2rem;
      height: 1.2rem;
    }

    &:hover {
        background-color: #191C1E;

      svg {
        fill: #e6e6e6;
      }
    }
  }
  
  .page {
    line-height: 1.8rem;
    margin: 0 .7rem;
  }
}
</style>