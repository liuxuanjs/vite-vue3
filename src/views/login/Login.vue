<template>
  <div class="login-page">
    <div class="login-page__content">
      <div class="login-page__logo">D</div>
      <div class="login-page__title">DanceUP后台管理系统</div>
      <a-form class="login-page__section" ref="formRef" :model="formState" :rules="rules">
        <a-form-item name="mock1">
          <a-input v-model:value="formState.mock1" placeholder="账号" size="large" allowClear />
        </a-form-item>
        <a-form-item name="mock2">
          <a-input v-model:value="formState.mock2" placeholder="密码" size="large" allowClear />
        </a-form-item>
      </a-form>
      <a-button
        class="login-page__section login-page__button"
        type="primary"
        size="large"
        block
        :loading="loginLoading"
        @click="onLogin"
      >
        登录
      </a-button>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, reactive, UnwrapRef, ref } from 'vue';
  import { Form, Input, Button } from 'ant-design-vue';
  // import request from '@common/request';

  interface FormState {
    mock1: string;
    mock2: string;
  }

  const rules = {
    // employeeNo: [
    //   { required: true, message: '请输入员工编号', trigger: 'none' },
    //   { pattern: /\d{8}/, message: '员工编号为8位数字', trigger: 'none' },
    // ],
    // mobileCode: [
    //   { required: true, message: '请输入验证码', trigger: 'none' },
    //   { pattern: /\d{6}/, message: '验证码为6位数字', trigger: 'none' },
    // ],
  };

  export default defineComponent({
    name: 'Blank',
    components: {
      'a-form': Form,
      'a-form-item': Form.Item,
      'a-input': Input,
      'a-button': Button,
    },
    setup() {
      const formRef = ref();
      const formState: UnwrapRef<FormState> = reactive({
        mock1: '',
        mock2: '',
      });

      const loginLoading = ref(false);

      // const

      const onLogin = async () => {
        try {
          const validate = await formRef.value.validate();
          console.log(validate);

          loginLoading.value = true;
        } catch (error) {
          loginLoading.value = false;
        }
      };

      return {
        formRef,
        formState,
        rules,
        loginLoading,
        onLogin,
      };
    },
  });
</script>

<style lang="less">
  .login-page {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    background: rgba(230, 230, 230, 1);
    background-size: contain;

    .login-page__content {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 500px;
      height: 500px;
      background: #fff;
    }

    .login-page__logo {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 70px;
      height: 70px;
      margin-bottom: 20px;
      color: rgb(255, 255, 255);
      font-size: 40px;
      background: rgb(244, 0, 0);
      border-radius: 8px;
    }

    .login-page__title {
      margin-bottom: 60px;
      font-size: 14px;
      line-height: 20px;
      text-align: center;
    }

    .login-page__section {
      width: 290px;
    }

    .login-page__button {
      margin-top: 20px;
      background: #f40000;
      border-color: #f40000;
    }

    .ant-btn-primary:hover,
    .ant-btn-primary:focus {
      color: #fff;
      background: #ff3029;
      border-color: #ff3029;
    }
  }
</style>
