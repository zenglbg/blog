import React, { useState, useEffect, useRef, createRef } from 'react';
import { PageHeader, Layout, Input, Button, Spin } from 'antd';
import { useSelector } from 'umi';
import { ConnectState } from '@/models/connect';
import Editor from '@/components/Editor';
import styles from './index.less';

interface IArticleProps {}
const menu = [
  <Button key="btn1">文件库</Button>,
  <Button key="btn2">保存草稿</Button>,
  <Button key="btn3">发布</Button>,
];
// let ToastuiEditor: any;
const Article: React.FunctionComponent<IArticleProps> = (props) => {
  const article = useSelector<ConnectState, Pick<ConnectState, 'article'>>(
    (state) => state.article,
  );

  const getData = (html: string | undefined, md: string | undefined) => {
    console.log(html, md);
  };
  return (
    <Editor
      titleText={<Input />}
      titleExtra={menu}
      initvalue={article.article && article.article.content}
      getData={getData}
    />
  );
};

export default Article;
