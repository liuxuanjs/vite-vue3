<template>
  <div class="vitality-analysisLine">
    <Spin :spinning="loading">
      <div class="analysisLine-head">
        <RadioGroup v-model:value="value1" button-style="solid">
          <RadioButton value="a">活跃人数</RadioButton>
          <RadioButton value="b">活跃比例</RadioButton>
        </RadioGroup>
        <RadioGroup v-model:value="value2">
          <RadioButton value="a">日</RadioButton>
          <RadioButton value="b">周</RadioButton>
          <RadioButton value="c">月</RadioButton>
        </RadioGroup>
      </div>
      <MyChart :options="lineData" height="380px" />
    </Spin>
  </div>
</template>

<script lang="ts">
  import { defineComponent, reactive, onMounted, toRefs } from 'vue';
  import { Radio, Spin } from 'ant-design-vue';

  import MyChart from '/@/components/Chart/index.vue';

  export default defineComponent({
    name: 'AnalysisPie',
    components: { Spin, MyChart, RadioGroup: Radio.Group, RadioButton: Radio.Button },
    setup() {
      const state = reactive({
        lineData: null as any,
        value1: 'a',
        value2: 'a',
        loading: false,
      });

      onMounted(() => {
        setTimeout(() => {
          state.lineData = {
            xAxis: {
              type: 'category',
              data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            },
            yAxis: {
              type: 'value',
            },
            series: [
              {
                data: [150, 230, 224, 218, 135, 147, 260],
                type: 'line',
              },
            ],
          };
        }, 1000);
      });

      return { ...toRefs(state) };
    },
  });
</script>

<style lang="less">
  .vitality-analysisLine {
    margin-bottom: 20px;
    background: #fff;

    .analysisLine-head {
      display: flex;
      justify-content: space-between;
      padding: 30px 30px 0;
    }
  }
</style>
