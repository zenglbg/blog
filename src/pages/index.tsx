import Head from "next/head";
import Link from "next/link";
import getConfig from "next/config";
import React from "react";

import Router from "next/router";
const {
  publicRuntimeConfig: { staticFolder }
} = getConfig();

class Home extends React.Component {
  static async getInitialProps({ req, ...data }) {
    const userAgent = req ? req.headers["user-agent"] : navigator.userAgent;
    // console.log(data.pathname, data, "pathname");
    return { userAgent };
  }

  public render() {
    return (
      <div className="example">
        Welcome to Next.js1!
        <Link
          prefetch
          href={{ pathname: "/user", query: { name: "quan" } }}
          replace
        >
          <a>user Page</a>
        </Link>
        <Link href="/admin/home">
          <a>admin home Page</a>
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
        <img src={`${staticFolder}/snorlax.png`} alt="" />
      </div>
    );
  }
}

export default Home;
