import   React, {useState} from "react";
import * as dayjs from "dayjs"
import SPTDataTable from "../../common/SPTDataTable"
import { Table } from "antd";

interface IArticleProps {}

const Article: React.FunctionComponent<IArticleProps> = (props) => {
  const [articles, setArticles] = useState([]);

  return (
    <div className="article-page" >
      <div className="SPTDataTable-wrapper">

        <Table />
      </div>
    </div>
  );
};

export default Article;
