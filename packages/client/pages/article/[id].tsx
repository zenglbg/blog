import * as React from "react";
import { NextPage } from "next";
import { Helmet } from "react-helmet";

import { Modal, Form, Input } from "antd";
import { ArticleApi } from "@/services";

interface IArticleProps {
  article: IArticle;
}

const Article: NextPage<IArticleProps> = ({ article }) => {
  return (
    <div>
      <Modal visible={false} title="文章收保护，请输入访问密码">
        <Form.Item>
          <Input.Password placeholder="请输入密码" />
        </Form.Item>
      </Modal>

      <div>
        <Helmet>
          <title>{article.title}</title>
        </Helmet>

        <div
          dangerouslySetInnerHTML={{
            __html: article.content,
          }}
        ></div>
      </div>
    </div>
  );
};

Article.getInitialProps = async (ctx) => {
  const { id } = ctx.query;
  const article = await ArticleApi.getArticle(id);
  return { article };
};

export default Article;
