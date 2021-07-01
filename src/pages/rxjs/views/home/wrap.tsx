import { defineComponent, getCurrentInstance } from "vue-demi";

export default defineComponent({
  setup(props, { slots }) {
    return () => (
      <div class="wrapper">
        <h1>111</h1>
        {slots.default && slots.default()}
      </div>
    );
  },
});
