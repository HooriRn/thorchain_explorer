<template>
  <div class="side-bar-container">
      <img class="logo" src="@/assets/images/thorchain.png" alt="">
      <div class="side-bar-lists">
        <template v-for="(item, index) in sidebarLists" >
          <button :class="[{active: index == 0}, 'side-bar-item']" :key="index">
            {{item.name}}
          </button>
        </template>
      </div>
      <div class="social-items">
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

export default {
  name: 'SideBar',
  components: {
    TwitterLogo,
    DiscordLogo,
    GithubLogo
  },
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
  display: flex;
  flex-direction: column;
  min-height: 100%;

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
    width: 100%;
    padding: .7rem;
    text-align: left;
    border-radius: .5rem;
    color: $mainFontColor;

    &:hover {
      background-color: #191c1e;
      color: #e6e6e6;
    }

    &.active {
      color: #e6e6e6;
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