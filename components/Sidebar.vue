<template>
  <div class="side-bar-container" :class="{'mini': mini? true:false}">
      <img class="logo" src="@/assets/images/thorchain.png" alt="">
      <div class="side-bar-lists">
        <template v-for="(item, index) in sidebarLists" >
          <NuxtLink :to="item.link" :class="['side-bar-item']" :key="index">
            <component v-bind:is="item.icon" class="icon selected"></component>
            <component v-bind:is="item.unicon" class="icon unselected"></component>
            <span class="sidebar-text">{{item.name}}</span>
          </NuxtLink>
        </template>
      </div>
      <div class="social-items" v-show="!mini">
        <a href="https://twitter.com/THORChain">
          <TwitterLogo class="social-icon" />
        </a>
        <a href="https://discord.gg/KjPVnGy5jR">
          <DiscordLogo class="social-icon" />
        </a>
        <a href="https://github.com/HooriRn/thorchain_explorer">
          <GithubLogo class="social-icon" />
        </a>
      </div>
  </div>
</template>

<script>
import TwitterLogo from '~/assets/images/twitter-brands.svg';
import DiscordLogo from '~/assets/images/discord-brands.svg';
import GithubLogo from '~/assets/images/github-brands.svg';

import appsSelected from '~/assets/images/apps-selected.svg';
import appsUnselected from '~/assets/images/apps-unselected.svg';

import vectorSelected from '~/assets/images/vector-selected.svg';
import vectorUnselected from '~/assets/images/vector-unselected.svg';

import layersSelected from '~/assets/images/layers-selected.svg';
import layersUnselected from '~/assets/images/layers-unselected.svg';

import exchangeSelected from '~/assets/images/exchange-selected.svg';
import exchangeUnselected from '~/assets/images/exchange-unselected.svg';

import swimmerSelected from '~/assets/images/swimmer-selected.svg';
import swimmerUnselected from '~/assets/images/swimmer-unselected.svg';

export default {
  name: 'SideBar',
  props: ['mini'],
  components: {
    TwitterLogo,
    DiscordLogo,
    GithubLogo,
    appsSelected,
    appsUnselected,
    vectorSelected,
    vectorUnselected,
    layersSelected,
    layersUnselected,
    exchangeSelected,
    exchangeUnselected,
    swimmerSelected,
    swimmerUnselected
  },
  data() {
    return {
      sidebarLists: [
        {
          name: 'Overview',
          unicon: 'appsUnselected',
          icon: 'appsSelected',
          link: '/'
        },
        {
          name: 'Nodes',
          unicon: 'layersUnselected',
          icon: 'layersSelected',
          link: '/nodes'
        },
        {
          name: 'Network',
          unicon: 'vectorUnselected',
          icon: 'vectorSelected',
          link: '/network'
        },
        {
          name: 'Transactions',
          unicon: 'exchangeUnselected',
          icon: 'exchangeSelected',
          link: '/transactions'
        },
        {
          name: 'Pools',
          unicon: 'swimmerUnselected',
          icon: 'swimmerSelected',
          link: '/pools'
        }
      ]
    }
  }
}
</script>

<style lang="scss">
.side-bar-container {
  display: flex;
  flex-direction: column;
  min-height: 100%;

  &.mini {
    align-items: center;

    .sidebar-text {
      display: none;
    }

    .side-bar-item .icon {
      margin: 0;
    }
  }

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
    display: flex;
    background: transparent;
    border: none;
    width: 100%;
    padding: .7rem;
    text-align: left;
    border-radius: .5rem;
    color: $mainFontColor;
    color: inherit;
    text-decoration: none;
    line-height: 1.25rem;

    &:hover {
      background-color: #191c1e;
      color: #e6e6e6;
    }

    &.nuxt-link-exact-active {
      color: #e6e6e6;

      .icon.selected {
        display: block;
      }

      .icon.unselected {
        display: none;
      }
    }

    .icon {
      fill: #e6e6e6;
      margin-right: .5rem;
      height: 1.25rem;

      &.selected {
        display: none;
      }

      &.unselected {
        fill: #9f9f9f;
      }
    }
  }

  .social-items {
    margin-top: auto;
    display: flex;
    justify-content: space-around;
  }

  .social-icon {
    color: #9f9f9f;
    cursor: pointer;
    width: 1.5rem;
    height: 1.5rem;

    &:hover {
      color: #e6e6e6;
    }
  }
}
</style>