<template>
  <div class="chart-wrapper">
    <div class="chart-header">Volume <span style="color: #9F9F9F">(USD)</span></div>
    <div v-show="chartSettings" class="chart"></div>
    <div v-if="!chartSettings">Fetching Data...</div>
  </div>
</template>

<script>
import uPlot from 'uplot';
import 'uplot/dist/uPlot.min.css';
import { mapGetters } from 'vuex';

export default {
  name: 'chartComponent',
  props: {
    chartSettings: Array | Object
  },
  data() {
    return {
      uPlot: null
    }
  },
  computed: {
    ...mapGetters({
      runePrice: 'getRunePrice'
    })
  },
  methods: {
    getSize() {
      //TODO: change fixed width with relative size
      return {
        width: document.body.offsetWidth - 332,
        height: 340
      }
    },
    fillData() {
      let time = [];
      let total = [];
      let rune = [];
      let assets = [];
      this.chartSettings?.intervals.forEach(interval => {
        let date = new Date(interval.time * 1000)
        time.push(interval.time);
        total.push((interval.combined.volumeInRune) / 10**8)
        rune.push((interval.toRune.volumeInRune) / 10**8)
        assets.push((interval.toAsset.volumeInRune) / 10**8)
      });

      let data = [time, total, rune, assets];
      this.uPlot.setData(data);
    },
    tooltipGenerator(u, idx) {
      let tooltip = document.querySelector('.tooltip');
      tooltip.innerHTML = '';
      let dc = uPlot.fmtDate('{h}{AA} {YYYY}/{MM}/{DD}')
      let vals = [u.data[0][idx], u.data[1][idx], u.data[2][idx], u.data[3][idx]]
      vals.forEach((v, id) => {
        // console.log(u.series[id]._stroke)
        let d = document.createElement('div');
        d.classList.add('legend-item');
        if (id == 0) {
          let dt = new Date(Number.parseInt(v) * 1000);
          d.innerHTML = `
            <span class='value'>${dc(dt)}</span>
          `
        }
        else {
          d.innerHTML = `
            <div class='legend-fill' style='background-color: ${u.series[id]._stroke}; display: inline-block;'></div>
            <span>${u.series[id].label}</span>
            <span class='value'>${this.$options.filters.currency(v * this.runePrice, '$', 0)}</span>
          `
        }
        tooltip.appendChild(d);
      })
    },
    update(u) {
      const { left, top, idx } = u.cursor;
      let tooltip = document.querySelector('.tooltip');
      tooltip.style.transform = "translate(" + (left + 10) + "px, " + (top + 5) + "px)";

      if (idx) {
        // console.log(u.data[0][idx], u.data[1][idx], u.data[2][idx], u.data[3][idx])
        this.tooltipGenerator(u, idx);
      }
    },
    legendAsTooltipPlugin({ className, style = { backgroundColor:"rgb(46, 46, 46)", color: "#e6e6e6" } } = {}) {
      let legendEl;
      let tooltip;

      //TODO: delete extra legendEls
      function init(u, opts) {
        //deleting legend
        legendEl = u.root.querySelector(".u-legend");
        legendEl.remove();
        
        const overEl = u.over;
        overEl.style.overflow = "visible";

        //tooltip
        tooltip = document.createElement("div");
        tooltip.classList.add('tooltip');

        // move legend into plot bounds
        overEl.appendChild(tooltip);

        // show/hide tooltip on enter/exit
        overEl.addEventListener("mouseenter", () => {tooltip.style.display = "block";});
        overEl.addEventListener("mouseleave", () => {tooltip.style.display = "none";});
      }

      return {
        hooks: {
          init: init,
          setCursor: this.update,
        }
      };
    }
  },
  mounted() {
    const { spline } = uPlot.paths;

    let opts = {
      ...this.getSize(),
      tzDate: ts => uPlot.tzDate(new Date(ts * 1e3), 'Etc/UTC'),
      plugins: [
        this.legendAsTooltipPlugin()
      ],
      axes: [
        {
          show: true,
          labelFont: "bold 9px ProductSans",
          stroke: "#9F9F9F",
          grid: {
            show: false,
          },
          ticks: {
            show: false,
          }
        },
        {
          show: false
        }
      ],
      scales: {
        x: {
          time: true
        },
        y: {
        }
      },
      series: [
        {},
        {
          label: "Total",
          stroke: "rgb(255, 177, 78)",
          fill: "rgb(255, 177, 78, .4)",
          width: 2,
          paths: spline(),
        },
        {
          label: "Asset Volume",
          stroke: "rgb(234, 95, 148)",
          fill: "rgb(234, 95, 148, .4)",
          width: 2,
          paths: spline(),
        },
        {
          label: "RUNE Volume",
          stroke: "rgb(54, 176, 121)",
          fill: "rgb(54, 176, 121, .4)",
          width: 2,
          paths: spline(),
        },
      ],
    };

    this.uPlot  = new uPlot(opts, null, document.querySelector('.chart'));
    this.chartSettings? this.fillData() : console.log('data not yet reached');

    function throttle(cb, limit) {
      var wait = false;

      return () => {
        if (!wait) {
          requestAnimationFrame(cb);
          wait = true;
          setTimeout(() => {
            wait = false;
          }, limit);
        }
      }
    }

    window.addEventListener("resize", e => {
      this.uPlot.setSize(this.getSize());
    });
  },
  watch: {
    chartSettings: function() {
      //TODO: find better way maybe!
      this.fillData();
    }
  }
}
</script>

<style lang="scss">
.chart-wrapper {
  background-color: rgb(25, 28, 30);
  border-radius: 5px;
  border: 2px solid #263238;
  padding: 1rem;

  .chart-header {
    color: #e6e6e6;
  }
}

.tooltip {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 100;
  display: none;

  display: flex;
  flex-direction: column;
  padding: .2rem;
  background: rgb(46, 46, 46);
  color: #e6e6e6;

  .legend-item {
    display: flex;
    align-items: center;
    font-size: .7rem;
    padding: 0 .1rem;

    .legend-fill {
      width: 5px;
      height: 5px;
      border-radius: 50%;
      margin-right: 5px;
    }

    .value {
      font-weight: bold;
      margin-left: 5px;
    }
  }
}
</style>