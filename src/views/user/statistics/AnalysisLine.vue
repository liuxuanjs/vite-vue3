<template>
  <div>
    <MyChart :options="lineData" height="380px" />
  </div>
</template>

<script lang="ts">
  import { defineComponent, reactive, onMounted, toRefs } from 'vue';

  import MyChart from '/@/components/Chart/index.vue';

  export default defineComponent({
    name: 'AnalysisPie',
    components: { MyChart },
    setup() {
      const state = reactive({
        lineData: null as any,
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

<style lang="less"></style>
