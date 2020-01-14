import "../styles.less";
import Head from "next/head";
import Link from "next/link";
import React from "react";
class User extends React.Component {
  static async getInitialProps({ req, ...data }) {
    const userAgent = req ? req.headers["user-agent"] : navigator.userAgent;
    console.log(data.pathname, "pathname");
    return { userAgent };
  }

  render() {
    return (
      <div className="example">
        <Head>
          <title>圈圈</title>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>
        Welcome to Next.js1!, i'm user page
        <Link href="/index">
          <a>index Page</a>
        </Link>
        <img src="../static/snorlax.png" alt="" />
      </div>
    );
  }
}

export default User;
