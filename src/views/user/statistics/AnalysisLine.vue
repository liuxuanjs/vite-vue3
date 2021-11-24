<template>
  <div class="analysisLine">
    <Spin :spinning="loading">
      <div class="analysisLine-head">
        <RadioGroup :defaultValue="dataType" @change="onChangeDataType" button-style="solid">
          <RadioButton value="count">用户新增</RadioButton>
          <RadioButton value="percentage">用户增长率</RadioButton>
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
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { Radio, Spin } from 'ant-design-vue';

  import MyChart from '/@/components/Chart/index.vue';

  export default defineComponent({
    name: 'AnalysisPie',
    components: { Spin, MyChart, RadioGroup: Radio.Group, RadioButton: Radio.Button },
    props: {
      loading: {
        type: Boolean as PropType<boolean>,
        default: false,
      },
      dataType: {
        type: String as PropType<string>,
        default: '',
      },
      type: {
        type: String as PropType<string>,
        default: '',
      },
      lineData: {
        type: Object as PropType<any>,
        default: () => ({}),
      },
      onChangeDataType: {
        type: Function as PropType<Fn>,
        default: () => {},
      },
      onChangeType: {
        type: Function as PropType<Fn>,
        default: () => {},
      },
    },
  });
</script>

<style lang="less" scoped>
  .analysisLine {
    margin-bottom: 20px;
    background: #fff;
  }

  .analysisLine-head {
    display: flex;
    justify-content: space-between;
    padding: 30px 30px 0;
  }
</style>
