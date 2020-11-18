import "../styles/globals.less";
import '../styles/markdown.less'
import App, { AppProps, AppContext } from "next/app";
import { SettingApi, CategoryApi, TagApi, PageApi } from "@lib/api";
import Layout from "@common/layout";

const MyApp = ({
  Component,
  pageProps,
  setting,
  pages,
  tags,
  categories,
}: AppProps & {
  [key: string]: any;
}) => {
  const { needLayoutFooter = true } = pageProps;

  return (
    <Layout setting={setting} pages={pages} needLayoutFooter={needLayoutFooter}>
      <Component
        {...pageProps}
        setting={setting}
        tags={tags}
        categories={categories}
        pages={pages}
      />
    </Layout>
  );
};

MyApp.getInitialProps = async function (appContext: AppContext) {
  const [appProps, setting, categories, tags, pages] = await Promise.all([
    App.getInitialProps(appContext),
    SettingApi.getSetting(),
    CategoryApi.getCategory({ articleStatus: "publish" }),
    TagApi.getTags({ articleStatus: "publish" }),
    PageApi.getPages({ status: "publish" }),
  ]);
  return {
    ...appProps,
    setting,
    categories,
    tags,
    pages,
  };
};

export default MyApp;
