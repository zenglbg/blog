const withPlugins = require('next-compose-plugins');

const withTypescript = require('@zeit/next-typescript');
const withSass = require('@zeit/next-sass')
// module.exports = withSass({
//   /* config options here */
// })
// module.exports = withTypescript({
//   webpack(config, options) {
//     return config;
//   }
// });
// module.exports = withTypescript(withSass({//可用的
//   webpack(config, options) {
//     // Further custom configuration here
//     return config
//   }
// }))


module.exports = withPlugins([
    //https://www.npmjs.com/package/next-compose-plugins
    [withTypescript],
    [withSass],
]);