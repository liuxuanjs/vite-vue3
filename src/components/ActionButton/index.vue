<template>
  <a
    :class="[
      'action-group__link',
      danger && 'action-group__dangerLink',
      disabled && 'action-group__disabledLink',
    ]"
    @click="onClickFn"
  >
    {{ title }}
  </a>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'ActionButton',
    props: {
      title: {
        type: String as PropType<string>,
        default: '',
      },
      disabled: {
        type: Boolean as PropType<boolean>,
        default: false,
      },
      danger: {
        type: Boolean as PropType<boolean>,
        default: false,
      },
      onClick: {
        type: Function as PropType<Fn>,
        default: null,
      },
    },

    setup(props) {
      const onClickFn = () => {
        if (props.disabled || !props.onClick) return;
        props.onClick();
      };

      return { onClickFn };
    },
  });
</script>

<style lang="less">
  .action-group__link {
    color: #3464e0;
    white-space: nowrap;
  }

  .action-group__dangerLink {
    color: #ff7548;

    &:hover {
      color: #f79c7e;
    }
  }

  .action-group__disabledLink {
    color: gray;

    &:hover {
      color: gray;
    }
  }
</style>
