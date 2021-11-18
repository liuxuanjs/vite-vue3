<template>
  <Row class="user-list">
    <Col :xs="10" :sm="10" :md="8" :lg="8" :xl="7" class="user-list-col1">
      <div class="user-list-left">
        <div class="header-bar">
          <button class="header-bar-btn" @click="onShowModal">
            <i class="iconfont iconfont-add"></i>
          </button>
          <button class="header-bar-btn" @click="getChatList">
            <i class="iconfont iconfont-refresh"></i>
          </button>
        </div>
        <div class="scroll-container">
          <div
            v-for="(item, index) in chatList"
            :key="index"
            @click="
              getChatDetail(
                item.conversationID,
                item.userProfile.userID,
                item.userProfile.avatar,
                item.userProfile.nick,
              )
            "
            :class="['conversation', item.conversationID == activeId && 'conversation-active']"
          >
            <div
              class="close-btn"
              @click="
                (e) =>
                  deleteChat(
                    e,
                    item.conversationID,
                    item.userProfile.nick || item.userProfile.userID,
                  )
              "
            >
              <i class="iconfont iconfont-close"></i>
            </div>
            <div class="conversation-main">
              <Avatar class="user-avatar" type="C2C" :src="item.userProfile.avatar" />
              <div class="conversation-content">
                <div class="content-row">
                  <div class="name text-ellipsis">
                    {{ item.userProfile.nick || item.userProfile.userID }}
                  </div>
                  <div class="unread-count">
                    <span class="badge" v-if="item.unreadCount > 0">
                      {{ item.unreadCount > 99 ? '99+' : item.unreadCount }}
                    </span>
                  </div>
                </div>
                <div class="content-row2">
                  <div class="summary">
                    <div class="text-ellipsis">{{ item.lastMessage.messageForShow }}</div>
                  </div>
                  <div class="date">{{ formatDate(item.lastMessage.lastTime) }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Col>
    <Col :xs="14" :sm="14" :md="16" :lg="16" :xl="17" class="user-list-col2">
      <div class="user-list-right" v-if="chatDetail">
        <div class="header" v-if="currentChatName">{{ currentChatName }}</div>
        <div class="right-main">
          <div class="content" ref="messageRef">
            <div class="no-more" v-if="chatDetail.isCompleted">没有更多了</div>
            <div class="more" v-else>
              <Button type="text" @click="seeMore()">查看更多</Button>
            </div>
            <div class="message-wrapper">
              <div
                v-for="(item, index) in chatDetail.messageList"
                :key="index"
                :class="item.to !== currentUserId ? 'message-left' : 'message-right'"
              >
                <div class="col-1">
                  <Avatar class="user-avatar" type="C2C" :src="currentAvatar" />
                </div>
                <div class="col-2">
                  <div class="base">
                    <div class="base-name text-ellipsis">{{ currentChatName }}</div>
                    <div class="date">{{ formatDate(item.time) }}</div>
                  </div>
                  <div class="content-wrapper">
                    <div class="message-content message-received">
                      <span class="text-box" v-if="item.type == 'TIMTextElem'">
                        {{ item.payload.text }}
                      </span>
                      <div class="text-box" v-if="item.type == 'TIMImageElem'">
                        <img class="image-element" :src="item.payload.imageInfoArray[0].url" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="footer" :style="{ background: focus ? '#fff' : '' }">
          <div class="message-send-box-wrapper">
            <div class="send-header-bar" @click="handleSendImageClick">
              <i class="btn-send-icon iconfont iconfont-tupian"></i>
            </div>
            <div class="send-bottom">
              <TextArea
                :auto-size="{ minRows: 4, maxRows: 4 }"
                class="text-input"
                @focus="focus = true"
                @blur="focus = false"
                v-model:value="messageText"
                @pressEnter="messageSendlisten"
              />
              <!-- <Tooltip title="按Enter发送消息，Ctrl+Enter换行" placement="left">
                <div class="btn-send" @click="sendMessage">
                  <i class="iconfont iconfont-send"></i>
                </div>
              </Tooltip> -->
            </div>
          </div>
        </div>
      </div>
    </Col>
  </Row>
  <input
    type="file"
    id="imagePicker"
    ref="imagePicker"
    accept=".jpg, .jpeg, .png, .gif, .bmp"
    @change="sendImage"
    style="display: none"
  />
  <Modal v-model:visible="visible" title="快速发起会话" @ok="handleOk" :width="350">
    <Input v-model:value="searchId" placeholder="请输入用户ID" />
  </Modal>
</template>

<script lang="ts">
  import { defineComponent, ref, onMounted, nextTick, onUnmounted, computed } from 'vue';
  import { Row, Col, Button, Input, Tooltip, message, Modal } from 'ant-design-vue';
  import tim from '/@/utils/lib/tim';
  import TIM from 'tim-js-sdk';
  import { useStore } from 'vuex';

  import Avatar from '/@/components/Avatar/index.vue';
  import { getUserSigApi } from '/@/api/user';
  import moment from 'moment';

  export default defineComponent({
    name: 'MessageList',
    // eslint-disable-next-line
    components: { Row, Col, Button, Avatar, TextArea: Input.TextArea, Tooltip, Modal, Input },
    setup() {
      const userSig = ref(''); // 用户登录即时通信 IM 的密码
      const chatList = ref([]); //会话列表
      const chatDetail = ref<any>(null); //会话具体信息
      const currentUserId = ref(''); // 当前会话人 userid
      const currentAvatar = ref(''); // 当前会话人头像
      const currentChatName = ref(''); // 当前会话人名字
      const activeId = ref(''); // 选中的会话id
      const messageRef = ref();
      const focus = ref(false); // 文本框聚焦
      const messageText = ref(''); // 文本框输入内容
      const visible = ref(false);
      const searchId = ref('');
      const imagePicker = ref();

      const store = useStore();

      const userInfo = computed(() => store.state.userInfo);

      // 自动保持在最底部
      const setMessageBelow = () => {
        nextTick(() => {
          if (messageRef.value) {
            messageRef.value.scrollTop = messageRef.value.scrollHeight;
          }
        });
      };

      // 消息已读
      const setMessageRead = (id) => {
        tim
          .setMessageRead({ conversationID: id })
          .then(function (imResponse) {
            // 已读上报成功，指定 ID 的会话的 unreadCount 属性值被置为0
            console.log('消息已读imResponse===', imResponse);
          })
          .catch(function (imError) {
            // 已读上报失败
            console.warn('setMessageRead error:', imError);
          });
      };

      // 获取会话列表
      const getChatList = () => {
        tim
          .getConversationList()
          .then(function (imResponse) {
            chatList.value = imResponse.data.conversationList;
          })
          .catch((imError) => {
            console.log(imError);
          });
      };

      // 获取会话详情
      const getChatDetail = (conversationID, userID, avatar, chatName) => {
        if (userID === currentUserId.value) return;

        chatDetail.value = null;
        currentUserId.value = userID;
        currentAvatar.value = avatar;
        activeId.value = conversationID;
        currentChatName.value = chatName || userID;

        tim
          .getMessageList({
            conversationID: conversationID,
            count: 15,
          })
          .then(function (imResponse) {
            // @ts-ignore
            chatDetail.value = {
              messageList: imResponse.data.messageList, // 消息列表。
              nextReqMessageID: imResponse.data.nextReqMessageID, // 用于续拉，分页续拉时需传入该字段。
              isCompleted: imResponse.data.isCompleted, // 表示是否已经拉完所有消息。
              userID, // 点击进去的用户id。
              conversationID,
            };
            setMessageBelow();
            setMessageRead(conversationID);
          });
      };

      // 删除会话
      const deleteChat = (e, id, name) => {
        // 停止冒泡，避免和点击会话的事件冲突
        e.stopPropagation();

        tim
          .deleteConversation(id)
          .then(() => {
            // @ts-ignore
            chatList.value = chatList.value.filter((item) => item.conversationID !== id);
            chatDetail.value = null;
            message.success(`会话【${name}】删除成功!`);
            // currentConversation
          })
          .catch((error) => {
            message.error(`会话【${name}】删除失败!, error=${error.message}`);
          });
      };

      // const pushCurrentMessageList = (newData) => {
      //   if (chatDetail.value.messageList) {
      //     if (Array.isArray(newData)) {
      //       const result = newData.filter(
      //         (item) => item.ID === state.currentConversation.conversationID,
      //       );
      //     }
      //   }
      // };

      // 发送消息
      const sendMessage = () => {
        if (messageText.value.split(' ').join('').length == 0) return;

        const message = tim.createTextMessage({
          // @ts-ignore
          to: (chatDetail.value && chatDetail.value.userID) || currentUserId.value,
          conversationType: TIM.TYPES.CONV_C2C,
          payload: {
            text: messageText.value,
          },
        });

        tim
          .sendMessage(message)
          .then(function (imResponse) {
            // 发送成功
            messageText.value = '';
            // @ts-ignore
            if (chatDetail.value.messageList) {
              // @ts-ignore
              chatDetail.value.messageList.push(imResponse.data.message);
            } else {
              // @ts-ignore
              chatDetail.value.messageList = [imResponse.data.message];
            }
            // chatDetail.value ? chatDetail.value.messageList.push(imResponse.data.message);
            setMessageBelow();
          })
          .catch(function (imError) {
            // 发送失败
            console.warn('sendMessage error:', imError);
          });
      };

      // 消息查看更多
      const seeMore = () => {
        // @ts-ignore
        const { nextReqMessageID, messageList = [] } = chatDetail.value || {};

        tim
          .getMessageList({
            conversationID: (messageList[0] && messageList[0].conversationID) || activeId.value,
            nextReqMessageID,
            count: 15,
          })
          .then(function (imResponse) {
            // @ts-ignore
            chatDetail.value.messageList = [...imResponse.data.messageList, ...messageList];
            // @ts-ignore
            chatDetail.value.nextReqMessageID = imResponse.data.nextReqMessageID; // 分页
            // @ts-ignore
            chatDetail.value.isCompleted = imResponse.data.isCompleted; // 是否已经拉完
          });
      };

      const logData = () => {
        // 监听事件
        tim.on(TIM.EVENT.SDK_READY, function (event) {
          // 收到离线消息和会话列表同步完毕通知，接入侧可以调用 sendMessage 等需要鉴权的接口
          console.log('SDK_READY ===================', event);
          getChatList();
        });

        tim.on(TIM.EVENT.ERROR, function (event) {
          // 收到离线消息和会话列表同步完毕通知，接入侧可以调用 sendMessage 等需要鉴权的接口
          console.error('ERROR ===================', event);
        });

        tim.on(TIM.EVENT.KICKED_OUT, function (event) {
          // 收到离线消息和会话列表同步完毕通知，接入侧可以调用 sendMessage 等需要鉴权的接口
          console.error('KICKED_OUT ===================', event);
        });

        tim.on(TIM.EVENT.NET_STATE_CHANGE, function (event) {
          // 收到离线消息和会话列表同步完毕通知，接入侧可以调用 sendMessage 等需要鉴权的接口
          console.error('NET_STATE_CHANGE ===================', event);
        });

        console.log('TIM.EVENT.MESSAGE_RECEIVED', TIM.EVENT.MESSAGE_RECEIVED);
        tim.on(TIM.EVENT.MESSAGE_RECEIVED, function (event) {
          // 收到推送的单聊、群聊、群提示、群系统通知的新消息，可通过遍历 event.data 获取消息列表数据并渲染到页面
          console.log('MESSAGE_RECEIVED ===================', event);
          getChatList();
          if (chatDetail.value) {
            // @ts-ignore
            if (event.data[0].from == chatDetail.value.userID) {
              setMessageRead(event.data[0].conversationID);
              // @ts-ignore
              chatDetail.value.messageList.push(event.data[0]);
              setMessageBelow();
            }
          }
        });

        tim
          .login({
            userID: userInfo.value.userId,
            userSig: userSig.value,
          })
          .then(function (imResponse) {
            console.log('login success ======================');
            //获取会话列表
            if (imResponse.data.repeatLogin === true) {
              // 标识账号已登录，本次登录操作为重复登录。v2.5.1 起支持
              console.log(imResponse.data.errorInfo);
            }
          })
          .catch(function (imError) {
            console.warn('login error:', imError); // 登录失败的相关信息
          });
      };

      // 回车发送文本 阻止浏览器默认换行操作
      const messageSendlisten = (e) => {
        if (e.keyCode === 13) {
          sendMessage(); // 发送文本
          e.preventDefault(); // 阻止浏览器默认换行操作
          return false;
        }
      };

      const handleSendImageClick = () => {
        imagePicker.value.click();
      };

      const sendImage = () => {
        const ImageMessage = tim.createImageMessage({
          // @ts-ignore
          to: (chatDetail.value && chatDetail.value.userID) || currentUserId.value,
          conversationType: TIM.TYPES.CONV_C2C,
          payload: {
            file: document.getElementById('imagePicker'), // 或者用event.target
          },
          onProgress: function (event) {
            console.log('file uploading:', event);
          },
        });

        tim
          .sendMessage(ImageMessage)
          .then((imResponse) => {
            chatDetail.value.messageList = [
              ...chatDetail.value.messageList,
              imResponse.data.message,
            ];
            setMessageBelow();
          })
          .catch((imError) => {
            console.error(imError.message);
          });
      };

      onMounted(async () => {
        try {
          const res = await getUserSigApi({ userId: userInfo.value.userId });
          userSig.value = res || '';
          logData();
        } catch (error) {
          throw error;
        }
      });

      onUnmounted(() => {
        tim
          .logout()
          .then((imResponse) => {
            console.log('退出登陆成功imResponse===', imResponse);
          })
          .catch(function (imError) {
            console.warn('logout error:', imError);
          });
      });

      const formatDate = (value) =>
        value ? moment(value * 1000).format('YYYY-MM-DD HH:mm:ss') : '';

      const onShowModal = () => {
        visible.value = true;
      };

      const handleOk = () => {
        if (searchId.value) {
          // 切换会话前，将切换前的会话进行已读上报
          if (activeId.value) {
            setMessageRead(activeId.value);
          }
          // 获取会话信息
          tim
            .getConversationProfile(`C2C${searchId.value}`) // C2C${userID}（单聊）
            .then(({ data }) => {
              const conversation = (data && data.conversation) || {};

              // 获取消息列表
              getChatList();
              // 更新当前会话
              currentUserId.value = conversation.userProfile.userID;
              currentAvatar.value = conversation.userProfile.avatar;
              activeId.value = conversation.conversationID;
              currentChatName.value =
                conversation.userProfile.nick || conversation.userProfile.userID;
              chatDetail.value = conversation;
              setMessageBelow();
              setMessageRead(data.conversation.conversationID);
              searchId.value = '';
              visible.value = false;
            })
            .catch(() => {
              searchId.value = '';
              message.warning('没有找到该用户');
            });
        } else {
          message.warning('没有找到该用户');
        }
      };

      return {
        focus,
        chatList,
        formatDate,
        getChatDetail,
        messageRef,
        currentChatName,
        activeId,
        chatDetail,
        currentAvatar,
        currentUserId,
        messageText,
        messageSendlisten,
        seeMore,
        getChatList,
        deleteChat,
        visible,
        onShowModal,
        searchId,
        handleOk,
        imagePicker,
        handleSendImageClick,
        sendImage,
      };
    },
  });
</script>

<style lang="less">
  .user-list {
    flex: 1;
    margin: 20px;

    .user-list-col2 {
      background-color: #f5f5f5;
    }

    .text-ellipsis {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .user-avatar {
      width: 40px;
      height: 40px;
      margin-right: 10px;
      border-radius: 50%;
      flex-shrink: 0;
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

      .conversation-active {
        background-color: #404953;
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
      overflow: hidden;

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

      .right-main {
        flex: 1;
        position: relative;
        z-index: 1;
      }

      .content {
        position: absolute;
        left: 0;
        top: 0;
        z-index: -1;
        width: 100%;
        height: 100%;
        padding: 0 20px;
        overflow-y: auto;
      }

      .more {
        display: flex;
        justify-content: center;
        font-size: 12px;
        padding: 10px;
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

      .image-element {
        max-height: 300px;
      }

      .message-left {
        display: flex;
        justify-content: flex-start;
        margin: 10px 0;
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
        margin: 10px 0;

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

        // .btn-send {
        //   cursor: pointer;
        //   position: absolute;
        //   color: #2d8cf0;
        //   font-size: 30px;
        //   right: 0;
        //   bottom: -5px;
        //   padding: 6px 6px 4px 4px;
        //   border-radius: 50%;
        // }
      }
    }
  }
</style>
