import { ref, computed, watch } from "vue";
import { useI18n } from "vue-i18n";

export function useLocale() {
  const { locale, availableLocales } = useI18n();
  const value = ref("vi");
  const title = computed(() => languageComputing(value.value).slice(0, 3));

  const option = computed(() =>
    availableLocales.map((l) => ({
      text: languageComputing(l),
      value: l,
    }))
  );

  const languageComputing = (row: string): string => {
    switch (row) {
      case "vi":
        return "Vietnamese";
      case "en":
        return "English";
      default:
        return "";
    }
  };

  const handleLocale = (val: string) => {
    value.value = val;
  };

  watch(value, (n) => {
    locale.value = n;
  });
  return { value, option, title, handleLocale };
}
