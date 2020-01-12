const path = require("path");
const Koa = require("koa");
const webpack = require("webpack");
const koaWebpack = require("koa-webpack");
const app = new Koa();

class AngelConfig {
  constructor(options) {
    this.config = require(options.configUrl);
    this.webpackConfig = require(options.webpackUrl);
    this.compiler = webpack(this.webpackConfig);
    this.app = app;
    this.setServerConfig();
  }
  setServerConfig() {
    this.port = this.config.dev_server.port;
    this.host = this.config.dev_server.host;
    this.app.keys = this.config.keys ? this.config.keys : this.app.keys;
  }
}

class AngeServer extends AngelConfig {
  constructor(options) {
    super(options);
    this.startService();
  }

  async startService() {
    // const middleware = await koaWebpack({ compiler: this.compiler });
    const middleware = await koaWebpack({ config: this.webpackConfig });

    this.app.use(middleware);

    app.use(async ctx => {
      const filename = path.resolve(
        this.webpackConfig.output.path,
        "index.html"
      );
      ctx.response.type = "html";
      ctx.response.body = middleware.devMiddleware.fileSystem.createReadStream(
        filename
      );
    });

    this.app.listen(this.port, () => {
      console.log(`当前服务器已启动`, `http://${this.host}:${this.port}`);
    });
  }
}

var server = new AngeServer({
  configUrl: path.join(process.cwd(), "webpack/config.js"),
  webpackUrl: path.join(process.cwd(), "webpack/webpack.config.js")
});
