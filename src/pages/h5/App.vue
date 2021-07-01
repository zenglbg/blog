<template>
  <div class="wrapper">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>
<style lang="scss">
@import "./theme/var.scss";
</style>
<style lang="scss" scoped>
$bg-color: #ecfafe;

.wrapper {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  background: $bg-color;
  overflow-y: scroll;
}
</style>
