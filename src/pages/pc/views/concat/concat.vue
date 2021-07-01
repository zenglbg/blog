<template>
 <h1>222</h1>
</template>

<script>
import { useSubmit } from "@/hooks/submit";
import { useI18n } from "vue-i18n";

export default {
  setup() {
    const submit = useSubmit();
    const { t } = useI18n();

    return { ...submit, t };
  },
};
</script>
<style lang="scss" scoped>
.concat-wrapper {
  background: url("../../assets/img/home/bg3.png") no-repeat center / 100% 100%;
  height: 723px;
  overflow: hidden;
}
.form-title {
  height: 32px;
  font-size: 29px;
  font-weight: bold;
  color: #ffffff;
  text-align: center;
  margin-top: 77px;
  text-transform: uppercase;
}

.concat-links {
  @include flex();
  justify-content: center;
  margin-top: 49px;
  .concat-link {
    border-radius: 50%;
    @include size(78px);
    background: #fff no-repeat center;
    &-1 {
      background-image: url("../../assets/img/concat/002-message.png");
      background-size: 31px 21px;

      &:hover {
        background-image: url("../../assets/img/concat/002-message(1).png"),
          linear-gradient(129deg, #258dd7, #0dbcff);
        background-size: 31px 21px, cover;
      }
    }
    &-2 {
      background-image: url("../../assets/img/concat/003-telegram.png");
      margin: 0 69px;
      background-size: 31px 27px;

      &:hover {
        background-image: url("../../assets/img/concat/003-telegram(1).png"),
          linear-gradient(129deg, #258dd7, #0dbcff);
        background-size: 31px 27px, cover;
      }
    }
    &-3 {
      background-image: url("../../assets/img/concat/001-phone-call.png");
      background-size: 31px 31px;

      &:hover {
        background-image: url("../../assets/img/concat/001-phone-call(1).png"),
          linear-gradient(129deg, #258dd7, #0dbcff);
        background-size: 31px 31px, cover;
      }
    }
  }
}

.form-content {
  width: 948px;
  min-width: 948px;
  height: 373px;
  background: #ffffff;
  box-shadow: 0px 27px 21px 0px rgba(142, 211, 246, 0.19);
  border-radius: 40px;
  padding: 52px 46px 40px 45px;
  box-sizing: border-box;
  margin: 48px auto 77px;

  :deep(.el-form) {
    height: 201px;

    .el-col {
      height: 201px;
      @include flex-column();
      justify-content: space-between;

      &:last-child {
        align-items: flex-end;
      }

      .el-input__inner {
        width: 411px;
        height: 55px;
        background: #e6f8ff;
        border-radius: 28px;
        border: none;
        padding-left: 30px;
      }

      .el-textarea {
        width: 411px;
      }

      .el-textarea__inner {
        width: 411px;
        height: 201px;
        background: #e6f8ff;
        border-radius: 28px;
        border: none;
        box-sizing: border-box;
        padding: 24px 30px;
      }
    }
  }
  .form-button {
    text-align: center;
  }

  :deep(.el-button) {
    width: 411px;
    height: 55px;
    background: linear-gradient(129deg, #258dd7, #0dbcff);
    border-radius: 28px;
    margin-top: 30px;

    &:hover {
      background: linear-gradient(129deg, #09c1ff 0%, #1193f0 100%);
      box-shadow: 8px 0px 18px 0px rgba(11, 154, 255, 0.89);
    }

    font-size: 17px;
    font-weight: 500;
    color: #ffffff;
    text-transform: uppercase;
  }
}
</style>
