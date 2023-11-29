<template>
  <div style="height: 10%;display: flex;justify-content: center;align-items: center;">
    <h4 style="  font-size: 17px;  font-weight: bold;  color: #a19f9f;">{{ store.state.WorldCloud }}近十年地震次数折线图</h4>
  </div>
  <div id="lineGraph"></div>
</template>
<script setup>
import * as d3 from 'd3';
import { onMounted, ref, watch } from 'vue';
import { useStore } from 'vuex'
import dataset from '../dataTest/line.json';
const store = useStore()
const width = ref(0);
const height = ref(0);
watch(
  () => store.state.WorldCloud, // 表达式，这里是你要监听的state变量
  (newVal, oldVal) => {
    document.getElementById('lineSvg').remove();
    console.log("被执行了")
    drawLineChart();
  },
  { deep: true, immediate: false }
);
onMounted(() => {
  width.value = document.getElementById('lineGraph').offsetWidth;
  height.value = document.getElementById('lineGraph').offsetHeight;
  drawLineChart();
});

//监听窗口变化
window.addEventListener('resize', () => {
  console.log("获取元素 ", document.getElementById('lineSvg'))
  document.getElementById('lineSvg').remove();
  // 获取宽度和高度
  width.value = document.getElementById('lineGraph').offsetWidth;
  height.value = document.getElementById('lineGraph').offsetHeight;
  drawLineChart();
});


const drawLineChart = () => {
  const svg = d3.select("#lineGraph").append('svg')
    .attr("id", "lineSvg")
    .attr('width', width.value)
    .attr('height', height.value);
  const margin = { top: 15, bottom: 25, left: 40, right: 15 }

  const data = dataset[store.state.WorldCloud];
  console.log("line", dataset[store.state.WorldCloud])
  console.log("收到", store.state.WorldCloud)
  const yValues = data.map(d => d.y); // 提取所有y值
  const avgY = d3.mean(yValues); // 计算平均值

  // console.log("震级平均值", avgY); // 输出平均值

  // 定义 x 和 y 的比例尺
  const xScale = d3.scaleLinear().domain([d3.min(data, d => d.x), d3.max(data, d => d.x)]).range([0, width.value - margin.right - margin.left]);

  const yScale = d3.scaleLinear().domain([0, d3.max(data, d => d.y)]).range([height.value - margin.bottom - margin.top, 0]); //值小 height大

  // 定义折线生成器  调用的时候传入data即可
  const line = d3.line()
    .x(d => xScale(d.x))
    .y(d => yScale(d.y))
    .curve(d3.curveCardinal); // 使用自然样条插值器


  //定义坐标轴
  const xAxis = d3.axisBottom(xScale).ticks(10)
  const yAxis = d3.axisLeft(yScale)

  const g = svg.append('g').attr('transform', `translate(${margin.left}, ${margin.top})`).attr('id', 'main')

  //x轴绘制 相对位置
  g.append('g').attr('transform', `translate(0, ${height.value - margin.bottom - margin.top})`).call(xAxis);
  // //y轴绘制
  g.append('g').attr('transform', `translate(0, 0)`).call(yAxis)

  //标记数据点
  g.append('g')
    .selectAll('circle')
    .data(data)
    .enter()
    .append('circle')
    .attr('r', 3)
    .attr('cx', d => xScale(d.x))
    .attr('cy', d => yScale(d.y))
    .attr('fill', 'rgba(2,86,134,0.99)')
    .on("mouseover", function (event, selectedObj) {
      // console.log("鼠标进入事件", event);
      // console.log("选择集", selectedObj);
    })
  //绘制折线
  const paths = g.append('path')
    .datum(data)
    .attr('fill', 'none')
    .attr('stroke', 'rgba(31,119,180,0.85)')
    .attr('stroke-width', 2.2)
    .attr('d', line)

  paths.transition()
    .duration(1600)
    .attrTween('stroke-dasharray', function () {
      const length = this.getTotalLength();
      return d3.interpolate(`0,${length}`, `${length},${length}`);
    });

  //平均震级刻度线
  g.append('line')
    .attr('x1', 0) // 起始点x坐标
    .attr('y1', yScale(avgY)) // 起始点y坐标
    .attr('stroke', 'rgba(203,91,43,0.85)') // 线的颜色
    .attr('stroke-width', '1.8') // 线的宽度
    .attr('stroke-dasharray', '3 5') // 虚线样式
    .transition() // 添加过渡效果
    .duration(1600) // 过渡持续时间为1秒
    .attr('x2', width.value - margin.left - margin.right) // 结束点x坐标
    .attr('y2', yScale(avgY));// 结束点y坐标

  g.append("text")
    .attr('x', (width.value - margin.left - margin.right) / 4 - 60)
    .attr('y', yScale(avgY) - 10)
    .text(store.state.WorldCloud + "近十年平均地震次数为" + avgY + "次")
    .style('font-family', 'Arial')
    .style('font-size', '15px')
    .style('fill', 'rgba(203,91,43,0.85)');

  //title
  // g.append("text")
  //   .attr('x', (width.value - margin.left - margin.right) / 4 - 60)
  //   .attr('y', 10)
  //   .text(`${store.state.WorldCloud}近十年地震次数折线图`)
  //   .style('font-family', 'Arial')
  //   .style('font-size', '17px')
  //   .style("font-weight", "bold")
  //   .style('fill', '#a19f9f');
};


</script>


<style scoped>
#lineGraph {
  width: 100%;
  height: 90%;
  margin: 0;
  /*background-color: #ebecef;*/
}
</style>
