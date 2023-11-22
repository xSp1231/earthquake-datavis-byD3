<template>
  <div id="WorldCloudGraph"></div>
</template>

<script>
import * as d3 from 'd3';
import * as cloud from 'd3-cloud';

export default {
  name: "WorldCloud",
  data: () => {
    return {
      dataset: [
        {
          name: "新疆",
          value: 7779
        },
        {
          name: "四川",
          value: 4770
        },
        {
          name: "西藏",
          value: 3494
        },
        {
          name: "云南",
          value: 3038
        },
        {
          name: "青海",
          value: 2156
        },
        {
          name: "台湾",
          value: 1526
        },
        {
          name: "内蒙古",
          value: 852
        },
        {
          name: "甘肃",
          value: 597
        },
        {
          name: "辽宁",
          value: 471
        },
        {
          name: "山东",
          value: 319
        },
        {
          name: "河北",
          value: 258
        },
        {
          name: "山西",
          value: 244
        },
        {
          name: "广东",
          value: 225
        },
        {
          name: "吉林",
          value: 157
        },
        {
          name: "贵州",
          value: 145
        }, {
          name: "宁夏",
          value: 142
        }, {
          name: "黑龙江",
          value: 138
        }, {
          name: "陕西",
          value: 125
        }, {
          name: "广西",
          value: 127
        }, {
          name: "重庆",
          value: 125
        }, {
          name: "河南",
          value: 123
        }, {
          name: "湖北",
          value: 106
        }, {
          name: "安徽",
          value: 93
        }, {
          name: "江苏",
          value: 94
        }, {
          name: "浙江",
          value: 90
        }, {
          name: "福建",
          value: 84
        }, {
          name: "江西",
          value: 47
        }, {
          name: "湖南",
          value: 26
        }, {
          name: "北京",
          value: 20
        }, {
          name: "海南",
          value: 16
        }, {
          name: "天津",
          value: 12
        }, {
          name: "上海",
          value: 1
        }
      ],
      width: 0,
      height: 0
    }
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
      const svg = d3.select('#WorldCloudGraph').append('svg').attr("id", "WorldCloudGraphSvg").attr('width', this.width).attr('height', this.height);
      const tooltip = d3.select('#WorldCloudGraph')
        .append('div')
        .attr('class', 'tooltip')
        .style('opacity', 0)
        .style('position', 'absolute')
        .style('background-color', 'white')
        .style('height', '30px')
        .style("display", 'flex')

      const layout = cloud()//注意，这不是D3自带的API，是d3.layout.cloud.js中的API
        .size([this.width, this.height])
        .words(this.dataset)
        .padding(1) //每个词之间的间隔，不设置时默认为0
        .rotate(() => ~~(Math.random()) * 90) //~~双非按位取反运算符，功能类似floor()，但速度更快。
        .font('Impact')
        .fontSize(d => fontSizeScale(d.value))
        .on('end', draw)

      const wordcloudGroup = svg.append('g')
        .attr('transform', `translate(${layout.size()[0] / 2} ,${layout.size()[1] / 2})`)

      layout.start()

      // console.log(layout)

      function draw(words) {
        wordcloudGroup.selectAll('text')
          .data(words)
          .enter()
          .append("g")
          .on('mousemove', function (event, d) {
            d3.select(this)
              .style('cursor', 'pointer');
            tooltip
              .style('opacity', 0.9)
              .style('left', `${d.x - 40 + layout.size()[0] / 2}px`)
              .style('top', `${d.y - 40 + layout.size()[1] / 2}px`)
              .html(d.name + " " + d.value);
          })
          .on('mouseout', function () {
            d3.select(this)
              .style('cursor', 'default');

            tooltip.style('opacity', 0);
          })
          .on('click', function (event, d) {
            tooltip.style('opacity', 0);
            // 处理点击事件的逻辑
            console.log('点击了词语:', d.name);
          })
          .append('text')
          .attr('font-size', d => `${d.size}px`)
          .attr('font-family', 'Impact')
          .attr('fill', (d, i) => fill(i))
          .attr('text-anchor', 'middle')
          .attr('transform', d => `translate(${d.x - 1}, ${d.y}) rotate(${d.rotate})`)
          .text(d => d.name)

      }
    }
  },

  mounted() {
    // 获取宽度和高度
    this.width = document.getElementById('WorldCloudGraph').offsetWidth;
    this.height = document.getElementById('WorldCloudGraph').offsetHeight;
    this.draw();

    //监听窗口变化
    window.addEventListener('resize', () => {
      document.getElementById('WorldCloudGraphSvg').remove();
      // 获取宽度和高度
      this.width = document.getElementById('WorldCloudGraph').offsetWidth;
      this.height = document.getElementById('WorldCloudGraph').offsetHeight;
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
  background-color: #ebecef;
}
</style>
