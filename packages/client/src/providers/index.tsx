export * from "./artile";
export * from './dom'
import {
  ComponentType as Component,
  ComponentClass,
} from "react";

 

interface ComponentEnhancer<TInner, TOutter> {
  (component: Component<TInner>): ComponentClass<TOutter>;
}

export const compose = <TInner, TOutter>(
  ...funcs: Function[]
): ComponentEnhancer<TInner, TOutter> =>
  funcs.reduce(
    (a, b) => (...args) => a(b(...args)),
    (arg) => arg
  ) as ComponentEnhancer<TInner, TOutter>;


// export const compose = (...fns) => (BaseComponent) =>
//   fns.reduce((Component, fn) => {
//     return fn(Component);
//   }, BaseComponent);
