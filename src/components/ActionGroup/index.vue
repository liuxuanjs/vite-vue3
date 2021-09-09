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
        <ActionButton
          :title="item.title"
          :disabled="item.disabled"
          :danger="item.danger"
          :onClick="item.onClick"
        />
      </span>
      <a class="action-group__link" v-if="menuList">
        <DownOutlined />
      </a>
    </Space>
    <template #overlay v-if="menuList">
      <Menu>
        <MenuItem v-for="(menuItem, index) in menuList" :key="index">
          <ActionButton
            :title="menuItem.title"
            :disabled="menuItem.disabled"
            :danger="menuItem.danger"
            :onClick="menuItem.onClick"
          />
        </MenuItem>
      </Menu>
    </template>
  </Dropdown>
</template>

<script lang="ts">
  import { defineComponent, ref, watchEffect } from 'vue';
  import { Space, Dropdown, Menu } from 'ant-design-vue';
  import { DownOutlined } from '@ant-design/icons-vue';

  import ActionButton from '../ActionButton/index.vue';

  interface Action {
    title?: string;
    danger?: boolean;
    disabled?: boolean;
    onClick?: Fn;
  }

  export default defineComponent({
    name: 'ActionGroup',
    components: { Space, ActionButton, Dropdown, Menu, MenuItem: Menu.Item, DownOutlined },
    props: {
      actions: {
        type: Array as PropType<Action[]>,
        default: () => [],
      },
      limit: {
        type: Number as PropType<number>,
        default: 4,
      },
      defaultAction: {
        type: Boolean as PropType<boolean>,
        default: false,
      },
    },

    setup(props) {
      const actionList = ref<Action[] | null>(null);
      const menuList = ref<Action[] | null>(null);

      watchEffect(() => {
        const { actions, limit, defaultAction } = props;

        if (!actions.length) return;

        if (defaultAction) {
          menuList.value = actions;
          return;
        }

        if (actions.length < limit) {
          actionList.value = actions;
          return;
        }

        actionList.value = actions.slice(0, limit);
        menuList.value = actions.slice(limit - 1);

        console.log('actionList.value===', actionList.value);
        console.log('menuList.value===', menuList.value);
      });

      return { actionList, menuList };
    },
  });
</script>

<style lang="less"></style>
