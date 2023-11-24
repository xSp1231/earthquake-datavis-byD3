<template>
  <div id="heatMap"></div>
</template>

<script setup>
import * as d3 from 'd3';
import { onMounted, ref } from 'vue';

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

const provinceNum=[
  {
    name: "北京",
    value: 20,
  },
  {
    name: "天津",
    value: 12,
  },
  {
    name: "上海",
    value: 1,
  },
  {
    name: "重庆",
    value: 125,
  },
  {
    name: "河北",
    value: 258,
  },
  {
    name: "河南",
    value: 123,
  },
  {
    name: "云南",
    value: 3038,
  },
  {
    name: "辽宁",
    value: 471,
  },
  {
    name: "黑龙江",
    value: 138,
  },
  {
    name: "湖南",
    value: 26,
  },
  {
    name: "安徽",
    value: 93,
  },
  {
    name: "山东",
    value: 319,
  },
  {
    name: "新疆",
    value: 7779,
  },
  {
    name: "江苏",
    value: 94,
  },
  {
    name: "浙江",
    value: 90,
  },
  {
    name: "江西",
    value: 47,
  },
  {
    name: "湖北",
    value: 106,
  },
  {
    name: "广西",
    value: 127,
  },
  {
    name: "甘肃",
    value: 597,
  },
  {
    name: "山西",
    value: 244,
  },
  {
    name: "内蒙古",
    value: 852,
  },
  {
    name: "陕西",
    value: 125,
  },
  {
    name: "吉林",
    value: 9,
  },
  {
    name: "福建",
    value: 84,
  },
  {
    name: "贵州",
    value: 145,
  },
  {
    name: "广东",
    value: 225,
  },
  {
    name: "青海",
    value: 2156,
  },
  {
    name: "西藏",
    value: 3494,
  },
  {
    name: "四川",
    value: 4770,
  },
  {
    name: "宁夏",
    value: 142,
  },
  {
    name: "海南",
    value: 16,
  },
  {
    name: "台湾",
    value: 1526,
  },
  {
    name: "香港",
    value: 0,
  },
  {
    name: "澳门",
    value: 0,
  },
]



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
      .range(["#fdbb84", "rgb(250,0,0)"]); // 对应的颜色范围
  console.log("颜色比例尺",colorScale(1000))

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
              console.log("fill + region ",region)
          return colorScale(region.value)
        })
        .on("click",(e,d)=>{
            // 获取当前区域的名称
            const regionName = d.properties.name;
          // 根据省份名称查找对应的数据
          const region = provinceNum.find(region => region.name === regionName);
          if(region){
            console.log('Clicked region:', regionName);
             d3.select("#tooltip").remove();
             d3.select("#tooltip-border").remove();
          svg.append("rect")
              .attr("id", "tooltip-border")
              .attr("x", `${d3.pointer(event)[0] + 10}px`)
              .attr("y", `${d3.pointer(event)[1] -15}px`)
              .attr("width", "130px")
              .attr("height", "35px")
              .attr("rx", "5px")
              .attr("ry", "5px")
              .attr("fill", "rgba(248,244,244,0.66)")
              .attr("stroke", "#67696c")
              .attr("stroke-width", "1px");
          svg.append("text")
              .attr("id", "tooltip")
              .attr("x", `${d3.pointer(event)[0] +10+ 'px'}`)
              .attr("y", `${d3.pointer(event)[1] + 10 + 'px'}`)
              .attr("text-anchor", "left")
              .attr("font-size", "18px")
              .attr('fill', '#67696c')
              .text(region.name+":"+region.value+"次");
          }

        })
        .on("mouseout", () => {
          d3.select("#tooltip").remove();
          d3.select("#tooltip-border").remove();

        });
  });

};
</script>
<style scoped>
#heatMap{
  width: 100%;
  height: 100%;
  margin: 0;
  background-color: #fcfafa;
}
</style>
