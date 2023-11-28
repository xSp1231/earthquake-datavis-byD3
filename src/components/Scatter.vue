<template>
  <div style="width: 100%; height:100%" id="mainDiv">
  </div>
</template>

<script setup>
import {onMounted, ref, watch} from "vue";
import * as d3 from "d3";

const width = ref(0);
const height = ref(0);

const createChart = () => {
  d3.csv('earthquake_data.csv')
      .then(data => {
        // console.log(data);
        const svg = d3.select('#mainDiv')
            .append('svg')
            .attr('id', 'mainDivSvg')
            .attr('width', width.value)
            .attr('height', height.value);

        console.log(width.value);
        console.log(height.value);

        const marginTop = 25;
        const marginRight = 20;
        const marginBottom = 35;
        const marginLeft = 40;

        const x = d3.scaleLinear()
            .domain(d3.extent(data, d => d.sepalLength)).nice()
            .range([marginLeft, width.value - marginRight]);

        const y = d3.scaleLinear()
            .domain(d3.extent(data, d => d.sepalWidth)).nice()
            .range([height.value - marginBottom, marginTop]);

        const color = d3.scaleOrdinal(data.map(d => d.species), d3.schemeCategory10);
        const shape = d3.scaleOrdinal(data.map(d => d.species), d3.symbols.map(s => d3.symbol().type(s)()));

        svg.attr("viewBox", [0, 0, width.value, height.value])
            .attr("width", width.value)
            .attr("height", height.value)
            .attr("style", "max-width: 100%; height: auto;");
        svg.append("text")
            .attr("x", width.value / 2)
            .attr("y", marginTop / 2)
            .attr("text-anchor", "middle")
            .attr("font-size", "15px")
            .attr("font-weight", "bold")  // 设置粗体
            .attr("fill", "steelblue")    // 设置文本颜色
            .text("震源深度与震级关系散点图");
        svg.append("g")
            .attr("transform", `translate(0,${height.value - marginBottom})`)
            .call(d3.axisBottom(x).ticks(width.value / 80))
            .call(g => g.select(".domain").remove())
            .call(g => g.append("text")
                .attr("x", width.value)
                .attr("y", marginBottom - 4)
                .attr("fill", "currentColor")
                .attr("text-anchor", "end")
                .text("震源深度 (km)"));

        svg.append("g")
            .attr("transform", `translate(${marginLeft},0)`)
            .call(d3.axisLeft(y))
            .call(g => g.select(".domain").remove())
            .call(g => g.append("text")
                .attr("x", -marginLeft)
                .attr("y", 10)
                .attr("fill", "currentColor")
                .attr("text-anchor", "start")
                .text("震级大小"));

        svg.append("g")
            .attr("stroke", "currentColor")
            .attr("stroke-opacity", 0.1)
            .call(g => g.append("g")
                .selectAll("line")
                .data(x.ticks())
                .join("line")
                .attr("x1", d => 0.5 + x(d))
                .attr("x2", d => 0.5 + x(d))
                .attr("y1", marginTop)
                .attr("y2", height.value - marginBottom)
                .attr("stroke-dasharray", "2,2"))
            .call(g => g.append("g")
                .selectAll("line")
                .data(y.ticks())
                .join("line")
                .attr("y1", d => 0.5 + y(d))
                .attr("y2", d => 0.5 + y(d))
                .attr("x1", marginLeft)
                .attr("x2", width.value - marginRight)
                .attr("stroke-dasharray", "2,2"));

        svg.append("g")
            .attr("stroke-width", 1.5)
            .attr("font-family", "sans-serif")
            .attr("font-size", 10)
            .selectAll("path")
            .data(data)
            .join("path")
            .attr("transform", d => `translate(${x(d.sepalLength) },${y(d.sepalWidth)})`)
            .attr("fill", d => color(d.species))
            .attr("d", d => shape(d.species))
            .on("mouseover", (event, d) => {
              const {clientX, clientY} = event;
              // d3.select("#tooltip").remove();
              d3.select('#mainDiv')
                  .append("text")
                  .style('position', 'absolute')
                  .attr("id", "tooltip")
                  .attr('z-index', 99999)
                  .style("top", `${clientY-30}px`)
                  .style("left", `${clientX-70}px`)
                  .attr("text-anchor", "center")
                  .attr("font-size", "20px")
                  .attr("fill", "blue")
                  .text('震源深度:' + d.sepalLength + ' 震级:' + d.sepalWidth);
            })
            .on("mouseout", () => {
              d3.select("#tooltip").remove();
            });
      })
};
onMounted(() => {
  width.value = document.getElementById('mainDiv').offsetWidth;
  height.value = document.getElementById('mainDiv').offsetHeight;
  createChart();

  //监听窗口变化
  window.addEventListener('resize', () => {
    document.getElementById('mainDivSvg').remove();
    // 获取宽度和高度
    width.value = document.getElementById('mainDiv').offsetWidth;
    height.value = document.getElementById('mainDiv').offsetHeight;
    createChart();
  });
});

</script>
