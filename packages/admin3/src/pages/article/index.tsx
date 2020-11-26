import * as React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
interface IArticleProps {}

const Article: React.FunctionComponent<IArticleProps> = (props) => {
  return <PageHeaderWrapper content="">{props.children}</PageHeaderWrapper>;
};

export default Article;
