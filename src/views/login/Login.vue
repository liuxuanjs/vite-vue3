<template>
  <div class="login-page">
    <div class="container">
      <div class="logo"></div>
      <a-form ref="form" :model="model" :rules="rules">
        <div class="field">
          <a-form-item name="employeeNo">
            <a-input
              v-model:value="model.employeeNo"
              placeholder="员工编号"
              size="large"
              allow-clear
              @press-enter="onLogin"
            >
              <template #prefix>
                <UserOutlined />
              </template>
            </a-input>
          </a-form-item>
        </div>

        <div v-if="message">
          <a-alert :message="message" type="error" show-icon closable />
        </div>

        <div class="field captcha-field">
          <a-form-item class="captcha-field-input" name="mobileCode">
            <a-input
              v-model:value="model.mobileCode"
              placeholder="验证码"
              size="large"
              allow-clear
              @press-enter="onLogin"
            >
              <template #prefix>
                <MailOutlined />
              </template>
            </a-input>
          </a-form-item>
          <a-button v-if="countdown > 0" class="captcha-btn" size="large" disabled>
            {{ countdown }}秒后重发
          </a-button>
          <a-button
            v-else
            :loading="captchaLoading"
            class="captcha-btn"
            size="large"
            @click="onSendCaptcha"
          >
            获取验证码
          </a-button>
        </div>
        <div>
          <a-form-item name="type">
            <a-radio-group v-model:value="model.type" :options="loginTypes" />
          </a-form-item>
        </div>
        <a-button
          class="login-btn"
          type="primary"
          size="large"
          block
          :loading="loginLoading"
          @click="onLogin"
        >
          登录
        </a-button>
        <p class="tips">若您的手机号已变更，请联系HR人员进行处理</p>
      </a-form>
    </div>
  </div>
</template>

<script>
  import { Form, Input, Button, Alert, Radio } from 'ant-design-vue';
  import { UserOutlined, MailOutlined } from '@ant-design/icons-vue';
  // import request from '@common/request';

  export default {
    components: {
      'a-form': Form,
      'a-form-item': Form.Item,
      'a-input': Input,
      'a-button': Button,
      'a-alert': Alert,
      'a-radio-group': Radio.Group,
      UserOutlined,
      MailOutlined,
    },
    data() {
      return {
        model: {
          employeeNo: '',
          mobile: '',
          mobileCode: '',
          type: 2,
        },
        captchaLoading: false,
        loginLoading: false,
        countdown: null,
        message: '',
        rules: {
          employeeNo: [
            { required: true, message: '请输入员工编号', trigger: 'none' },
            { pattern: /\d{8}/, message: '员工编号为8位数字', trigger: 'none' },
          ],
          mobileCode: [
            { required: true, message: '请输入验证码', trigger: 'none' },
            { pattern: /\d{6}/, message: '验证码为6位数字', trigger: 'none' },
          ],
        },
        loginTypes: [
          { label: '企业微信接收验证码', value: 2 },
          { label: '短信接收验证码', value: 1 },
        ],
      };
    },

    // unmounted() {
    //   if (this.timeHandler) {
    //     clearInterval(this.timeHandler);
    //   }
    // },

    // methods: {
    //   onSendCaptcha() {
    //     this.$refs.form
    //       .validateFields(['employeeNo'])
    //       .then(() => {
    //         this.message = '';
    //         this.sendCaptcha();
    //       })
    //       .catch((e) => {
    //         console.log(e);
    //       });
    //   },

    //   doCountdown: function() {
    //     this.countdown = 60;
    //     this.timeHandler = setInterval(() => {
    //       if (this.countdown <= 0) {
    //         clearInterval(this.timeHandler);
    //         this.timeHandler = null;
    //       }
    //       this.countdown--;
    //     }, 1000);
    //   },

    //   sendCaptcha: function() {
    //     const { employeeNo, type } = this.model;

    //     this.captchaLoading = true;

    //     request({
    //       url: '/login/pc',
    //       data: {
    //         employeeNo,
    //         type,
    //       },
    //       handleError: [7020001],
    //     })
    //       .then((data) => {
    //         message.success('验证码已发送');

    //         this.model.mobile = data.mobile;
    //         this.captchaLoading = false;
    //         this.doCountdown();
    //       })
    //       .catch((err) => {
    //         this.captchaLoading = false;

    //         if (err.code === 7020001) {
    //           this.message = '未查询到符合的员工数据，请核对后重新输入';
    //         }
    //       });
    //   },

    //   onLogin: function() {
    //     const result = this.$refs.form.validate();

    //     result
    //       .then(() => {
    //         this.login();
    //       })
    //       .catch((e) => {
    //         // form表单校验必选项时，不抛出错误，就不会被 sentry 捕获
    //         console.log(e);
    //       });
    //   },

    //   login: function() {
    //     const { employeeNo, mobile, mobileCode } = this.model;

    //     this.loginLoading = true;
    //     request({
    //       url: '/login/bind',
    //       data: {
    //         employeeNo,
    //         mobile,
    //         mobileCode,
    //         loginType: 5,
    //       },
    //     })
    //       .then((data) => {
    //         localStorage.setItem('token', data.token);

    //         this.loginLoading = false;

    //         const { backUrl } = this.$route.query;

    //         location.replace(backUrl || '/');
    //       })
    //       .catch(() => {
    //         this.loginLoading = false;
    //       });
    //   },
    // },
  };
</script>

<style lang="less">
  .login-page {
    display: flex;
    align-items: center;
    height: 100%;
    background: url(../../static/images/login/bg.svg);
    background-size: contain;

    .container {
      width: 370px;
      margin: 0 auto;
    }

    .logo {
      width: 264px;
      height: 65px;
      margin: 0 auto 100px;
      background: url(../../static/images/common/logo.png);
      background-size: contain;
    }

    .ant-col {
      width: 100%;
    }

    .field {
      margin-top: 24px;
    }

    .ant-input-prefix {
      color: #1890ff;
    }

    .captcha-field {
      display: flex;
    }

    .captcha-field-input {
      flex: 1;
    }

    .captcha-btn {
      margin-left: 8px;
    }

    .login-btn {
      margin-top: 20px;
    }

    .tips {
      margin-top: 16px;
      color: #666;
      text-align: center;
    }
  }
</style>
