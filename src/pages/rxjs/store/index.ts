import { createGlobalState, useStorage } from "@vueuse/core";
import { reactive } from "vue-demi";

export const useGlobalState = createGlobalState(() =>
  useStorage(
    "vue-use-locale-storage",
    reactive({
      name: "quan",
      age: 18,
      height: 177,
    })
  )
);
