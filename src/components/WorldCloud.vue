<template>
  <div id="WorldCloudGraph">
    <div id="toolTipWorld"></div>
  </div>
</template>

<script>
import * as d3 from 'd3';
import * as cloud from 'd3-cloud';
import WorldCloud from '../dataTest/WorldCloud.json';
import { useStore } from 'vuex'

export default {
  name: "WorldCloud",
  data: () => {
    return {
      dataset: WorldCloud,
      width: 0,
      height: 0,
      store: null,
      wordcloudGroup: null
    }
  },
  setup() {

  },
  methods: {
    draw() {
      const fill = d3.scaleOrdinal(d3.schemeCategory10)
      // 提取value属性的值，并使用Math.min()获取最小值
      const minValue = Math.min(...this.dataset.map(dict => dict.value));
      // 创建一个线性比例尺，将权重值映射到字体大小的范围
      const fontSizeScale = d3.scaleLinear()
        .domain([minValue, d3.max(this.dataset, d => d.value)]) // 输入的权重值范围
        .range([this.width / 28, this.width / 9]); // 输出的字体大小范围
      const svg = d3.select('#WorldCloudGraph').append('svg')
        .attr("id", "WorldCloudGraphSvg")
        .attr('width', this.width)
        .attr('height', this.height);
      const tooltip = d3.select('#toolTipWorld');
        // .append('div')
        // .style('id', 'tooltip_word')
        // .style('opacity', 0)
        // .style('position', 'absolute')
        // .style('background-color', 'white')
        // .style('height', '35px')
        // .style("width", '130px')
        // .style("display", 'flex')
        // .style("justify-content", "center")
        // .style("align-items", "center")
        // // .style("stroke", "#67696c")
        // .style("border", "1px solid #67696c")
        // .style("background-color", "rgba(248,244,244,0.66)")
        // .style("border-radius", "4px")
        // .style("font-size", "18px")
        // .style("color", "#67696c")
      // .style("background-color", "red")
      let drawGraph = (words) => {
        d3.select("#words").selectAll('text')
          .data(words)
          .enter()
          .append("g")
          .on('mouseover', function (event, d) {

            tooltip
              .style('visibility', "visible")
              .style('left', `${d.x - 40 + layout.size()[0] / 2}px`)
              .style('top', `${d.y - 30 + layout.size()[1] / 2}px`)
              .html(d.name +":"+ d.value+"次");
            d3.select(this)
                .style('cursor', 'pointer');
          })
          .on('mouseout', () => {
            console.log("我出去了")
            tooltip.style('visibility', "hidden");
            d3.select(this)
              .style('cursor', 'default');

          })
          .on('click', (event, d) => {
            tooltip.style('visibility', "hidden");
            this.$store.commit('changeProvince', d.name)
          })
          .append('text')
          .attr('font-size', d => `${d.size}px`)
          .attr('font-family', 'Impact')
          .attr('fill', (d, i) => fill(i))
          .attr('text-anchor', 'middle')
          .attr('transform', d => `translate(${d.x - 1}, ${d.y}) rotate(${d.rotate})`)
          .text(d => d.name)

      }

      const layout = cloud()//注意，这不是D3自带的API，是d3.layout.cloud.js中的API
        .size([this.width, this.height])
        .words(this.dataset)
        .padding(1) //每个词之间的间隔，不设置时默认为0
        .rotate(() => ~~(Math.random()) * 90) //~~双非按位取反运算符，功能类似floor()，但速度更快。
        .font('Impact')
        .fontSize(d => fontSizeScale(d.value))
        .on('end', drawGraph)
      svg.append('g')
        .attr("id", "words")
        .attr('transform', `translate(${layout.size()[0] / 2} ,${layout.size()[1] / 2})`)

      layout.start()


    }
  },

  mounted() {
    this.$store = useStore()
    // 获取宽度和高度
    this.width = document.getElementById('WorldCloudGraph').offsetWidth;
    this.height = document.getElementById('WorldCloudGraph').offsetHeight - 10;
    this.draw();

    //监听窗口变化
    window.addEventListener('resize', () => {
      document.getElementById('WorldCloudGraphSvg').remove();
      // 获取宽度和高度
      this.width = document.getElementById('WorldCloudGraph').offsetWidth;
      this.height = document.getElementById('WorldCloudGraph').offsetHeight - 10;
      this.draw();
    });
  }
}
</script>
<style scoped>
#WorldCloudGraph {
  position: relative;
  width: 100%;
  height: 100%;
  padding-top: 10px;
}
#toolTipWorld{
  position: absolute;
  max-width: 120px;
  border-style: solid;
  white-space: nowrap;
  z-index: 9999999;
  box-shadow: rgba(0, 0, 0, 0.2) 1px 2px 10px;
  background-color: rgb(250,250,250);
  border-width: 1px;
  border-radius: 4px;
  color: rgb(102, 102, 102);
  font: 13px "Microsoft YaHei";
  padding: 3px;
  top: 0;
  left: 0;
  border-color: rgb(255, 255, 255);
  pointer-events: none;
  transition: opacity 0.1s cubic-bezier(0.23, 1, 0.32, 1) 0s, visibility 0.2s cubic-bezier(0.23, 1, 0.32, 1) 0s, transform 0.4s cubic-bezier(0.23, 1, 0.32, 1) 0s;
  visibility:hidden;
}
</style>
