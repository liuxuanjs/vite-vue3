<template>
  <div class="customer-vitalityLine">
    <Spin :spinning="loading">
      <div class="line-head">
        <RadioGroup :defaultValue="dataType" @change="onChangeDataType" button-style="solid">
          <RadioButton value="count">活跃人数</RadioButton>
          <RadioButton value="percentage">活跃比例</RadioButton>
        </RadioGroup>
        <RadioGroup :defaultValue="type" @change="onChangeType">
          <RadioButton value="date">日</RadioButton>
          <RadioButton value="week">周</RadioButton>
          <RadioButton value="month">月</RadioButton>
        </RadioGroup>
      </div>
      <MyChart :options="lineData" height="380px" />
    </Spin>
  </div>
  <Table
    :loading="loading"
    :dataSource="tableData"
    :columns="columns"
    :pagination="false"
    row-key="key"
    :style="{ padding: '30px', background: '#fff' }"
  />
</template>

<script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue';
  import { Radio, Spin, Table } from 'ant-design-vue';

  import MyChart from '/@/components/Chart/index.vue';

  import { getNewCustomerRecordCountApi } from '/@/api/customer';

  export default defineComponent({
    name: 'CustomerVitalityLineTable',
    components: { Spin, MyChart, RadioGroup: Radio.Group, RadioButton: Radio.Button, Table },
    setup() {
      const loading = ref<boolean>(false);
      const dataType = ref<string>('count');
      const type = ref<string>('date');
      const lineData = ref<any>({});
      const tableData = ref<any[]>([]);

      const createTopPercent = (data) => {
        return `${data.name}</br> ${data.marker} ${
          dataType.value === 'percentage' ? '活跃比例' : '活跃人数'
        }: ${data.data}${dataType.value === 'percentage' ? `%` : ''}`;
      };

      const getData = () => {
        loading.value = true;
        getNewCustomerRecordCountApi({ type: type.value })
          .then((res) => {
            const result = {
              xAxis: { type: 'category', data: [] as string[] },
              yAxis: { type: 'value' } as any,
              tooltip: {
                trigger: 'axis',
                formatter(data) {
                  return data.map((item) => createTopPercent(item))[0];
                },
              },
              series: [{ data: [] as number[], type: 'line' }],
            };

            if (dataType.value === 'percentage') {
              result.yAxis.axisLabel = {
                show: true,
                interval: 'auto',
                formatter: '{value}%',
              };
            }
            (res || []).forEach((item): void => {
              result.xAxis.data.push(item.key);
              result.series[0].data.push(
                dataType.value === 'percentage'
                  ? item.newUserRate.split('%')[0]
                  : item.newUserCount,
              );
            });

            tableData.value = res || [];
            lineData.value = result;
          })
          .finally(() => {
            loading.value = false;
          });
      };

      const onChangeDataType = (e) => {
        dataType.value = e.target.value;
        getData();
      };

      const onChangeType = (e) => {
        type.value = e.target.value;
        getData();
      };

      onMounted(() => {
        getData();
      });

      return {
        loading,
        dataType,
        type,
        lineData,
        tableData,
        onChangeDataType,
        onChangeType,
        columns: [
          {
            title: '日期',
            dataIndex: 'key',
          },
          {
            title: '活跃用户',
            dataIndex: 'newUserCount',
          },
          {
            title: '总用户',
            dataIndex: 'totalUser',
          },
          {
            title: '占比',
            dataIndex: 'newUserRate',
          },
          {
            title: '人均登陆次数',
            dataIndex: 'newUserRecordCount',
          },
        ],
      };
    },
  });
</script>

<style lang="less">
  .customer-vitalityLine {
    margin-bottom: 20px;
    background: #fff;

    .line-head {
      display: flex;
      justify-content: space-between;
      padding: 30px 30px 0;
    }
  }
</style>
