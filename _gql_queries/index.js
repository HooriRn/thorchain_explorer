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

export { networkQuery, volumeHistoryQuery }
