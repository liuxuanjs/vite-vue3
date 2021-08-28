export {};

declare module 'vue-router' {
  interface RouteMeta extends Record<string | number | symbol, unknown> {
    // name
    name?: string;
    // menu
    menu?: boolean;
    // authority
    authority?: string;
    // icon
    icon?: string;
  }
}
