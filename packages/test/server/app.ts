import express from "express";
import next from "next";
import { parse } from "url";

const dev = process.env.NODE_ENV !== "production";

const app = next({ dev });

const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = express();


    // give all Nextjs's request to Nextjs before anything else
    server.get("/_next/*", (req, res) => {
      // console.log('next server, page');
      handle(req, res);
    });

    server.use(express.json());

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
