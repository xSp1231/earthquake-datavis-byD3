<template>
  <div id="BarTitle">
    <h4>中国近十年的</h4>
    <div style="width: 20px;"></div><el-select v-model="this.value" placeholder="平均震级" size="middle"
      @change="selectChange" style="width: 100px;">
      <el-option v-for="item in this.options" :key="item" :label="item" :value="item" />
    </el-select>
  </div>
  <div id="BarGraph"></div>
</template>

<script>
import * as d3 from 'd3';
import dataset1 from '../dataTest/bar.json'
export default {
  name: "Bar",
  data: () => {
    return {
      width: 0,
      height: 0,
      dataset: dataset1,
      options: [
        "平均震级",
        "最高震级",
        "最低震级"
      ],
      value: "平均震级",
    }
  },
  methods: {
    selectChange() {
      console.log("选中了", this.value)
      document.getElementById('BarGraphSvg').remove();
      this.draw()
    },
    draw() {
      const margin = {
        left: 50,
        top: 20,
        right: 50,
        bottom: 40
      }
      const svg = d3.select("#BarGraph")
        .append("svg")
        .attr("id", "BarGraphSvg")
        .attr("width", this.width)
        .attr("height", this.height)
        .attr("viewBox", [0, 0, this.width, this.height])
      // .style("background-color", "blue")
      console.log("bar", this.dataset[this.value])
      const myData = this.dataset[this.value].sort((a, b) => b.value - a.value).slice(0, 20);
      //定义x轴和y轴比例尺
      const xScale = d3.scaleBand().domain(myData.map(d => d.province))
        .range([0, this.width - margin.left - margin.right])
        .padding(0.1);
      const yScale = d3.scaleLinear()
        .domain([0, d3.max(myData, d => d.value)]).nice()
        .range([this.height - margin.top - margin.bottom, 0]);

      //定义x,y轴的坐标轴
      const xAxis = d3.axisBottom(xScale).tickSizeOuter(0);
      svg.append('g')
        .attr('class', "axis")
        .attr("transform", `translate(${margin.left},${this.height - margin.bottom})`)
        .transition()
        .duration(1600)
        .call(xAxis)

      const yAxis = d3.axisLeft(yScale);
      svg.append('g')
        .attr('class', "axis")
        .attr("transform", `translate(${margin.left},${margin.top})`)
        .call(yAxis)

      // svg.selectAll(".axis").selectAll('path')
      //   .attr("fill", "none")
      //   .attr("stroke", "black")
      //   .attr("shape-rendering", "crispEdges")
      //   .attr("font-weight", "bold")
      // svg.selectAll(".axis").selectAll('line')
      //   .attr("fill", "none")
      //   .attr("stroke", "black")
      //   .attr("shape-rendering", "crispEdges")
      //   .attr("font-weight", "bold");
      // svg.selectAll(".axis").selectAll('text')
      //   .attr("font-family", "sans-serif")
      //   .attr("font-size", "12px")
      //   .attr("font-weight", "bold");
      //画柱状图
      const bar = svg.append("g")
        .attr("fill", "steelblue")
        .attr("transform", `translate(${margin.left},${margin.top})`)
        .selectAll('rect')
        .data(myData)
        .join("rect")
        .style("mix-blend-mode", "multiply")
        .attr("y", d => yScale(d.value))
        .attr("height", d => this.height - margin.top - margin.bottom - yScale(d.value))
        .attr("width", xScale.bandwidth())
        .transition()
        .duration(1600)
        .attr("x", d => xScale(d.province))

      //添加标记
      const text = svg.append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`)
        .selectAll('text')
        .data(myData)
        .join("text")
        .attr("y", d => yScale(d.value) - 10)
        .attr("fill", "black")
        .attr("font-size", "14px")
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "middle")
        .text(d => d.value)
        .transition()
        .duration(1600)
        .attr("x", d => xScale(d.province) + xScale.bandwidth() / 2)

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
#BarTitle {
  height: 10%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #a19f9f;
  font-weight: bold;
  font-size: 17px;
}


#BarGraph {
  width: 100%;
  height: 90%;
  position: relative;
}
</style>
