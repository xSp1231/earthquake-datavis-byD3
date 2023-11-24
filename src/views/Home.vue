<template>
  <div class="home">
    <div class="top">
      <div class="tl">
        <div class="intro">
    <intro></intro>
        </div>
        <div class="pie">
          <pie-graph></pie-graph>
        </div>
      </div>
      <div class="tm">
        <HeatMap></HeatMap>
      </div>
      <div class="tr">
        <div class="worldCloud">
          <world-cloud></world-cloud>
        </div>
        <div class="line">
          <Line></Line>
        </div>
      </div>
    </div>

    <div class="bottom">
      <div class="bl">
        <Scatter></Scatter>
      </div>
      <div class="br">
        <Bar></Bar>
      </div>
    </div>

  </div>
</template>
<script setup>
import Line from '../components/Line.vue'
import WorldCloud from '../components/WorldCloud.vue';
import Scatter from "../components/Scatter.vue";
import PieGraph from "../components/PieGraph.vue";
import Bar from '../components/Bar.vue'
import HeatMap from "../components/HeatMap.vue";
import Intro from "../components/Intro.vue";
</script>

<style scoped>
div .el-card {
  /*width: 100%;*/
  height: 100%;
  margin: 0;
  border-radius: 6px;
  background-color: #ffffff;
}

.home {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.top {
  justify-content: space-between;
  display: flex;
  width: 100%;
  height: 65%;
  /*background-color: #00ffff;*/
}

.bottom {
  display: flex;
  width: 100%;
  height: 35%;
  /*background-color: #d0b9b1;*/
}

.top * {
  /*选取所有子类*/
  margin-left: 8px;
  margin-top: 3px;
  margin-bottom: 3px;
  height: 98%;
  border-radius: 6px;
}

.tl {
  width: 30%;
  /*background-color: #c56c45;*/
}

.tl * {
  margin: 0;
}

.intro {
  width: 100%;
  height: 37%;
  /*background-color: #bacad0;*/
}

.pie {
  margin-top: 6px;
  width: 100%;
  height: 62%;
  /*background-color: #bacad0;*/
}

.tm {
  /*top-mid*/
  width: 40%;
  /*background-color: #7bb4c9;*/
}

.tr {
  width: 30%;
  /*background-color: #4d7e3c;*/
}

.tr * {
  margin: 0;
}

.worldCloud {
  width: 100%;
  height: 49%;
  /*background-color: #bacad0;*/
}

.line {
  margin-top: 6px;
  width: 100%;
  height: 51%;
  /*background-color: #bacad0;*/
}

.bl {
  border-radius: 6px;
  margin-top: 8px;
  width: 48%;
  height: 96%;
  margin-right: 0.8%;
  margin-left: 8px;
  /*background-color: #d9b661;*/
}

.br {
  border-radius: 6px;
  margin-top: 8px;
  /*margin-right: 0.8%;*/
  margin-left: 2.2%;
  width: 48%;
  height: 96%;
  /*background-color: #b5cbae;*/
}
</style>
