<template>
  <a
    :class="[
      'action-group__link',
      danger && 'action-group__dangerLink',
      disabled && 'action-group__disabledLink',
    ]"
    @click="handleClick"
  >
    {{ title }}
  </a>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'TableAction',
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
    },
    emits: ['click'],

    setup(props, { emit }) {
      const handleClick = (event) => {
        if (props.disabled) {
          event.preventDefault();
          return;
        }

        emit('click', event);
      };

      return { handleClick };
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
