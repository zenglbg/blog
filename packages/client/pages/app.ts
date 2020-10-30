import express from "express";
import next from "next";
import { parse } from "url";
import routes from "./routes";

const dev = process.env.NODE_ENV !== "production";

const app = next({ dev });

const handle = app.getRequestHandler();
// const handler = routes.getRequestHandler(app);

app
  .prepare()
  .then(() => {
    const server = express();

    // server.use(handler);

    server.get("*", (req, res) => {
      const parseUrl = parse(req.url, true);
      return handle(req, res, parseUrl);
    });

    server.listen(process.env.PORT, () => {
      console.log(`
      > Ready on http://localhost:${process.env.PORT}
    `);
    });
  })
  .catch((exception) => {
    console.error(exception.stack);
    process.exit(1);
  });
