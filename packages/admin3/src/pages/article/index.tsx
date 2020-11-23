import * as React from 'react';
import { SmileTwoTone, HeartTwoTone } from '@ant-design/icons';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card, Alert, Typography } from 'antd';
interface IArticleProps {}

const Article: React.FunctionComponent<IArticleProps> = (props) => {
  return <PageHeaderWrapper content="">{props.children}</PageHeaderWrapper>;
};

export default Article;
