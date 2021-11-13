<template>
  <div class="login-page">
    <div class="login-page-content">
      <div class="login-page-logo">D</div>
      <div class="login-page-title">DanceUP后台管理系统</div>
      <Form class="login-page-section" ref="formRef" :model="formState" :rules="rules">
        <FormItem name="username">
          <Input v-model:value="formState.username" placeholder="账号" size="large" allowClear />
        </FormItem>
        <FormItem name="pass">
          <Input v-model:value="formState.pass" placeholder="密码" size="large" allowClear />
        </FormItem>
      </Form>
      <Button
        class="login-page-section login-page-button"
        type="primary"
        size="large"
        block
        :loading="loding"
        @click="onLogin"
      >
        登录
      </Button>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, reactive, ref } from 'vue';
  import { Form, Input, Button } from 'ant-design-vue';

  import { useRoute } from 'vue-router';

  import { loginApi } from '/@/api/user';

  interface FormState {
    username?: string;
    pass?: string;
  }

  const rules = {
    username: [{ required: true, message: '请输入账号', trigger: 'none' }],
    pass: [{ required: true, message: '请输入密码', trigger: 'none' }],
  };

  export default defineComponent({
    name: 'LoginPage',
    components: { Form, FormItem: Form.Item, Input, Button },
    setup() {
      const formRef = ref();
      const formState = reactive({} as FormState);
      const loding = ref(false);
      const { query } = useRoute();

      const onLogin = () => {
        formRef.value.validate().then((value) => {
          loding.value = true;
          loginApi(value)
            .then(() => {
              // 后台先写死用户信息
              // localStorage.setItem('userId', 'administrator');
              // localStorage.setItem('username', value.username);
              localStorage.setItem(
                'userInfo',
                JSON.stringify({
                  userId: 'administrator',
                  username: value.username,
                }),
              );

              const { backUrl } = query;
              window.location.replace(backUrl?.toString() || '/');
            })
            .finally(() => {
              loding.value = false;
            });
        });
      };

      return { formRef, formState, rules, loding, onLogin };
    },
  });
</script>

<style lang="less">
  .login-page {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    background: rgb(230 230 230 / 100%);
    background-size: contain;

    .login-page-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 500px;
      height: 500px;
      background: #fff;
    }

    .login-page-logo {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 70px;
      height: 70px;
      margin-bottom: 20px;
      color: rgb(255 255 255);
      font-size: 40px;
      background: rgb(244 0 0);
      border-radius: 8px;
    }

    .login-page-title {
      margin-bottom: 60px;
      font-size: 14px;
      line-height: 20px;
      text-align: center;
    }

    .login-page-section {
      width: 290px;
    }

    .login-page-button {
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
