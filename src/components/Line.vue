<template>
  <div class="lineGraph" ref="chartContainer"></div>
</template>
<script setup>


import * as d3 from 'd3';
import { onMounted, ref } from 'vue';

const chartContainer = ref(null);

onMounted(() => {
  drawLineChart();
});

const drawLineChart = () => {
  const container = chartContainer.value;
  const width = container.offsetWidth;
  const height = container.offsetHeight;
  console.log("width is ",chartContainer.value);
  console.log("width is ",width);
  console.log("height is ",height);

  const svg = d3.select(container).append('svg')
      .attr('width', width)
      .attr('height', height);
  const margin={top:15,bottom:15,left:15,right:15}

  const data = [
    { x: 2012, y: 7 },
    { x: 2013, y: 5 },
    { x: 2014, y: 3 },
    { x: 2015, y: 8 },
    { x: 2016, y: 11 },
    { x: 2017, y: 5 },
    { x: 2018, y: 24},
    { x: 2019, y: 8 },
    { x: 2020, y:12},
    { x: 2021, y: 5 },
  ];
  const year=Array.from(d3.map(data, d => d.x)) //x轴数据
  console.log("year is ",year)

  // 定义 x 和 y 的比例尺
  const xScale = d3.scaleBand().domain(year).range([0, width-margin.right-margin.left]);
  console.log("xaxis",xScale(2012))
  const yScale = d3.scaleLinear().domain([0, d3.max(data, d => d.y)]).range([height-margin.bottom-margin.top, 0]); //值小 height大

  // 定义折线生成器  调用的时候传入data即可
  const line = d3.line()
      .x(d => xScale(d.x))
      .y(d => yScale(d.y));

  console.log(line(data))
  //定义坐标轴
  const xAxis = d3.axisTop(xScale).ticks(10)
  const yAxis = d3.axisRight(yScale)

  const g=svg.append('g').attr('transform',`translate(${margin.left}, ${margin.top})`).attr('id','main')
  //x轴绘制 相对位置
  g.append('g').attr('transform', `translate(0, ${height - margin.bottom-margin.top})`).call(xAxis);
  // //y轴绘制
  g.append('g').attr('transform', `translate(0, 0)`).call(yAxis)
  //标记数据点
  g.append('g').selectAll('circle')
      .data(data)
      .enter()
      .append('circle')
      .attr('r', 3)
      .attr('cx', d => xScale(d.x))
      .attr('cy', d => yScale(d.y));
  //绘制折线
  g.append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-width', 2)
      .attr('d', line);




};
</script>



<style scoped>
.lineGraph{
  width: 100%;
  height: 100%;
  margin: 0;
  background-color: #ebecef;
}
</style>
