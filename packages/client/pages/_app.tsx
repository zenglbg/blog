import type { AppProps, AppContext } from "next/app";
import App from "next/app";
import Layout from "@components/common/layout";

import "@/theme/antd.less";
import "@/theme/reset.scss";
import "@/theme/markdown.scss";
import "@/theme/root.scss";
import {
  ArticleApi,
  TagApi,
  CategoryApi,
} from "@/services/index";

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
    TagApi.getTags({ articleStatus: "publish" }),
    CategoryApi.getCategory({ articleStatus: "publish" }),
    // PageProvider.getAllPublisedPages(),
  ]);
  return { ...appProps, tags, categories };
};

export default MyApp;
