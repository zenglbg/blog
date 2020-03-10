import React from "react";
import Loadable1, { LoadableComponent } from "react-loadable";

//通用的过场组件
const loadingComponent = () => {
  return <div>loading</div>;
};

//过场组件默认采用通用的，若传入了loading，则采用传入的过场组件
export const Loadable = (loader: any, loading = loadingComponent) => {
  return Loadable1({
    loader,
    loading
  });
};
