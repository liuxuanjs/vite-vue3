<template>
  <div class="avatar" :class="shape === 'circle' ? 'shape-circle' : ''">
    <img class="avatar-img" :src="avatarSrc" />
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent } from 'vue';

  export default defineComponent({
    name: 'Avatar',
    props: {
      src: {
        type: String as PropType<string>,
        default: '',
      },
      type: {
        type: String as PropType<string>,
        default: 'C2C',
      },
      shape: {
        type: String as PropType<string>,
        default: 'circle',
      },
    },
    setup(props) {
      // const defaultSrc = computed(() => {
      //   const { type } = props;
      //   switch (type) {
      //     case 'C2C':
      //       // 个人头像
      //       return '/@/assets/images/avatar-2.png';
      //     case 'GROUP':
      //       // 群默认头像
      //       return '/@/assets/images/avatar-3.png';
      //     // case TIM.TYPES.CONV_SYSTEM:
      //     //   return systemAvatar;
      //     default:
      //       // 默认头像
      //       return '/@/assets/images/avatar-1.png';
      //   }
      // });

      const avatarSrc = computed(() => {
        const { src } = props;
        if (/^(https:|http:|\/\/)/.test(src)) {
          return src;
        } else {
          const { type } = props;
          switch (type) {
            case 'C2C':
              // 个人头像
              return '/@/assets/images/avatar-2.png';
            case 'GROUP':
              // 群默认头像
              return '/@/assets/images/avatar-3.png';
            // case TIM.TYPES.CONV_SYSTEM:
            //   return systemAvatar;
            default:
              // 默认头像
              return '/@/assets/images/avatar-1.png';
          }
        }
      });

      return { avatarSrc };
    },
  });
</script>

<style lang="less" scoped>
  .avatar {
    background-color: #a5b5c1;
    text-align: center;
    width: 100%;
    height: 100%;
    overflow: hidden;

    .avatar-img {
      width: 100%;
      height: 100%;
    }
  }

  .shape-circle {
    border-radius: 50%;
  }
</style>
