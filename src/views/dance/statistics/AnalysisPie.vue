<template>
  <div class="dance-analysisPie">
    <Spin :spinning="loading">
      <div class="analysisPie-content">
        <div class="analysisPie-item" v-for="item in pieData" :key="item.key">
          <MyChart :options="item" height="380px" />
        </div>
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

<style lang="less">
  .dance-analysisPie {
    margin-bottom: 20px;
    background: #fff;

    .analysisPie-content {
      display: flex;
      flex-wrap: wrap;
      padding-top: 20px;
    }

    .analysisPie-item {
      padding: 20px;
      width: 50%;
    }
  }
</style>
