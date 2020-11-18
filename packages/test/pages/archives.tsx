import { NextPage, NextPageContext } from "next";
import ArchivesPage from "@components/archives";
import { ArticleApi } from "@lib/api";

interface IArchivesProps {
  archives: {
    [key: string]: { [key: string]: IArticle[] };
  };
}

const Archives: NextPage<IArchivesProps> = (props) => {
  return <ArchivesPage {...props} />;
};

Archives.getInitialProps = async function (ctx: NextPageContext) {
  const archives = await ArticleApi.getArchives();
  return { archives };
};
export default Archives;
