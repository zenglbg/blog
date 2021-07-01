import { defineComponent } from "vue";
import { useGlobalState } from "./store";

export default defineComponent({
  setup() {
    const a = useGlobalState();
    console.log("🚀 ~ file: app.tsx ~ line 7 ~ setup ~ a", a);
    setTimeout(() => {
      console.log(`我执行了`);
      a.value.name == "111";
    }, 2000);
    return () => (
      <div class="app">
        <h1>{a.value.name}</h1>
        <router-view></router-view>
      </div>
    );
  },
});
