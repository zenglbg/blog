<template>
  <h1>22</h1>
</template>

<script>
import { useSubmit } from "@/hooks/submit-h5";
import { useI18n } from "vue-i18n";
export default {
  name: "concat",
  setup() {
    const submit = useSubmit();
    const { t } = useI18n();
    return { ...submit, t };
  },
};
</script>

<style lang="scss" scoped>
.concat-wrapper {
  width: 100%;
  height: auto;
  background: #258dd7 url("../../assets/common/bg1.png") no-repeat left 390px /
    100% auto;
  text-align: center;
  padding: 52px 0 105px;

  .concat-title {
    height: 141px;
    font-weight: bold;
    color: #ffffff;
    line-height: 85px;

    p {
      text-align: center;
      font-size: 60px;
      text-transform: uppercase;
    }
  }

  .concat-links {
    @include flex();
    padding: 0 89px;
    margin-top: 50px;
    justify-content: space-between;
    .concat-link {
      @include size(139px);
      border-radius: 50%;
      &-1 {
        background: #fff url("../../assets/concat/002-message@2x.png") no-repeat
          center / 55.2px 37.4px;
      }
      &-2 {
        background: #fff url("../../assets/concat/003-telegram@2x.png")
          no-repeat center / 55.2px 48px;
      }
      &-3 {
        background: #fff url("../../assets/concat/001-phone-call@2x.png")
          no-repeat center / 55.2px 55.2px;
      }
    }
  }

  :deep(.van-form) {
    width: 646px;
    height: 950px;
    background: #ffffff;
    box-shadow: 0px 27px 21px 0px rgba(142, 211, 246, 0.19);
    margin: 60px auto 0;
    border-radius: 40px;
    box-sizing: border-box;
    overflow: hidden;
    padding: 40px 30px;

    .van-field {
      width: 585px;
      height: 95px;
      background: #e6f8ff;
      border-radius: 47px;
      overflow: visible;
      padding-left: 44px;

      .van-field__control,
      .van-field__control::placeholder {
        font-size: 26px;
        font-weight: 400;
        color: #595959;
        text-transform: capitalize;
      }
      &:nth-child(n + 2) {
        margin-top: 30px;
      }

      &.field-textarea {
        width: 585px;
        height: 353px;
      }

      &.textarea {
        width: 585px;
        height: 353px;
        background: #e6f8ff;
        border-radius: 55px;

        textarea {
          height: 310px;
        }
      }

      .van-field__error-message {
        transform: translateY(12px);
      }
    }
  }

  .form-btn {
    text-align: center;
    margin-top: 33px;

    :deep(.van-button) {
      width: 589px;
      height: 105px;
      background: linear-gradient(129deg, #258dd7, #0dbcff);
      border-radius: 53px;

      font-size: 35px;
      text-transform: uppercase;
      font-weight: 500;
      color: #ffffff;
    }
  }
}
</style>
