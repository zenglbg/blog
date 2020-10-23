import * as React from "react";

const style = {
  bannerWrapper: {},
};

interface IBannerProps {}

const Banner: React.FunctionComponent<IBannerProps> = (props) => {
  return (
    <div style={style.bannerWrapper}>
      <img src="/images/home/banner2.jpg" alt="" />
      {/* <img src={require('./images/beijing-3675835_1920.jpg')} alt=""/> */}
    </div>
  );
};

export default Banner;
