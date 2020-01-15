const fs = require('fs')
const util = require('util')
const withPlugins = require("next-compose-plugins");
const withLess = require("@zeit/next-less");
 
const nextConfig = {
  distDir: "build",
  webpack: (config, options) => {
    // modify the `config` here
    
    
    return config;
  }
};

module.exports = withPlugins(
  [
    //https://www.npmjs.com/package/next-compose-plugins
    withLess({
      
    })
  ],
  nextConfig
);
