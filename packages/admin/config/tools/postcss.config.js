module.exports = {
  // parser: 'sugarss',
  plugins: [
    require('postcss-import'),
    require('autoprefixer')({
      browsers: ['last 2 versions', '> 2%']
    }),
    require('postcss-pxtorem')({
      rootValue: 75,
      unitPrecision: 5,
      propList: ['*', '!border*'],
      selectorBlackList: [
        '.ig-',
        '.vux-',
        '.weui-',
        '.scroller-',
        '.dp-',
        '.mt-',
        '.mint-',
        // ".range"
        '.page-infinite-'
      ],
      replace: true,
      mediaQuery: false,
      minPixelValue: 0
    }),
    require('css-mqpacker'),
    require('precss'),
    require('cssnano')
  ]
};
