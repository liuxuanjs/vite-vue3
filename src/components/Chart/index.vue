<template>
  <div ref="chartRef" :style="{ height, width }"></div>
</template>
<script lang="ts">
  import type { EChartsOption } from 'echarts';

  import { defineComponent, ref, Ref, watchEffect } from 'vue';
  import { useECharts } from '/@/hooks/useECharts';

  export default defineComponent({
    name: 'MyChart',
    props: {
      width: {
        type: String as PropType<string>,
        default: '100%',
      },
      height: {
        type: String as PropType<string>,
        default: '280px',
      },
      options: {
        type: Object as PropType<EChartsOption | null>,
        default: null,
      },
    },
    setup(props) {
      const chartRef = ref<HTMLDivElement | null>(null);
      const { setOptions } = useECharts(chartRef as Ref<HTMLDivElement>);

      watchEffect(() => {
        if (props.options) {
          setOptions(props.options);
        }
      });

      return { chartRef };
    },
  });
</script>
