import { getCurrentInstance } from "vue";
import { onMounted } from "vue-demi";
import Wrap from "./wrap";
export default {
  setup() {
    onMounted(() => {
      getqq();
    });
    function getqq() {
      const curr = getCurrentInstance();
      console.log("🚀 ~ file: index.tsx ~ line 9 ~ getqq ~ curr", curr?.proxy);
    }

    return () => (
      <Wrap>
        <h1>222</h1>
      </Wrap>
    );
  },
};
