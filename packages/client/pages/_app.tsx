import "viewerjs/dist/viewer.css";
import "highlight.js/styles/monokai-sublime.css";
import "@/theme/antd.less";
import "@/theme/reset.scss";
import "@/theme/markdown.scss";

import React from "react";
import App from "next/app";
import { SettingProvider } from "@/providers/setting";

import Layout from "@/layout/Layout";

class MyApp extends App {
  static getInitialProps = async (ctx) => {
    const [appProps, setting] = await Promise.all([
      App.getInitialProps(ctx),
      SettingProvider.getSetting(),
    ]);
    return { ...appProps, setting };
  };

  render() {
    const { Component, pageProps, setting = {}, pages = {} } = this
      .props as any;
    const { needLayoutFooter = true } = pageProps;

    return (
      <Layout setting={setting} pages={pages} needFooter={needLayoutFooter}>
        <div>
          <style
            id="holderStyle"
            dangerouslySetInnerHTML={{
              __html: ` * {
              transition: none !important;
            }`,
            }}
          ></style>
          <Component
            {...pageProps}
            setting={setting}
            // tags={tags}
            // categories={categories}
            pages={pages}
          />
        </div>
      </Layout>
    );
  }
}

export default MyApp;
