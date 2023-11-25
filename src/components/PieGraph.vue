
<template>
  <div style="width: 100%; height: 100%;" id="PieGraph"></div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import * as d3 from "d3";

const width = ref(0);
const height = ref(0);
const dataObject = [
  { date: "2016", money: 100 },
  { date: "2017", money: 120 },
  { date: "2018", money: 200 },
  { date: "2019", money: 150 },
  { date: "2020", money: 80 },
  { date: "2021", money: 70 },
  { date: "2022", money: 110 },
  { date: "2023", money: 130 },
];

onMounted(() => {
  const PieGraph = document.getElementById("PieGraph");
  width.value = PieGraph.offsetWidth;
  height.value = PieGraph.offsetHeight;
  createChart(dataObject);

  // 监听窗口变化
  window.addEventListener("resize", () => {
    d3.select("#PieGraphSvg").remove();
    width.value = PieGraph.offsetWidth;
    height.value = PieGraph.offsetHeight;
    createChart(dataObject);
  });
});

function createChart(data) {
  const svg = d3
      .select("#PieGraph")
      .append("svg")
      .attr("id", "PieGraphSvg")
      .attr("width", width.value)
      .attr("height", height.value);

  const config = {
    textColor: "#000",
    lineColor: "#000",
    animateDuration: 0,
    textOffsetH: 10,
    innerRadius: width.value / 30,
    hoverScale: 1.1,
  };

  const scaleTextDx = d3
      .scaleLinear()
      .domain([0, Math.PI / 2])
      .range([config.textOffsetH, config.textOffsetH * 3]);

  svg.attr("width", width.value).attr("height", height.value);

  const chart = svg
      .append("g")
      .attr("transform", `translate(${width.value / 2},${height.value / 2})`);

  const arcAngle = d3.pie().sort(null).value((d) => d.money);

  const scaleRadius = d3
      .scaleLinear()
      .domain([0, d3.max(data.map((d) => d.money))])
      .range([0, Math.min(width.value, height.value) * 0.5 * 0.5]);

  const slices = chart
      .selectAll(".arc")
      .data(arcAngle(data))
      .enter()
      .append("path")
      .attr("class", "arc")
      .attr("fill", (d, i) => d3.schemeCategory10[i % 10])
      .attr("d", d3.arc().outerRadius((d) => scaleRadius(d.data.money)).innerRadius(config.innerRadius))
      .on("mouseover", handleMouseOver)
      .on("mouseout", handleMouseOut)
      .on("click", handleClick);

  const labels = chart
      .selectAll(".label")
      .data(arcAngle(data))
      .enter()
      .append("text")
      .classed("label", true)
      .attr("stroke", config.textColor)
      .attr("fill", config.textColor)
      .attr("text-anchor", (d) => (d.endAngle + d.startAngle) / 2 > Math.PI ? "end" : "start")
      .attr("dy", "0.35em")
      .attr("dx", computeTextDx)
      .transition()
      .duration(0)
      .delay(config.animateDuration)
      .attr("transform", (d) => `translate(${getArcCentroid(scaleRadius(d.value) * 2.5, d, true)})`)
      .text((d) => `${d.data.date}: ${d.data.money}`);

  const linePoints = getLinePoints();

  const lines = chart
      .selectAll(".line")
      .data(getLinePoints())
      .enter()
      .insert("path", ":first-child")
      .classed("line", true)
      .transition()
      .duration(0)
      .delay(config.animateDuration)
      .attr("fill", "none")
      .attr("stroke", config.lineColor)
      .attr("d", generateLine);

  function computeTextDx(d) {
    const middleAngle = (d.endAngle + d.startAngle) / 2;
    const dx = middleAngle < Math.PI ? scaleTextDx(Math.abs(middleAngle - Math.PI / 2)) : -scaleTextDx(Math.abs(middleAngle - Math.PI * 3 / 2));
    return dx;
  }

  function getLinePoints() {
    return arcAngle(data).map((d) => {
      const radius = scaleRadius(d.value);
      const tempPoint = getArcCentroid(radius * 2.5, d, true);
      const tempDx = computeTextDx(d);
      const dx = tempDx > 0 ? tempDx - config.textOffsetH : tempDx + config.textOffsetH;
      return [getArcCentroid(radius, d, false), tempPoint, [tempPoint[0] + dx, tempPoint[1]]];
    });
  }

  function getArcCentroid(outerRadius, d, averageLength) {
    if (averageLength) outerRadius = Math.sqrt(outerRadius * 300);
    return d3
        .arc()
        .outerRadius(outerRadius)
        .innerRadius(config.innerRadius)
        .centroid(d);
  }

  function generateLine(d) {
    return d3.line()(d);
  }
  function handleMouseOver(d, i) {
    d3.select(this).attr("transform", `scale(${config.hoverScale})`);
  }

  function handleMouseOut(d, i) {
    d3.select(this).attr("transform", "scale(1)");
  }
  function handleClick(d, i) {
    const dataObject = d.target.__data__;
    console.log(dataObject);
    console.log(dataObject.value)
    console.log(dataObject.data);
    console.log("时间是:" +dataObject.data.date + "   "+"值是:"+dataObject.data.money);
  }
}
</script>
<style>
.arc {
  cursor: pointer;
}

.label {
  pointer-events: none;
}

.line {
  pointer-events: none;
}
</style>
