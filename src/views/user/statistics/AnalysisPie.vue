<template>
  <div class="analysisPie">
    <Spin :spinning="loading">
      <div :style="{ display: 'flex' }">
        <MyChart
          class="analysisPie-chart"
          v-for="item in pieData"
          :key="item.key"
          :options="item"
          height="380px"
        />
      </div>
    </Spin>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { Spin } from 'ant-design-vue';

  import MyChart from '/@/components/Chart/index.vue';

  export default defineComponent({
    name: 'AnalysisPie',
    components: { Spin, MyChart },
    props: {
      loading: {
        type: Boolean as PropType<boolean>,
        default: false,
      },
      pieData: {
        type: Array as PropType<any[]>,
        default: () => [],
      },
    },
  });
</script>

<style lang="less" scoped>
  .analysisPie {
    margin-bottom: 20px;
    background: #fff;
  }

  .analysisPie-chart {
    padding: 20px;
    display: inline-block;
  }
</style>
