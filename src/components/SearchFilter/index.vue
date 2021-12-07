<template>
  <Form ref="formRef" :model="formData" layout="inline" class="search-filter">
    <FormItem
      v-for="item in configs"
      :key="item.name"
      :label="item.label"
      :name="item.name"
      v-bind="item.formItemProps"
    >
      <template v-if="item.type === 'input'">
        <Input
          v-model:value="formData[item.name]"
          :placeholder="item.placeholder"
          @press-enter="handleSearch"
          v-bind="item.props"
        />
      </template>
      <template v-if="item.type === 'inputSearch'">
        <InputSearch
          v-model:value="formData[item.name]"
          :placeholder="item.placeholder"
          @search="handleSearch"
          v-bind="item.props"
        >
          <template #enterButton>
            <Button @click="handleSearch">搜索</Button>
          </template>
        </InputSearch>
      </template>
      <template v-if="item.type === 'inputNumber'">
        <InputNumber
          :placeholder="item.placeholder"
          v-model:value="formData[item.name]"
          @press-enter="handleSearch"
          v-bind="item.props"
        />
      </template>
      <template v-if="item.type === 'select'">
        <Select
          :placeholder="item.placeholder"
          allow-clear
          v-model:value="formData[item.name]"
          v-bind="item.props"
          :options="item.options"
          @change="handleSearch"
        />
      </template>
    </FormItem>
  </Form>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { Form, Select, Input, InputNumber, Button } from 'ant-design-vue';

  export default defineComponent({
    name: 'SearchFilter',
    components: {
      Form,
      FormItem: Form.Item,
      Input,
      InputSearch: Input.Search,
      InputNumber,
      Select,
      Button,
    },
    props: {
      loading: {
        type: Boolean as PropType<boolean>,
        default: false,
      },
      configs: {
        type: Array as PropType<any[]>,
        require: true,
        default: () => [],
      },
    },
    emits: ['onSearch'],
    setup(props, { emit }) {
      const formRef = ref();

      const defaultData = props.configs.reduce(
        // @ts-ignore
        (pre, cur) => ({ [cur.name]: cur.defaultValue, ...pre }),
        {},
      ) as { [key: string]: any };

      const formData = ref<{ [key: string]: any }>(defaultData);

      const handleSearch = (event) => {
        emit('onSearch', event);
      };

      return { formRef, formData, handleSearch };
    },
  });
</script>

<style lang="less">
  .search-filter {
    .ant-form-item-control-input-content {
      width: 100%;
      display: flex;
      justify-content: flex-end;
    }

    .ant-input-search {
      width: 235px;
    }
  }
</style>
