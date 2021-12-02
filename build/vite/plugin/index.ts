import type { Plugin } from 'vite';

import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import vueSetupExtend from 'vite-plugin-vue-setup-extend';
import legacy from '@vitejs/plugin-legacy';

import { configHtmlPlugin } from './html';
import { configSvgIconsPlugin } from './svgSprite';
import { configMockPlugin } from './mock';
import { configStyleImportPlugin } from './styleImport';
import { configVisualizerConfig } from './visualizer';
import { configImageminPlugin } from './imagemin';

export function createVitePlugins(viteEnv: ViteEnv, isBuild: boolean) {
  const { VITE_USE_IMAGEMIN, VITE_USE_MOCK, VITE_LEGACY } = viteEnv;

  const vitePlugins: (Plugin | Plugin[])[] = [vue(), vueJsx(), vueSetupExtend()];

  VITE_LEGACY && isBuild && vitePlugins.push(legacy());

  vitePlugins.push(configHtmlPlugin(viteEnv, isBuild));

  vitePlugins.push(configSvgIconsPlugin(isBuild));

  VITE_USE_MOCK && vitePlugins.push(configMockPlugin(isBuild));

  vitePlugins.push(configStyleImportPlugin(isBuild));

  vitePlugins.push(configVisualizerConfig());

  if (isBuild) {
    VITE_USE_IMAGEMIN && vitePlugins.push(configImageminPlugin());
  }

  return vitePlugins;
}
