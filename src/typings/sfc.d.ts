// declare module "*.vue" {
//   import Vue from "vue";
//   export default Vue;
// }

/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

