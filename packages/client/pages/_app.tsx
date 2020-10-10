import type { AppProps, AppContext } from "next/app";
import App from "next/app";
import Layout from "@components/layout";

import "@/theme/antd.less";
import "@/theme/reset.scss";
import "@/theme/markdown.scss";

import {
  ArticleProvider,
  TagProvider,
  CategoryProvider,
} from "@providers/index";

function MyApp({
  Component,
  pageProps,
  tags,
  categories,
}: AppProps & { [key: string]: any }) {
  const { needLayoutFooter = true } = pageProps;

  return (
    <Layout needFooter={needLayoutFooter}>
      <Component {...pageProps} tags={tags} categories={categories} />
    </Layout>
  );
}

MyApp.getInitialProps = async (AppContext: AppContext) => {
  const [appProps, tags, categories] = await Promise.all([
    App.getInitialProps(AppContext),
    // SettingProvider.getSetting(),
    TagProvider.getTags({ articleStatus: "publish" }),
    CategoryProvider.getCategory({ articleStatus: "publish" }),
    // PageProvider.getAllPublisedPages(),
  ]);
  return { ...appProps, tags, categories };
};

export default MyApp;
