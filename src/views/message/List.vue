<template>
  <Row class="user-list">
    <Col :xs="10" :sm="10" :md="8" :lg="8" :xl="7" class="user-list-col1">
      <div class="user-list-left">
        <div class="header-bar">
          <button class="header-bar-btn">
            <i class="iconfont iconfont-add"></i>
          </button>
          <button class="header-bar-btn">
            <i class="iconfont iconfont-refresh"></i>
          </button>
        </div>
        <div class="scroll-container">
          <div class="conversation">
            <div class="close-btn">
              <i class="iconfont iconfont-close"></i>
            </div>
            <div class="conversation-main">
              <Avatar class="user-avatar" type="C2C" />
              <div class="conversation-content">
                <div class="content-row">
                  <div class="name text-ellipsis">测试</div>
                  <div class="unread-count">
                    <!-- <span class="badge" v-if="showUnreadCount">
                      {{ conversation.unreadCount > 99 ? '99+' : conversation.unreadCount }}
                    </span> -->
                  </div>
                </div>
                <div class="content-row2">
                  <div class="summary">
                    <div class="text-ellipsis">33333333333333333333333333333</div>
                  </div>
                  <div class="date">2021-09-17</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Col>
    <Col :xs="14" :sm="14" :md="16" :lg="16" :xl="17" class="user-list-col2">
      <div class="user-list-right">
        <div class="header">测试</div>
        <div class="content">
          <div class="message-list">
            <!-- <div class="more" v-if="!isCompleted">
              <Button type="text">查看更多</Button>
            </div>
            <div class="no-more" v-else>没有更多了</div> -->
            <div class="no-more">没有更多了</div>
            <div class="message-wrapper">
              <div class="message-left">
                <div class="col-1">
                  <Avatar class="user-avatar" type="C2C" />
                </div>
                <div class="col-2">
                  <div class="base">
                    <div class="base-name text-ellipsis">测试</div>
                    <div class="date">2021-09-17 17:13</div>
                  </div>
                  <div class="content-wrapper">
                    <div class="message-content message-received">
                      <span class="text-box">您好，我是示例客服～</span>
                    </div>
                  </div>
                </div>
              </div>

              <div class="message-right">
                <div class="col-1">
                  <Avatar class="user-avatar" type="C2C" />
                </div>
                <div class="col-2">
                  <div class="base">
                    <div class="base-name text-ellipsis">我</div>
                    <div class="date">2021-09-17 17:13</div>
                  </div>
                  <div class="content-wrapper">
                    <div class="message-content message-received">
                      <span class="text-box">您好，我是示例客服～</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="footer" :style="{ background: focus ? '#fff' : '' }">
          <div class="message-send-box-wrapper">
            <div class="send-header-bar">
              <i class="btn-send-icon iconfont iconfont-tupian"></i>
            </div>
            <div class="send-bottom">
              <TextArea
                :auto-size="{ minRows: 4, maxRows: 4 }"
                class="text-input"
                @focus="focus = true"
                @blur="focus = false"
              />
              <Tooltip title="按Enter发送消息，Ctrl+Enter换行" placement="left">
                <div class="btn-send">
                  <i class="iconfont iconfont-send"></i>
                </div>
              </Tooltip>
            </div>
          </div>
        </div>
      </div>
    </Col>
  </Row>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { Row, Col, Button, Input, Tooltip } from 'ant-design-vue';

  // import TIM from 'tim-js-sdk';
  // import tim from '/@/utils/lib/tim';

  import Avatar from '/@/components/Avatar/index.vue';

  // export default {
  //   name: 'MessageList',
  //   // eslint-disable-next-line
  //   components: { Row, Col, Button, Avatar, TextArea: Input.TextArea, Tooltip },
  //   data() {
  //     return {
  //       focus: false,
  //     };
  //   },

  //   mounted() {
  //     // 初始化监听器
  //     this.initListener();
  //   },

  //   methods: {
  //     initListener() {
  //       // 登录成功后会触发 SDK_READY 事件，该事件触发后，可正常使用 SDK 接口
  //       tim.on(TIM.EVENT.SDK_READY, this.onReadyStateUpdate, this);
  //       // SDK NOT READT
  //       tim.on(TIM.EVENT.SDK_NOT_READY, this.onReadyStateUpdate, this);
  //     },

  //     onReadyStateUpdate({ name }) {
  //       console.log('name===', name);
  //     },
  //   },
  // };

  export default defineComponent({
    name: 'MessageList',
    // eslint-disable-next-line
    components: { Row, Col, Button, Avatar, TextArea: Input.TextArea, Tooltip },
    setup() {
      const focus = ref(false);

      // const onReadyStateUpdate = ({ name }) => {
      //   console.log('name===', name);
      // };

      // onMounted(() => {
      //   tim.login({ userID: 1 }).then(() => {
      //     // 登录成功后会触发 SDK_READY 事件，该事件触发后，可正常使用 SDK 接口
      //     tim.on(TIM.EVENT.SDK_READY, onReadyStateUpdate);
      //   });
      // });

      return { focus };
    },
  });
</script>

<style lang="less">
  .user-list {
    height: 100%;
    margin: 20px;

    .user-list-col2 {
      background-color: #f5f5f5;
    }

    .text-ellipsis {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .user-list-left {
      height: 100%;
      position: relative;
      background-color: #363e47;
      display: flex;
      flex-direction: column;

      .header-bar {
        flex-shrink: 0;
        height: 50px;
        border-bottom: 1px solid #303841;
        padding: 10px 10px 10px 20px;
        text-align: right;
      }

      .header-bar-btn {
        display: inline-block;
        cursor: pointer;
        background: #303841;
        border: none;
        color: #76828c;
        box-sizing: border-box;
        transition: 0.3s;
        user-select: none;
        margin: 0 10px 0 0;
        padding: 0;
        width: 30px;
        height: 30px;
        line-height: 30px;
        font-size: 24px;
        text-align: center;
        white-space: nowrap;
        border-radius: 50%;
        outline: 0;

        &:hover {
          transform: rotate(1turn);
          color: #5cadff;
        }
      }

      .scroll-container {
        overflow-y: scroll;
        flex: 1;
      }

      .conversation {
        padding: 15px 20px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        transition: 0.2s;

        &:hover {
          background-color: #404953;

          .close-btn {
            right: 3px;
          }
        }
      }

      .close-btn {
        position: absolute;
        right: -20px;
        top: 3px;
        color: #76828c;
        transition: all 0.2s ease;

        &:hover {
          color: #f35f5f;
        }
      }

      .conversation-main {
        display: flex;
      }

      .user-avatar {
        width: 40px;
        height: 40px;
        margin-right: 10px;
        border-radius: 50%;
        flex-shrink: 0;
      }

      .conversation-content {
        flex: 1;
        height: 40px;
        overflow: hidden;
      }

      .content-row {
        display: flex;
        line-height: 21px;
      }

      .name {
        color: #f7f7f8;
        flex: 1;
        min-width: 0;
      }

      .unread-count {
        padding-left: 10px;
        flex-shrink: 0;
        color: #76828c;
        font-size: 12px;
      }

      .badge {
        vertical-align: bottom;
        background-color: #f35f5f;
        border-radius: 10px;
        color: #fff;
        display: inline-block;
        font-size: 12px;
        height: 18px;
        max-width: 40px;
        line-height: 18px;
        padding: 0 6px;
        text-align: center;
        white-space: nowrap;
      }

      .content-row2 {
        display: flex;
        font-size: 12px;
        padding-top: 3px;
      }

      .summary {
        flex: 1;
        overflow: hidden;
        min-width: 0;
        color: #a5b5c1;
      }

      .date {
        padding-left: 10px;
        flex-shrink: 0;
        text-align: right;
        color: #76828c;
      }
    }

    .user-list-right {
      height: 100%;
      background-color: #f5f5f5;
      color: #1c2438;
      display: flex;
      flex-direction: column;

      .header {
        border-bottom: 1px solid #e7e7e7;
        height: 50px;
        position: relative;
        padding: 0 20px;
        color: #1c2438;
        font-size: 18px;
        font-weight: 700;
        line-height: 50px;
        text-shadow: #76828c 0 0 0.1em;
      }

      .content {
        display: flex;
        flex: 1;
        flex-direction: column;
        height: 100%;
        overflow: hidden;
        position: relative;
      }

      .message-list {
        width: 100%;
        box-sizing: border-box;
        overflow-y: auto;
        padding: 0 20px;
      }

      .more {
        display: flex;
        justify-content: center;
        font-size: 12px;
      }

      .no-more {
        display: flex;
        justify-content: center;
        color: #a5b5c1;
        font-size: 12px;
        padding: 10px;
      }

      .message-wrapper {
        margin: 20px 0;
      }

      .message-left {
        display: flex;
        justify-content: flex-start;
      }

      .col-2 {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
      }

      .base {
        color: #a5b5c1;
        font-size: 12px;
        display: flex;
      }

      .base-name {
        padding: 0 4px;
        max-width: 100px;
      }

      .content-wrapper {
        display: flex;
        align-items: center;
        margin-top: 5px;
        outline: none;
      }

      .message-content {
        outline: none;
        font-size: 14px;
        position: relative;
        max-width: 350px;
        word-wrap: break-word;
        word-break: break-all;
        padding: 10px;
        box-shadow: 0 5px 10px 0 rgb(0 0 0 / 10%);

        &::before {
          content: '\e900';
          position: absolute;
          top: 0;
          width: 12px;
          height: 40px;
          font-family: iconfont !important;
          font-size: 24px;
        }
      }

      .message-received {
        background-color: #fff;
        margin-left: 15px;
        border-radius: 0 4px 4px;

        &::before {
          left: -10px;
          transform: scaleX(-1);
          color: #fff;
        }
      }

      .message-right {
        display: flex;
        flex-direction: row-reverse;

        .col-2 {
          align-items: flex-end;
        }

        .base {
          flex-direction: row-reverse;
        }

        .message-received {
          margin-right: 15px;
          background-color: #5cadff;
          color: #fff;

          &::before {
            left: auto;
            right: -10px;
            transform: scaleX(1);
            color: #5cadff;
          }
        }
      }

      .footer {
        border-top: 1px solid #e7e7e7;

        .message-send-box-wrapper {
          box-sizing: border-box;
          overflow: hidden;
          padding: 3px 20px 20px;
        }

        .send-header-bar {
          box-sizing: border-box;
          padding: 3px 0 0;
        }

        .btn-send-icon {
          cursor: pointer;
          font-size: 24px;
          color: grey;
          margin: 0 12px 0 0;

          &:hover {
            color: #000;
          }
        }

        .send-bottom {
          padding-top: 10px;
          position: relative;
        }

        .text-input {
          font-size: 16px;
          width: 100%;
          border: none;
          outline: none;
          background-color: transparent;
          box-shadow: none;
          padding: 2px;
        }

        .btn-send {
          cursor: pointer;
          position: absolute;
          color: #2d8cf0;
          font-size: 30px;
          right: 0;
          bottom: -5px;
          padding: 6px 6px 4px 4px;
          border-radius: 50%;
        }
      }
    }
  }
</style>
