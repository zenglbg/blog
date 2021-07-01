import { useSubmit } from "@/hooks/submit";
import { chunk } from "@/lib/utils/util";
import { ref } from "vue";
import { useI18n } from "vue-i18n";

function useSwipe() {
  const _banks = [
    require("../../assets/img/bank/bank-icon-acb.png"),

    require("../../assets/img/bank/bank-icon-mb.png"),

    require("../../assets/img/bank/bank-icon-tcb.png"),

    require("../../assets/img/bank/bank-icon-vp.png"),

    require("../../assets/img/bank/bank-icon-bidv.png"),

    require("../../assets/img/bank/bank-icon-sac.png"),

    require("../../assets/img/bank/bank-icon-tp.png"),

    require("../../assets/img/bank/bank-icon-vt.png"),

    require("../../assets/img/bank/bank-icon-donga.png"),

    require("../../assets/img/bank/bank-icon-scb.png"),

    require("../../assets/img/bank/bank-icon-vcb.png"),

    require("../../assets/img/bank/bank-icon-exb.png"),

    require("../../assets/img/bank/bank-icon-tb.png"),

    require("../../assets/img/bank/bank-icon-viet.png"),
  ];
  const carousel = ref(null);
  const banks = chunk(_banks, 5);
  return { banks, carousel };
}

export function setup() {
  const submit = useSubmit();
  const swipe = useSwipe();
  const { t, tm } = useI18n();

  return { ...submit, swipe, t, tm };
}
