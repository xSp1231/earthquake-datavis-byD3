<!--<template>-->
<!--  <div style="width: 100%; height:100%" ref="mainDiv">-->
<!--  </div>-->
<!--</template>-->

<!--<script setup>-->
<!--import { onMounted, ref, watch } from "vue";-->
<!--import * as d3 from "d3";-->

<!--const mainDiv = ref(null);-->

<!--const data = [-->
<!--  { sepalLength: 5.1, sepalWidth: 3.5, petalLength: 1.4, petalWidth: 0.2, species: 'setosa' },-->
<!--  { sepalLength: 4.9, sepalWidth: 3, petalLength: 1.4, petalWidth: 0.2, species: 'setosa' },-->
<!--  { sepalLength: 4.7, sepalWidth: 3.2, petalLength: 1.3, petalWidth: 0.2, species: 'setosa' },-->
<!--  { sepalLength: 4.6, sepalWidth: 3.1, petalLength: 1.5, petalWidth: 0.2, species: 'setosa' },-->
<!--  { sepalLength: 5, sepalWidth: 3.6, petalLength: 1.4, petalWidth: 0.2, species: 'setosa' },-->
<!--  { sepalLength: 5.4, sepalWidth: 3.9, petalLength: 1.7, petalWidth: 0.4, species: 'setosa' },-->
<!--  { sepalLength: 4.6, sepalWidth: 3.4, petalLength: 1.4, petalWidth: 0.3, species: 'setosa' },-->
<!--  { sepalLength: 5, sepalWidth: 3.4, petalLength: 1.5, petalWidth: 0.2, species: 'setosa' },-->
<!--  { sepalLength: 4.4, sepalWidth: 2.9, petalLength: 1.4, petalWidth: 0.2, species: 'setosa' },-->
<!--  { sepalLength: 4.9, sepalWidth: 3.1, petalLength: 1.5, petalWidth: 0.1, species: 'setosa' },-->
<!--  { sepalLength: 5.4, sepalWidth: 3.7, petalLength: 1.5, petalWidth: 0.2, species: 'setosa' },-->
<!--  { sepalLength: 4.8, sepalWidth: 3.4, petalLength: 1.6, petalWidth: 0.2, species: 'setosa' },-->
<!--  { sepalLength: 4.8, sepalWidth: 3, petalLength: 1.4, petalWidth: 0.1, species: 'setosa' },-->
<!--  { sepalLength: 4.3, sepalWidth: 3, petalLength: 1.1, petalWidth: 0.1, species: 'setosa' },-->
<!--  { sepalLength: 5.8, sepalWidth: 4, petalLength: 1.2, petalWidth: 0.2, species: 'setosa' },-->
<!--  { sepalLength: 6.4, sepalWidth: 3.2, petalLength: 4.5, petalWidth: 1.5, species: 'versicolor' },-->
<!--  { sepalLength: 6.9, sepalWidth: 3.1, petalLength: 4.9, petalWidth: 1.5, species: 'versicolor' },-->
<!--  { sepalLength: 5.5, sepalWidth: 2.3, petalLength: 4, petalWidth: 1.3, species: 'versicolor' },-->
<!--  { sepalLength: 6.5, sepalWidth: 2.8, petalLength: 4.6, petalWidth: 1.5, species: 'versicolor' },-->
<!--  { sepalLength: 5.7, sepalWidth: 2.8, petalLength: 4.5, petalWidth: 1.3, species: 'versicolor' },-->
<!--  { sepalLength: 6.3, sepalWidth: 3.3, petalLength: 4.7, petalWidth: 1.6, species: 'versicolor' },-->
<!--  { sepalLength: 4.9, sepalWidth: 2.4, petalLength: 3.3, petalWidth: 1, species: 'versicolor' },-->
<!--];-->

<!--const createChart = () => {-->
<!--  const container = mainDiv.value;-->
<!--  const width = container.offsetWidth;-->
<!--  const height = container.offsetHeight;-->
<!--  const svg = d3.select(container).append('svg');-->
<!--  console.log(width);-->
<!--  console.log(height);-->
<!--  const marginTop = 25;-->
<!--  const marginRight = 20;-->
<!--  const marginBottom = 35;-->
<!--  const marginLeft = 40;-->
<!--  const x = d3.scaleLinear()-->
<!--      .domain(d3.extent(data, d => d.sepalLength)).nice()-->
<!--      .range([marginLeft, width - marginRight]);-->
<!--  const y = d3.scaleLinear()-->
<!--      .domain(d3.extent(data, d => d.sepalWidth)).nice()-->
<!--      .range([height - marginBottom, marginTop]);-->

<!--  const color = d3.scaleOrdinal(data.map(d => d.species), d3.schemeCategory10);-->
<!--  // const shape = d3.scaleOrdinal(data.map(d => d.species), d3.symbols.map(s => d3.symbol().type(s)()));-->
<!--  const shape = d3.symbol().type(d3.symbolCircle);-->

<!--  svg-->
<!--      .attr("viewBox", [0, 0, width, height])-->
<!--      .attr("width", width)-->
<!--      .attr("height", height)-->
<!--      .attr("style", "max-width: 100%; height: auto;");-->

<!--  svg.append("g")-->
<!--      .attr("transform", `translate(0,${height - marginBottom})`)-->
<!--      .call(d3.axisBottom(x).ticks(width / 80))-->
<!--      .call(g => g.select(".domain").remove())-->
<!--      .call(g => g.append("text")-->
<!--          .attr("x", width)-->
<!--          .attr("y", marginBottom - 4)-->
<!--          .attr("fill", "currentColor")-->
<!--          .attr("text-anchor", "end")-->
<!--          .text("Sepal length (cm) →"));-->

<!--  svg.append("g")-->
<!--      .attr("transform", `translate(${marginLeft},0)`)-->
<!--      .call(d3.axisLeft(y))-->
<!--      .call(g => g.select(".domain").remove())-->
<!--      .call(g => g.append("text")-->
<!--          .attr("x", -marginLeft)-->
<!--          .attr("y", 10)-->
<!--          .attr("fill", "currentColor")-->
<!--          .attr("text-anchor", "start")-->
<!--          .text("↑ Sepal width (cm)"));-->

<!--  svg.append("g")-->
<!--      .attr("stroke", "currentColor")-->
<!--      .attr("stroke-opacity", 0.1)-->
<!--      .call(g => g.append("g")-->
<!--          .selectAll("line")-->
<!--          .data(x.ticks())-->
<!--          .join("line")-->
<!--          .attr("x1", d => 0.5 + x(d))-->
<!--          .attr("x2", d => 0.5 + x(d))-->
<!--          .attr("y1", marginTop)-->
<!--          .attr("y2", height - marginBottom)-->
<!--          .attr("stroke-dasharray", "2,2"))-->
<!--      .call(g => g.append("g")-->
<!--          .selectAll("line")-->
<!--          .data(y.ticks())-->
<!--          .join("line")-->
<!--          .attr("y1", d => 0.5 + y(d))-->
<!--          .attr("y2", d => 0.5 + y(d))-->
<!--          .attr("x1", marginLeft)-->
<!--          .attr("x2", width - marginRight)-->
<!--          .attr("stroke-dasharray", "2,2"));-->

<!--  svg.append("g")-->
<!--      .attr("stroke-width", 1.5)-->
<!--      .attr("font-family", "sans-serif")-->
<!--      .attr("font-size", 10)-->
<!--      .selectAll("path")-->
<!--      .data(data)-->
<!--      .join("path")-->
<!--      .attr("transform", d => `translate(${x(d.sepalLength)},${y(d.sepalWidth)})`)-->
<!--      .attr("fill", d =>color(d.species))-->
<!--      .attr("d", d => shape(d.species))-->
<!--      .on("mouseover", (event, d) => {-->
<!--        console.log(event)-->
<!--        // 鼠标悬停时显示数据-->
<!--        console.log(d); // 这里可以替换为你想要执行的代码-->
<!--        d3.select("#tooltip").remove()//删除之前已有标签，避免相互覆盖遮挡-->
<!--        svg.append("text")-->
<!--            .attr("id", "tooltip")-->
<!--            .attr("x", `${d3.pointer(event)[0]  + 'px'}`)-->
<!--            .attr("y", `${d3.pointer(event)[1]  + 80 + 'px'}`)-->
<!--            .attr("text-anchor", "left")-->
<!--            .attr("font-size", "20px")-->
<!--            .attr("fill", "blue")-->
<!--            .text( 'x:'+d.sepalLength + 'y:'+d.sepalWidth)-->
<!--       })-->
<!--       .on("mouseout", () => {-->
<!--        // 鼠标移出时隐藏提示框-->
<!--       d3.select("#tooltip").remove();-->
<!--        });-->
<!--};-->

<!--onMounted(() => {-->
<!--  createChart();-->
<!--});-->

<!--</script>-->
<template>
  <div style="width: 100%; height:100%" id="mainDiv">
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import * as d3 from "d3";
const width =ref(0);
const height =ref(0);

const data = [
  { sepalLength: 5.1, sepalWidth: 3.5, petalLength: 1.4, petalWidth: 0.2, species: 'setosa' },
  { sepalLength: 4.9, sepalWidth: 3, petalLength: 1.4, petalWidth: 0.2, species: 'setosa' },
  { sepalLength: 4.7, sepalWidth: 3.2, petalLength: 1.3, petalWidth: 0.2, species: 'setosa' },
  { sepalLength: 4.6, sepalWidth: 3.1, petalLength: 1.5, petalWidth: 0.2, species: 'setosa' },
  { sepalLength: 5, sepalWidth: 3.6, petalLength: 1.4, petalWidth: 0.2, species: 'setosa' },
  { sepalLength: 5.4, sepalWidth: 3.9, petalLength: 1.7, petalWidth: 0.4, species: 'setosa' },
  { sepalLength: 4.6, sepalWidth: 3.4, petalLength: 1.4, petalWidth: 0.3, species: 'setosa' },
  { sepalLength: 5, sepalWidth: 3.4, petalLength: 1.5, petalWidth: 0.2, species: 'setosa' },
  { sepalLength: 4.4, sepalWidth: 2.9, petalLength: 1.4, petalWidth: 0.2, species: 'setosa' },
  { sepalLength: 4.9, sepalWidth: 3.1, petalLength: 1.5, petalWidth: 0.1, species: 'setosa' },
  { sepalLength: 5.4, sepalWidth: 3.7, petalLength: 1.5, petalWidth: 0.2, species: 'setosa' },
  { sepalLength: 4.8, sepalWidth: 3.4, petalLength: 1.6, petalWidth: 0.2, species: 'setosa' },
  { sepalLength: 4.8, sepalWidth: 3, petalLength: 1.4, petalWidth: 0.1, species: 'setosa' },
  { sepalLength: 4.3, sepalWidth: 3, petalLength: 1.1, petalWidth: 0.1, species: 'setosa' },
  { sepalLength: 5.8, sepalWidth: 4, petalLength: 1.2, petalWidth: 0.2, species: 'setosa' },
  { sepalLength: 6.4, sepalWidth: 3.2, petalLength: 4.5, petalWidth: 1.5, species: 'versicolor' },
  { sepalLength: 6.9, sepalWidth: 3.1, petalLength: 4.9, petalWidth: 1.5, species: 'versicolor' },
  { sepalLength: 5.5, sepalWidth: 2.3, petalLength: 4, petalWidth: 1.3, species: 'versicolor' },
  { sepalLength: 6.5, sepalWidth: 2.8, petalLength: 4.6, petalWidth: 1.5, species: 'versicolor' },
  { sepalLength: 5.7, sepalWidth: 2.8, petalLength: 4.5, petalWidth: 1.3, species: 'versicolor' },
  { sepalLength: 6.3, sepalWidth: 3.3, petalLength: 4.7, petalWidth: 1.6, species: 'versicolor' },
  { sepalLength: 4.9, sepalWidth: 2.4, petalLength: 3.3, petalWidth: 1, species: 'versicolor' },
];

const createChart = () => {
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
  const shape = d3.symbol().type(d3.symbolCircle);

  svg.attr("viewBox", [0, 0, width.value, height.value])
      .attr("width", width.value)
      .attr("height", height.value)
      .attr("style", "max-width: 100%; height: auto;");

  svg.append("g")
      .attr("transform", `translate(0,${height.value - marginBottom})`)
      .call(d3.axisBottom(x).ticks(width.value / 80))
      .call(g => g.select(".domain").remove())
      .call(g => g.append("text")
          .attr("x", width.value)
          .attr("y", marginBottom - 4)
          .attr("fill", "currentColor")
          .attr("text-anchor", "end")
          .text("Sepal length (cm) →"));

  svg.append("g")
      .attr("transform", `translate(${marginLeft},0)`)
      .call(d3.axisLeft(y))
      .call(g => g.select(".domain").remove())
      .call(g => g.append("text")
          .attr("x", -marginLeft)
          .attr("y", 10)
          .attr("fill", "currentColor")
          .attr("text-anchor", "start")
          .text("↑ Sepal width (cm)"));

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
      .attr("transform", d => `translate(${x(d.sepalLength)},${y(d.sepalWidth)})`)
      .attr("fill", d => color(d.species))
      .attr("d", d => shape(d.species))
      .on("mouseover", (event, d) => {
        console.log(event);
        console.log(d);
        d3.select("#tooltip").remove();
        svg.append("text")
            .attr("id", "tooltip")
            .attr("x", `${d3.pointer(event)[0] + 'px'}`)
            .attr("y", `${d3.pointer(event)[1] + 80 + 'px'}`)
            .attr("text-anchor", "left")
            .attr("font-size", "20px")
            .attr("fill", "blue")
            .text('x:' + d.sepalLength + ' y:' + d.sepalWidth);
      })
      .on("mouseout", () => {
        d3.select("#tooltip").remove();
      });
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
