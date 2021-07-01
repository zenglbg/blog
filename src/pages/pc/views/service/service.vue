<template>
  <h1>222</h1>
</template>

<script>
export default {
};
</script>

<style lang="scss" scoped>
.img-wrapper {
  background: no-repeat center / 100% 100%;
}

.list-text {
  @include flex-column();
  justify-content: space-between;
  width: 515px;
  height: auto;
  background: #ffffff;
  box-shadow: -22px 15px 21px 0px rgba(142, 211, 246, 0.19);
  border-radius: 0px 0px 0px 40px;
  padding: 61px 50px 47px 0;

  .li-text {
    padding-left: 70px;
    text-align: left;
    background: url("../../assets/img/service/icon-check-right.png") no-repeat
      36px 8px / 16px 12px;

    &:nth-child(n + 2) {
      margin-top: 1em;
    }
  }
}

.box-content {
  height: 600px;
  @include flex();
  background: url("../../assets/img/service/bg1.png") no-repeat left / 100% auto;
}
.box-item {
  @include flex();
  justify-content: space-between;
}

.box-bank {
  background-position: left 106px;
  background-color: #fff;
  .img-wrapper {
    @include size(509px, 358px);
    background-image: url("../../assets/img/service/internet-banking.png");
  }
}

.box-momo {
  background-position: left -493px;
  .img-wrapper {
    @include size(560px, 606px);
    background-image: url("../../assets/img/service/momo.png");
  }
}

.box-zalo {
  background-position: left 400px;
  background-color: #fff;
  .img-wrapper {
    @include size(587px, 463.4px);
    background-image: url("../../assets/img/service/zalo-pay.png");
  }
}

.box-viettel {
  background-position: left -196px;

  .img-wrapper {
    @include size(533px, 601px);
    background-image: url("../../assets/img/service/vietel-pay.png");
  }
}

.box-cao {
  background-position: left -766px;
  background-color: #fff;
  .img-wrapper {
    @include size(469px, 317px);
    background-image: url("../../assets/img/service/mobile-card.png");
  }

  .list-wrapper {
    background: #ffffff;
    box-shadow: -22px 15px 21px 0px rgba(142, 211, 246, 0.19);
    border-radius: 0px 0px 0px 40px;
    margin: 0 auto;
    padding-bottom: 41px;

    .list-text {
      height: auto;
      box-shadow: none;
      padding-bottom: 0;
    }

    .list-ol-text {
      padding-left: 94px + 35px;
      font-size: 18px;
      // font-weight: 500;
      margin-top: 1.2em;
      color: #162539;

      .li-ol-text {
        position: relative;

        &:nth-child(n + 2) {
          margin-top: 1em;
        }

        &::before {
          content: "";
          display: block;
          background: url("../../assets/img/service/Ellipse3.png") no-repeat
            center / cover;
          @include size(9px);
          @include position-center-y();
          left: -35px;
        }
      }
    }
  }
}
</style>
