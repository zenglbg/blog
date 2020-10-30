/* eslint-disable */
const withPlugins = require('next-compose-plugins')
const withCss = require('@zeit/next-css')
const withLess = require('@zeit/next-less')
const withSass = require('@zeit/next-sass')
const withImages = require('next-images')
const lessToJS = require('less-vars-to-js')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')
const FilterWarningsPlugin = require('webpack-filter-warnings-plugin')



const fs = require('fs')
const path = require('path')
const isProd = process.env.NODE_ENV === 'production'

// Where your antd-custom.less file lives
const themeVariables = lessToJS(
  fs.readFileSync(path.resolve(__dirname, './src/theme/antd.less'), 'utf8')
)



const nextConfig = {
  assetPrefix: isProd ? '/' : '/',
  async redirects() {
    return [
      // {
      //   source: '/',
      //   destination: '/home',
      //   permanent: true,
      // },
    ]
  },
  webpack: (config) => {
    config.resolve.plugins.push(new TsconfigPathsPlugin())
    config.plugins.push(
      new FilterWarningsPlugin({
        // ignore ANTD chunk styles [mini-css-extract-plugin] warning
        exclude: /mini-css-extract-plugin[^]*Conflicting order between:/,
      })
    )
    return config
  },

}

module.exports = withPlugins([
  withImages(),
  withCss(),
  withSass({
    cssModules: true,
    ...withLess({
      lessLoaderOptions: {
        javascriptEnabled: true,
        modifyVars: themeVariables, // make your antd custom effective
        importLoaders: 0
      },
      cssLoaderOptions: {
        importLoaders: 3,
        localIdentName: '[local]___[hash:base64:5]'
      },
      webpack: (config, { isServer }) => {
        //Make Ant styles work with less
        if (isServer) {
          const antStyles = /antd\/.*?\/style.*?/
          const origExternals = [...config.externals]
          config.externals = [
            (context, request, callback) => {
              if (request.match(antStyles)) return callback()
              if (typeof origExternals[0] === 'function') {
                origExternals[0](context, request, callback)
              } else {
                callback()
              }
            },
            ...(typeof origExternals[0] === 'function' ? [] : origExternals)
          ]

          config.module.rules.unshift({
            test: antStyles,
            use: 'null-loader'
          })
        }

      
        return config
      }
    })
  }),
],nextConfig)