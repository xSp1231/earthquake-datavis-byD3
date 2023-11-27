<template class="static">
  <el-row :gutter="2">
    <el-col :span="8">
      <div class="statistic-card">
        <el-statistic :value=injurenum>
          <template #title>
            <div style="display: inline-flex; align-items: center;color: #5c2dde;font-size: 15px">
              地震受伤人数
              <el-tooltip
                  effect="dark"
                  content="该省份近十年以来由地震引发的受伤数粗略统计"
                  placement="right-end"
              >
                <el-icon style="margin-left: 4px" :size="14">
                  <Warning/>
                </el-icon>
              </el-tooltip>
            </div>
          </template>
        </el-statistic>
      </div>
    </el-col>
    <el-col :span="8">
      <div class="statistic-card">
        <el-statistic :value=deathnum>
          <template #title>
            <div style="display: inline-flex; align-items: center;color: #101010;font-size: 16px">
              地震死亡人数
              <el-tooltip
                  effect="dark"
                  content="该省份近十年以来由地震引发的死亡数粗略统计"
                  placement="right-end"
              >
                <el-icon style="margin-left: 4px" :size="14">
                  <Warning/>
                </el-icon>
              </el-tooltip>
            </div>
          </template>
        </el-statistic>
      </div>
    </el-col>
    <el-col :span="8">
      <div class="statistic-card">
        <el-statistic :value=totalnum title="New transactions today">
          <template #title>
            <div style="display: inline-flex; align-items: center;color:#ff0000;font-size: 16px">
              地震伤亡人数
            </div>
          </template>
        </el-statistic>
      </div>
    </el-col>
  </el-row>
  <el-row :gutter="2" style="margin-top: 0px">
    <el-col :span="24">
      <div class="areaintro" style=" display: flex;width: 100%;height: 128px;border-radius: 6px;">
        <div class="image-container" v-bind:style="{ 'background-image': 'url(' + image_path+ ')' }"  ></div>
        <div class="intro">
<!--          <h6 style="color: #797575;font-size:15px;">地区地理简介:</h6>-->
          <p>{{intro}}</p>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script setup>
const injurenum=ref(0);
const deathnum=ref(0);
const totalnum=ref(0);
const intro=ref('');
const image_path = ref('');
const provinceName = ref('');
const last = '.jpg';
const path = 'pictures/'
import {useStore} from "vuex";
import {computed, watch, onMounted, ref} from "vue";
const store = useStore();
const info = computed(() => store.state.dataObject);
watch(
    () => store.state.provinceName, // 表达式，这里是你要监听的state变量
    (newVal, oldVal) => {
      console.log('监听到数组变化', newVal, oldVal);
      provinceName.value=newVal;
      // 在这里执行你想要的逻辑操作
      console.log(provinceName.value);
      console.log(path+provinceName.value+last);
      image_path.value=path+provinceName.value+last;
      console.log(image_path.value);
      console.log(store.state.provinceIntro.intro);
      intro.value=store.state.provinceIntro.intro;
      console.log(store.state.provinceIntro.injure,"真实里的")
      console.log(store.state.provinceIntro.death)
      console.log(store.state.provinceIntro.total)
      injurenum.value=store.state.provinceIntro.injure;
      deathnum.value =store.state.provinceIntro.death;
      totalnum.value=store.state.provinceIntro.total;
    },
    { deep: true, immediate: true }
);
onMounted(()=>{
  console.log(info.value);
})

</script>

<style scoped>
.image-container{
  border-radius: 6px;
  width:50%;
  background-size:cover;
  background-position: center;
}

.intro {
  margin-left: 8px;
  width: 50%;
  background-color: rgba(192, 77, 16, 0.09);
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0px 0px 10px rgba(72, 53, 53, 0.1);
  font-family: Arial, sans-serif;
  font-size: 15px;
  font-weight: bold;
  line-height: 1.5;
  position: relative;
}

.intro::before {
  content: "";
  position: absolute;
  top: -5px;
  left: -5px;
  right: -5px;
  bottom: -5px;
  border-radius: 15px;
  background-color: #cec9c8;
  z-index: -1;
}

.intro p {
  margin: 0;
}

:global(h2#card-usage ~ .example .example-showcase) {
  background-color: var(--el-fill-color) !important;
}

.statistic-card {
  height: 60%;
  padding: 2px;
  border-radius: 4px;
  background-color: var(--el-bg-color-overlay);
}

.statistic-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  font-size: 12px;
  color: var(--el-text-color-regular);
  margin-top: 16px;
}

.statistic-footer .footer-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.statistic-footer .footer-item span:last-child {
  display: inline-flex;
  align-items: center;
  margin-left: 4px;
}

.green {
  color: var(--el-color-success);
}

.red {
  color: var(--el-color-error);
}
</style>
