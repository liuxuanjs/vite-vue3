import type { RouteRecordRaw, RouteMeta } from 'vue-router';
import { defineComponent } from 'vue';

export type Component<T = any> =
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

export interface Menu {
  path: string;
  name?: string;
  icon?: string;
  authority?: string;
  children?: Menu[];
}

export type RouteMap = Map<string, boolean>;
