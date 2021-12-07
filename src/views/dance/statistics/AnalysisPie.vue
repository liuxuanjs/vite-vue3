<template>
  <div class="dance-analysisPie">
    <Spin :spinning="loading">
      <div class="analysisPie-content">
        <div class="analysisPie-item">
          <MyChart :options="pieData" height="380px" />
        </div>
        <div class="analysisPie-item">
          <MyChart :options="pieData" height="380px" />
        </div>
        <div class="analysisPie-item">
          <MyChart :options="pieData" height="380px" />
        </div>
        <div class="analysisPie-item">
          <MyChart :options="pieData" height="380px" />
        </div>
      </div>
    </Spin>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue';
  import { Spin } from 'ant-design-vue';

  import MyChart from '/@/components/Chart/index.vue';

  export default defineComponent({
    name: 'AnalysisPie',
    components: { Spin, MyChart },
    setup() {
      const pieData = ref<any>(null);
      const loading = ref<boolean>(false);

      onMounted(() => {
        setTimeout(() => {
          pieData.value = {
            title: {
              text: '性别比例',
              left: 'center',
            },
            tooltip: {
              trigger: 'item',
            },
            series: [
              {
                name: '访问来源',
                type: 'pie',
                radius: '50%',
                data: [
                  { value: 1048, name: '搜索引擎' },
                  { value: 735, name: '直接访问' },
                  { value: 580, name: '邮件营销' },
                  { value: 484, name: '联盟广告' },
                  { value: 300, name: '视频广告' },
                ],
                emphasis: {
                  itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)',
                  },
                },
              },
            ],
          };
        }, 1000);
      });

      return { pieData, loading };
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
    }

    .analysisPie-item {
      padding: 20px;
      width: 50%;
    }
  }
</style>
