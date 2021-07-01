import { ref, computed } from "vue";
import { Swipe } from "vant";
import { useSubmit } from "@/hooks/submit-h5";
import { useI18n } from "vue-i18n";

function useSwipe() {
  const width = computed(() => {
    const clientWidth = document.body.clientWidth;
    const l = 331 / 750;
    return clientWidth * l;
  });

  const swipe = ref<typeof Swipe>();

  function swipe2(type: string) {
    switch (type) {
      case "prev":
        swipe.value && swipe.value?.prev();
        break;

      default:
        swipe.value && swipe.value?.next();
        break;
    }
  }
  return { swipe2, swipe, width };
}

export function setup() {
  const submit = useSubmit();
  const swipe = useSwipe();
  const { t, tm } = useI18n();

  return { ...swipe, ...submit, t, tm };
}
