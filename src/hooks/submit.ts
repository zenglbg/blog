import { nextTick, reactive, ref, h, getCurrentInstance } from "vue";
import { ElMessage, ElForm } from "element-plus";
// import http from "@/lib/fetch/http";
import { useI18n } from "vue-i18n";
import { throttle } from "@/lib/utils/util";

export function useSubmit() {
  const { proxy } = getCurrentInstance() as any;
  const { t } = useI18n();

  const form = reactive({
    name: "", //不可为空
    mail: "", //不可为空 邮箱格式 前端验证
    phone: "", //不可为空 前端验证
    content: "", //不可为空
  });
  const formRef = ref<InstanceType<typeof ElForm>>();

  const rules = {
    name: {
      required: true,
      message: t("form.rules.name"),
    },

    mail: {
      required: true,
      message: t("form.rules.mail"),
    },

    phone: {
      required: true,
      message: t("form.rules.phone"),
    },

    content: {
      required: true,
      message: t("form.rules.content"),
    },
  };

  function _handleSubmit() {
    nextTick(() => {
      formRef.value?.validate(async (valid?: boolean) => {
        if (valid) {
          const res = await proxy.$http.post("/pay/message/board", form);
          if (res.code === 200) {
            ElMessage({
              message: h("p", null, [h("span", null, "success")]),
              type: "success",
            });
          } else {
            ElMessage({
              message: h("p", null, [h("span", null, res.msg)]),
              type: "error",
            });
          }
        }
      });
    });
  }
  const handleSubmit = throttle(_handleSubmit, 500);
  return { rules, form, formRef, handleSubmit };
}
