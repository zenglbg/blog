import React, { useState } from 'react';
import { Input, Button, Drawer, message } from 'antd';
import { ArticleAction, useDispatch, useSelector } from 'umi';
import { ConnectState } from '@/models/connect';
import { debounce, throttle } from 'lodash';
import Editor from '@/components/Editor';

interface IArticleProps {}

const Article: React.FunctionComponent<IArticleProps> = (props) => {
  const dispatch = useDispatch();
  const [drawerVisible, setDrawerVisible] = useState(false);
  const _article = useSelector<ConnectState, Pick<ConnectState, 'article'>>(
    (state) => state.article,
  );
  const [article, setArticle] = useState<IArticle>(_article.article || {});

  const getData = debounce((html: string | undefined, md: string | undefined) => {
    setArticle((article: IArticle) => {
      article.content = html || '';
      article.contentMarkdown = md || '';
      console.log(article);
      return article;
    });
  }, 100);

  const checkAuth = () => {
    let canPublish = true;
    void [
      ['title', '请输入文章标题'],
      ['content', '请输入文章内容'],
    ].find(([key, msg]) => {
      if (!article[key]) {
        message.warn(msg);
        canPublish = false;
        return true;
      }
      return false;
    });
    return canPublish;
  };

  const pushArticle = debounce((status: 'draft' | 'publish') => {
    if (checkAuth()) {
      dispatch(ArticleAction.pushArticle({ ...article, status }));
    }
  }, 200);

  const menu = [
    <Button key="btn1" type="dashed">
      文件库
    </Button>,
    <Button key="btn2" onClick={() => pushArticle('draft')}>
      保存草稿
    </Button>,
    <Button key="btn3" onClick={() => setDrawerVisible(true)}>
      发布
    </Button>,
  ];

  return (
    <>
      <Editor
        titleText={
          <Input
            defaultValue={article && article.title}
            placeholder="请输入文章标题"
            onChange={(e) => {
              const title = e.target.value;
              setArticle((article) => {
                article.title = title;
                console.log(article);
                return article;
              });
            }}
          />
        }
        titleExtra={menu}
        initvalue={article && article.content}
        getData={getData}
      />

      <Drawer visible={drawerVisible} />
    </>
  );
};

export default Article;
