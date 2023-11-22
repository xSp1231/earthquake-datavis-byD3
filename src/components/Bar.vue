<template>
  <div id="BarGraph"></div>
</template>

<script>
import * as d3 from 'd3';
export default {
  name: "Bar",
  data: () => {
    return {
      width: 0,
      height: 0
    }
  },
  methods: {
    draw() {
      const svg = d3.select('#BarGraph').append('svg').attr("id", "BarGraphSvg").attr('width', this.width).attr('height', this.height);
      const width = svg.attr('width');
      const height = svg.attr('height');
      const margin = { top: 20, right: 70, bottom: 30, left: 50 };
      const innerWidth = width - margin.left - margin.right;
      const innerHeight = height - margin.top - margin.bottom;
      const mainGroup = svg.append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`)
      const xValue = d => d.globalsale;
      const yValue = d => d.platform;
      const xScale = d3.scaleLinear();
      const yScale = d3.scaleBand();
      const colorScale = d3.scaleOrdinal();
      let xAxis, yAxis;
      let xAxisGroup, yAxisGroup;
      mainGroup.append('text').attr('fill', 'black').attr('font-size', '2em')
        .attr('x', 1340).attr('y', 650).attr('id', 'yeartext');
      const formatPercent = d3.format(".2f");

      const render = async function (data) {
        console.log(data)
        // 按年份分组数据
        const groupedData = d3.group(data, d => d.year);

        for (const yearData of groupedData.values()) {
          // 按销售额排序
          yearData.sort((a, b) => b.globalsale - a.globalsale);
          // 仅保留排名前6的数据
          const topPlatforms = yearData.slice(0, 6);

          // 计算新的比例尺域
          yScale.domain(topPlatforms.map(yValue));
          xScale.domain([0, d3.max(topPlatforms, xValue)]);

          // 更新轴和标题
          xAxisGroup.transition()
            .duration(1000) // 过渡的持续时间
            .call(xAxis);

          yAxisGroup.transition()
            .duration(1000) // 过渡的持续时间
            .call(yAxis);

          // 更新矩形和数据文本
          const rects = mainGroup.selectAll('rect').data(topPlatforms, d => d.platform);
          rects.exit().remove();
          rects.enter()
            .append('rect')
            .merge(rects)
            .transition()
            .duration(1000)
            .attr('width', d => xScale(xValue(d)))
            .attr('y', d => yScale(yValue(d)))
            .attr('height', yScale.bandwidth())
            .attr('fill', d => colorScale(yValue(d)));

          const texts = mainGroup.selectAll('.datatext').data(topPlatforms, d => d.platform);
          texts.exit().remove();
          texts.enter()
            .append('text')
            .attr('class', 'datatext')
            .attr('alignment-baseline', 'central')
            .merge(texts)
            .transition()
            .duration(1000)
            .attr('x', d => 3 + xScale(xValue(d)))
            .attr('y', d => yScale.bandwidth() / 2 + yScale(yValue(d)))
            .tween("text", function (d) {
              var i = d3.interpolate(this.textContent, d.globalsale);
              return function (t) {
                this.textContent = formatPercent(i(t));
              };
            });
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      }

      /* 
        Loading data and preprocessing data. 
        Note that you can also preprocessing data in your own way using your prefered language, e.g., Python. 
      */
      d3.csv('pgy.csv').then(async data => {
        data = data.map(d => {
          return {
            "platform": d.platform,
            "globalsale": +(d.globalsale),
            "year": +(d.year)
          }
        })
        console.log(data)
        // get all years:
        const years = Array.from(new Set(data.map(d => d.year)));
        years.sort();
        // get platforms:
        const platforms = Array.from(new Set(data.map(yValue)));
        // colors:
        colorScale.domain(platforms);
        const sp = d3.scalePoint().domain(platforms).range([0, 1]);
        colorScale.range(platforms.map(d => d3.interpolateSpectral(sp(d))));
        // calculationg initial scales: 
        yScale.range([0, innerHeight]).padding(0.1);
        xScale.range([0, innerWidth]);
        // adding axes: 
        xAxis = d3.axisBottom(xScale);
        yAxis = d3.axisLeft(yScale);
        xAxisGroup = mainGroup.append('g').call(xAxis);
        yAxisGroup = mainGroup.append('g').call(yAxis);
        xAxisGroup.attr('transform', `translate(${0}, ${innerHeight})`);
        // titles of axes: 
        yAxisGroup.append('text').attr('class', 'axisTitle').text('Platform')
          .attr('transform', 'rotate(-90)').attr('x', -innerHeight / 2).attr('y', -60);
        d3.selectAll('.axisTitle').attr('text-anchor', "middle").attr('fill', 'black').attr('font-size', '2em');
        // font-size of texts of axes: 
        d3.selectAll('.tick text').attr('font-size', '1.5em')
        data.sort((a, b) => b.globalsale - a.globalsale);
        for (let i = 0; i < years.length; i++) {
          const yearText = svg.append('text')
            .attr("id", 'yearText')
            .attr('x', width - margin.right / 6)
            .attr('y', height - margin.bottom + 10)
            .attr('text-anchor', 'end')
            .attr('alignment-baseline', 'middle')
            .style('font-weight', 'bold') // 设置字体粗细
            .style('font-size', '20px') // 设置字体大小
            .text(years[i]);
          await render(data.filter(d => d.year === years[i]));
          yearText.remove();
          // console.log("数据", data.filter(d => d.year === years[i]).sort((a, b) => b.globalsale - a.globalsale).slice(0, 6))
          if (i == years.length - 1) i = -1;
        }
      })
    }
  },
  mounted() {
    this.width = document.getElementById('BarGraph').offsetWidth;
    this.height = document.getElementById('BarGraph').offsetHeight;
    this.draw();
    //监听窗口变化
    window.addEventListener('resize', () => {
      document.getElementById('BarGraphSvg').remove();
      // 获取宽度和高度
      this.width = document.getElementById('BarGraph').offsetWidth;
      this.height = document.getElementById('BarGraph').offsetHeight;
      this.draw();
    });
  }
}
</script>

<style scoped>
#BarGraph {
  width: 100%;
  height: 100%;
  background-color: aliceblue;
  position: relative;
}
</style>
