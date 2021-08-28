import type { RouteRecordRaw, RouteMeta } from 'vue-router';
// import { RoleEnum } from '/@/enums/roleEnum';
import { defineComponent } from 'vue';

export type Component<T extends any = any> =
  | ReturnType<typeof defineComponent>
  | (() => Promise<typeof import('*.vue')>)
  | (() => Promise<T>);

// @ts-ignore
export interface AppRouteRecordRaw extends Omit<RouteRecordRaw, 'meta'> {
  path: string;
  meta?: RouteMeta;
  redirect?: string;
  component?: Component;
  children?: AppRouteRecordRaw[];
  parent?: AppRouteRecordRaw | null;
}

// export interface MenuTag {
//   type?: 'primary' | 'error' | 'warn' | 'success';
//   content?: string;
//   dot?: boolean;
// }

export interface Menu {
  path: string;

  name?: string;

  icon?: string;

  authority?: string;

  children?: Menu[];
}

// export interface MenuModule {
//   orderNo?: number;
//   menu: Menu;
// }

// // export type AppRouteModule = RouteModule | AppRouteRecordRaw;
// export type AppRouteModule = AppRouteRecordRaw;
