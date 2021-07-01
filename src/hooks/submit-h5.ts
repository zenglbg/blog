import { nextTick, reactive, ref, getCurrentInstance } from "vue";
import { Form, Toast } from "vant";
import { useI18n } from "vue-i18n";
import { throttle } from "@/lib/utils/util";
// import http from "@/lib/fetch/http";

type typeForm = {
  [name: string]: string;
};

type typeFormErr = {
  [name: string]: Array<string>;
};

function useSubmit() {
  const { t } = useI18n();
  const { proxy } = getCurrentInstance() as any;
  const form = reactive<typeForm>({
    name: "", //不可为空
    mail: "", //不可为空 邮箱格式 前端验证
    phone: "", //不可为空 前端验证
    content: "", //不可为空
  });
  const formRef = ref<InstanceType<typeof Form>>();

  const rules: {
    [name: string]: Array<{ required: boolean; message: string }>;
  } = {
    name: [
      {
        required: true,
        message: t("form.rules.name"),
      },
    ],

    mail: [
      {
        required: true,
        message: t("form.rules.mail"),
      },
    ],

    phone: [
      {
        required: true,
        message: t("form.rules.phone"),
      },
    ],

    content: [
      {
        required: true,
        message: t("form.rules.content"),
      },
    ],
  };
  const errMsg = reactive<typeFormErr>({
    name: [],
    mail: [],
    phone: [],
    content: [],
  });

  function isEmpty(value: string) {
    return value === "" || value === null || value === undefined;
  }

  function _handleSubmit() {
    nextTick(async () => {
      Object.keys(form).forEach((k) => {
        errMsg[k] = rules[k]
          .map((obj): string => {
            if (obj.required && isEmpty(form[k])) {
              return obj.message;
            }
            return "";
          })
          .filter((v): boolean => !!v);
      });

      if (
        Object.keys(errMsg).some((k: string) => {
          return errMsg[k].length === 0;
        })
      ) {
        const res = await proxy.$http.post("/pay/message/board", form);
        if (res.code === 200) {
          Toast.success("success");
        } else {
          Toast.fail(res.msg);
        }
      }
    });
  }
  const handleSubmit = throttle(_handleSubmit, 500);
  return { errMsg, rules, form, formRef, handleSubmit };
}

export { useSubmit };
