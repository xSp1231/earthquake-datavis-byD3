<template>
  <div class="home">
    <div class="top">
      <div class="tl">
        <div class="intro boxStyle">
          <intro></intro>
        </div>
        <div class="pie boxStyle">
          <pie-graph></pie-graph>
        </div>
      </div>
      <div class="tm boxStyle">
        <HeatMap></HeatMap>
      </div>
      <div class="tr">
        <div class="worldCloud boxStyle">
          <world-cloud></world-cloud>
        </div>
        <div class="line boxStyle">
          <Line></Line>
        </div>
      </div>
    </div>

    <div class="bottom">
      <div class="bl boxStyle">
        <Scatter></Scatter>
      </div>
      <div class="br boxStyle">
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
.home {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: rgb(251, 251, 251);
}

.boxStyle {
  background-color: rgb(255, 255, 255);
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.5);
}

.top {
  justify-content: space-between;
  display: flex;
  width: 100%;
  height: 65%;
  /*background-color: #00ffff;*/
}

.bottom {
  margin-top: 1%;
  display: flex;
  width: 100%;
  height: 34%;
}



.tl {
  width: 30%;
  /*background-color: #c56c45;*/
}


.intro {
  width: 100%;
  height: 37%;
  margin-bottom: 2%;
  /*background-color: #bacad0;*/
}

.pie {
  width: 100%;
  height: 62%;
}

.tm {
  width: 38%;
  margin-left: 1%;
  margin-right: 1%;
  /*background-color: #7bb4c9;*/
}

.tr {
  width: 30%;
}


.worldCloud {
  width: 100%;
  height: 49%;
  margin-bottom: 2%;
}

.line {
  margin-top: 6px;
  width: 100%;
  height: 49%;
}

.bl {
  width: 49.5%;
  height: 95%;
  margin-right: 0.5%;
  padding-bottom: 5%;
  /*background-color: #d9b661;*/
}

.br {
  /*margin-right: 0.8%;*/
  margin-left: 0.5%;
  width: 49.5%;
  height: 100%;
  /*background-color: #b5cbae;*/
}
</style>
