<template>

  <div id="heatMap">
    <div id="toolTipMap"></div>
  </div>
</template>

<script setup>
import * as d3 from 'd3';
import { onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import dataset from '../dataTest/HeatMap.json'
const store = useStore()

const width = ref(0);
const height = ref(0);
let g;

onMounted(() => {
  // 初始化宽高
  width.value = document.getElementById('heatMap').offsetWidth;
  height.value = document.getElementById('heatMap').offsetHeight;
  drawHeatMap();
});

// 监听窗口变化
window.addEventListener('resize', () => {
  const svg = d3.select("#heatMapSvg");
  svg.remove();
  // 获取宽度和高度
  width.value = document.getElementById('heatMap').offsetWidth;
  height.value = document.getElementById('heatMap').offsetHeight;
  drawHeatMap();
});

const provinceNum=dataset;

const drawHeatMap = () => {
  const margin = { top: 20, left: 20, bottom: 20, right: 20 };
  const svg = d3
      .select("#heatMap")
      .append("svg")
      .attr("id", "heatMapSvg")
      .attr('width', width.value)
      .attr('height', height.value);


  const projection = d3.geoMercator()
      .center([103.7, 36.9])
      .scale(660)
      .translate([width.value / 2, height.value / 2]);

  const path = d3.geoPath().projection(projection);
//颜色比例尺
  const colorScale = d3.scaleLinear()
      .domain([0, d3.max(provinceNum, d => d.value)]) // 数据的范围
      .range(["#fdbb84", "rgb(255,0,0)"]); // 对应的颜色范围
  // console.log("颜色比例尺",colorScale(1000))
  // 创建图例
  const legend = svg.append("g")
      .attr("class", "legend")
      .attr("transform", `translate(${width.value *0.85}, ${height.value*0.72})`);

// 添加图例矩形和标签
  const legendRects = legend.selectAll("rect")
      .data(colorScale.ticks(10))
      .enter()
      .append("rect")
      .attr("x", 0)
      .attr("y", (d, i) => i * 20)
      .attr("width", 23)
      .attr("height", 21)
      .attr("fill", d => colorScale(d));

  const legendLabels = legend.selectAll("text")
      .data(colorScale.ticks(9))
      .enter()
      .append("text")
      .attr("x", 30)
      .attr("y", (d, i) => i * 20 + 15)
      .style('font-family', 'Arial')
      .style('font-size', '14px')
      .style("font-weight", "bold")
      .style('fill', '#444343')
      .text(d => d);

// 添加图例标题
  legend.append("text")
      .attr("x", -10)
      .attr("y", -10)
      .style('font-family', 'Arial')
      .style('font-size', '14px')
      .style("font-weight", "bold")
      .style('fill', '#444343')
      .text("地震次数");

  var title=svg.append("text")
      .attr("id","title")
      .attr("x", `${width.value/3-20+ 'px'}`)
      .attr("y", `${30 + 'px'}`)
      .attr("text-anchor", "left")
      .attr("font-size", "20px")
      .attr('fill', '#a19f9f')
      .style("font-weight", "bold")
      .text("中国近十年地震次数分布热力图");

  d3.json('china.geojson').then(data => {
    var color=['#fff7ec','#fee8c8','#fdd49e','#fdbb84',
      '#fc8d59','#ef6548','#d7301f','#b30000','rgb(153, 0, 0)'];
    svg.selectAll('path')
        .data(data.features)
        .enter()
        .append('path')
        .attr('d', path)
        .attr('opacity', 0.6)
        .attr('fill', '#eeeff1')
        .attr('stroke', '#101010')
        .attr('stroke-width', 1.2)
        .attr('stroke-color', '#101010')// 设置路径的颜色为相同的值
        .attr("fill", function(d,i){
          const regionName = d.properties.name;//得到地区名
          // 根据省份名称查找对应的数据
          const region = provinceNum.find(region => region.name === regionName);
              // console.log("fill + region ",region)
          return colorScale(region.value)
        })
        .on('mousemove', (e, d) => {
          // console.log(e.offsetX, e.offsetY)
          d3.select(e.target).attr('fill', '#e1d928');
          const regionName = d.properties.name;
          // 根据省份名称查找对应的数据
          const region = provinceNum.find(region => region.name === regionName);
          if(region){
            tooltip
                .style('visibility', "visible")
                .style('left', `${d3.pointer(event)[0]+10}px`)
                .style('top', `${d3.pointer(event)[1]-15}px`)
                .html(region.name+":"+region.value+"次");
          }
        // .attr('stroke-color', '#cc8238')// 设置路径的颜色为相同的值

        })

        .on("click",(e,d)=>{
            // 获取当前区域的名称
            const regionName = d.properties.name;
          // 根据省份名称查找对应的数据
          const region = provinceNum.find(region => region.name === regionName);
          if(region){
            store.commit('getDataByProvince',regionName) //状态变换函数
          }

        })
        .on("mouseout", (e,d) => {
          tooltip.style('visibility', "hidden");
          const regionName = d.properties.name;//得到地区名
          // 根据省份名称查找对应的数据
          const region = provinceNum.find(region => region.name === regionName);
          d3.select(e.target).attr("fill",colorScale(region.value));
        });
  });

};
</script>
<style scoped>
#heatMap{
  width: 100%;
  height: 100%;
  margin: 0;
  position: relative;
}
#toolTipMap{
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
