import gql from 'graphql-tag';

const networkQuery = gql`query {
  network {
    bondingAPY
    activeBonds
    activeNodeCount
    liquidityAPY
    nextChurnHeight
    poolActivationCountdown
    poolShareFactor
    totalReserve
    standbyBonds
    standbyNodeCount
    totalPooledRune
    bondMetrics {
      active {
        totalBond
      }
      standby {
        totalBond
      }
    }
    blockRewards {
      blockReward
      bondReward
      poolReward
    }
  }
}
`

const volumeHistoryQuery = gql`query volumeHistory($from: Int64!, $until: Int64!) {
  volumeHistory(from: $from, until: $until, interval: HOUR) {
    meta {
      combined {
        count
        volumeInRune
        feesInRune
      }
      toRune {
        count
        volumeInRune
        feesInRune
      }
      toAsset {
        count
        volumeInRune
        feesInRune
      }
    }
    intervals {
      time
      combined {
        count
        volumeInRune
        feesInRune
      }
      toRune {
        count
        volumeInRune
        feesInRune
      }
      toAsset {
        count
        volumeInRune
        feesInRune
      }
    }
  }
}`

const bondMetrics = gql`query {
  bondMetrics: network {
    activeBonds
    standbyBonds
    activeNodeCount
    standbyNodeCount
    bondMetrics {
      active {
        medianBond
        minimumBond
        maximumBond
        averageBond
        totalBond
      }
      standby {
        medianBond
        minimumBond
        maximumBond
        averageBond
        totalBond
      }
    }
  }
}`

const runePriceQuery = gql`query runePrice {
  rune: pool (asset: "BNB.BUSD-BD1") {
    runePrice: price
  }
}`

const pools = gql`query {
  pools {
    asset
    status,
    volume24h,
    poolAPY,
    price
  }
}
`

const poolQuery = gql`query poolQuery($asset: String!, $from: Int64!, $until: Int64!){
  poolQuery: pool(asset: $asset) {
    asset,
    status,
    price,
    units,
    volume24h,
    poolAPY,
    stakes {
      assetStaked
      runeStaked
      poolStaked
    }
    depth {
      assetDepth,
      runeDepth,
      poolDepth,
    }
  },
  volumeHistory(
    from: $from,
    until: $until,
    interval: HOUR,
    pool: $asset
  ){
    meta{
      combined{
        count,
        volumeInRune,
        feesInRune
      },
      toRune{
        count,
        volumeInRune,
        feesInRune
      }
      toAsset{
        count,
        volumeInRune,
        feesInRune
      }
    },
    intervals{
      time,
      combined{
        count,
        volumeInRune,
        feesInRune
      },
      toRune{
        count,
        volumeInRune,
        feesInRune
      }
      toAsset{
        count,
        volumeInRune,
        feesInRune
      }
    }
  }
}`

export { networkQuery, volumeHistoryQuery, runePriceQuery, bondMetrics, pools, poolQuery }
