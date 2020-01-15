import "../styles.less";
import Head from "next/head";
import Link from "next/link";
import React from "react";

import Router from "next/router";

class Home extends React.Component {
  static async getInitialProps({ req, ...data }) {
    const userAgent = req ? req.headers["user-agent"] : navigator.userAgent;
    console.log(data.pathname, "pathname");
    return { userAgent };
  }

  public componentDidMount() {
  }

  public render() {
    return (
      <div className="example">
        <Head>
          <title>圈圈</title>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>
        Welcome to Next.js1!
        <Link prefetch href={{ pathname: "/user", query: { name: "quan" } }} replace>
          <a>user Page</a>
        </Link>
        <Link scroll={false} href="#">
          <a>#####</a>
        </Link>
        <div>
          Click{" "}
          <span
            onClick={() => {
              Router.push({ pathname: "/user", query: { name: "quan" } });
            }}
          >
            to user page
          </span>
        </div>
        <img src="../public/static/snorlax.png" alt="" />
      </div>
    );
  }
}

export default Home;
