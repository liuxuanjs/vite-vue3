<template>
  <a-layout class="basic-layout">
    <a-layout-sider :style="{ overflowY: 'auto', height: '100vh', position: 'fixed', left: 0 }">
      <div class="logo"></div>
      <a-menu theme="dark" mode="inline" v-model:selectedKeys="selectedKeys">
        <a-menu-item key="1">
          <user-outlined />
          <span class="nav-text">nav 1</span>
        </a-menu-item>
        <a-menu-item key="2">
          <video-camera-outlined />
          <span class="nav-text">nav 2</span>
        </a-menu-item>
        <a-sub-menu key="3">
          <template #title>
            <span>
              <UploadOutlined />
              <span>nav 3</span>
            </span>
          </template>
          <a-menu-item key="3-1">Tom</a-menu-item>
          <a-menu-item key="3-2">Bill</a-menu-item>
          <a-menu-item key="3-3">Alex</a-menu-item>
        </a-sub-menu>
        <a-menu-item key="4">
          <bar-chart-outlined />
          <span class="nav-text">nav 4</span>
        </a-menu-item>
        <a-menu-item key="5">
          <cloud-outlined />
          <span class="nav-text">nav 5</span>
        </a-menu-item>
        <a-menu-item key="6">
          <appstore-outlined />
          <span class="nav-text">nav 6</span>
        </a-menu-item>
        <a-menu-item key="7">
          <team-outlined />
          <span class="nav-text">nav 7</span>
        </a-menu-item>
        <a-menu-item key="8">
          <shop-outlined />
          <span class="nav-text">nav 8</span>
        </a-menu-item>
        <a-menu-item key="9">
          <shop-outlined />
          <span class="nav-text">nav 8</span>
        </a-menu-item>
        <a-menu-item key="10">
          <shop-outlined />
          <span class="nav-text">nav 8</span>
        </a-menu-item>
        <a-menu-item key="11">
          <shop-outlined />
          <span class="nav-text">nav 8</span>
        </a-menu-item>
        <a-menu-item key="12">
          <shop-outlined />
          <span class="nav-text">nav 8</span>
        </a-menu-item>
        <a-menu-item key="13">
          <shop-outlined />
          <span class="nav-text">nav 8</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout :style="{ marginLeft: '200px' }">
      <a-layout-header :style="{ background: '#fff', padding: 0 }" />
      <BasicContent />
      <BasicFooter />
    </a-layout>
  </a-layout>
</template>
<script lang="ts">
  import {
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
    BarChartOutlined,
    CloudOutlined,
    AppstoreOutlined,
    TeamOutlined,
    ShopOutlined,
  } from '@ant-design/icons-vue';
  import { Layout, Menu } from 'ant-design-vue';
  import { defineComponent, ref } from 'vue';

  import BasicContent from './content/index.vue';
  import BasicFooter from './footer/index.vue';

  export default defineComponent({
    components: {
      'a-layout': Layout,
      'a-layout-sider': Layout.Sider,
      'a-layout-header': Layout.Header,
      // 'a-layout-footer': Layout.Footer,
      'a-menu': Menu,
      'a-menu-item': Menu.Item,
      'a-sub-menu': Menu.SubMenu,
      BasicContent,
      BasicFooter,
      // 'my-sub-menu': MySubMenu,
      UserOutlined,
      VideoCameraOutlined,
      UploadOutlined,
      BarChartOutlined,
      CloudOutlined,
      AppstoreOutlined,
      TeamOutlined,
      ShopOutlined,
    },
    setup() {
      return {
        selectedKeys: ref<string[]>(['4']),
      };
    },
  });
</script>
<style lang="less">
  .basic-layout {
    height: 100%;
  }

  .logo {
    height: 32px;
    background: rgba(255, 255, 255, 0.2);
    margin: 16px;
  }

  .site-layout .site-layout-background {
    background: #fff;
  }

  [data-theme='dark'] .site-layout .site-layout-background {
    background: #141414;
  }
</style>
