// https://github.com/michael-ciniawsky/postcss-load-config

module.exports = {
  plugins: {
    "postcss-import": {},
    "postcss-url": {},
    // to edit target browsers: use "browserslist" field in package.json
    autoprefixer: {},
    "postcss-px-to-viewport": {
      viewportWidth: 750,
      unitPrecision: 5,
      propList: ["*", "!border*"],
      selectorBlackList: [
        "html",
        ".ig-",
        ".vux-",
        ".weui-",
        ".scroller-",
        ".dp-",
        ".mt-",
        ".mint-",
        // ".range"
        ".page-infinite-"
      ],
      replace: true,
      mediaQuery: false,
      minPixelValue: 0
    }
  }
};
