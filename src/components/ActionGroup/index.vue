<template>
  <Dropdown :trigger="['click']">
    <a class="action-group__link" @click.prevent v-if="defaultAction">
      操作
      <DownOutlined />
    </a>
    <Space v-else size="middle">
      <span
        v-for="(item, index) in actionList || []"
        :key="index"
        @click="(e) => e.stopPropagation()"
      >
        <TableAction
          :title="item.title"
          :disabled="item.disabled"
          :danger="item.danger"
          @click="item.onClick"
        />
      </span>
      <a class="action-group__link" v-if="menuList">
        <DownOutlined />
      </a>
    </Space>
    <template #overlay v-if="menuList">
      <Menu>
        <MenuItem v-for="(menuItem, index) in menuList" :key="index">
          <TableAction
            :title="menuItem.title"
            :disabled="menuItem.disabled"
            :danger="menuItem.danger"
            @click="menuItem.onClick"
          />
        </MenuItem>
      </Menu>
    </template>
  </Dropdown>
</template>

<script lang="ts">
  import { defineComponent, computed } from 'vue';
  import { Space, Dropdown, Menu } from 'ant-design-vue';
  import { DownOutlined } from '@ant-design/icons-vue';

  import { ActionGroupProps } from './props';
  import TableAction from '../TableAction/index.vue';

  export default defineComponent({
    name: 'ActionGroup',
    components: { Space, TableAction, Dropdown, Menu, MenuItem: Menu.Item, DownOutlined },
    props: ActionGroupProps,

    setup(props) {
      const actionList = computed((): null | any[] => {
        const { actions, limit, defaultAction } = props;
        if (!actions.length || defaultAction) return null;

        if (actions.length < limit) return actions;
        return actions.slice(0, limit);
      });

      const menuList = computed((): null | any[] => {
        const { actions, limit, defaultAction } = props;
        if (!actions.length) return null;
        if (defaultAction) return actions;

        if (actions.length < limit) return null;
        return actions.slice(limit - 1);
      });

      return { actionList, menuList };
    },
  });
</script>

<style lang="less"></style>
