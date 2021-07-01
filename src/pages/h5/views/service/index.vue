<template>
   <h1>22</h1>
</template>
<script>
import { useI18n } from "vue-i18n";

export default {
  name: "service",
  setup() {
    const { tm } = useI18n();
    return {
      tm,
    };
  },
};
</script>
<style lang="scss" scoped>
@import "./service.css.scss";
</style>
