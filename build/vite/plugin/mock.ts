/**
 * 本地及开发环境数据 mock
 * https://github.com/anncwb/vite-plugin-mock
 */

import { viteMockServe } from 'vite-plugin-mock';

export function configMockPlugin(isBuild: boolean) {
  return viteMockServe({
    ignore: /^\_/,
    mockPath: 'mock',
    localEnabled: !isBuild,
    prodEnabled: isBuild,
    injectCode: `
       import { setupProdMockServer } from '../mock/_createProductionServer';
 
       setupProdMockServer();
       `,
  });
}
