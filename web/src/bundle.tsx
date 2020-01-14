import { createServer } from "http";
import * as fs from "fs";
import * as path from 'path'
import * as process from "process";
import * as React from "react";
import * as Koa from "koa";
import { StaticRouter, Route } from "react-router-dom";
/* tslint:disable-next-line no-submodule-imports */
import { renderToString } from "react-dom/server";

const Home = () => <div>home</div>
const User = () => <div>user</div>



export default {
  serverRender: (req: { path: string }) => {
    const template = fs.readFileSync(
      path.join(__dirname + "./../public/index.html"),
      // path.join(__dirname + "./../build/index.html"),
      "utf-8"
    );
    // const vendorCss = fs.readFileSync(
    //   process.cwd() + "/bundle/style.css",
    //   "utf8"
    // );

    const content = renderToString(
      <StaticRouter location={req.path} context={{}}>
        <Route path="/" component={Home} />
        <Route path="/user" component={User} />
      </StaticRouter>
    );

    // const cssStr = context.css.length ? context.css.join('\n') : '';

    // console.log(333, vendorCss, 1);
    return content;
    return template.replace(/id=['"]{1}root['"]{1}\>/, `id="root">${content}`);
    // return template.replace("<!--app-->", content);
    // .replace('server-render-css', cssStr + vendorCss)
    // .replace('/*initial-state*/', initialState);
  }
};

// export default {
//   render() {
//     return renderToString(
//       <StaticRouter>
//         <App />
//       </StaticRouter>
//     );
//   }
// };
