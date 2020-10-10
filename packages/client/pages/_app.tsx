import type { AppProps, AppContext } from "next/app";

import Layout from "@components/layout";
import "@/theme/antd.less";
import "@/theme/reset.scss";
import "@/theme/markdown.scss";

import { ArticleProvider } from "@providers/index";

function MyApp({ Component, pageProps, ...props }: AppProps) {
  console.log(`1111`, pageProps, props)
  return (
    <div className="app">
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </div>
  );
}

MyApp.getInitialProps = async (AppContext: AppContext) => {
  const data = await ArticleProvider.getArticles({});
  return {data};
};

export default MyApp;
