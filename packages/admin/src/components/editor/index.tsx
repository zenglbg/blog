import "./index.less";

import * as React from "react";
import { useState, useCallback } from "react";
import { PageHeader, Input, Button, message } from "antd";
import MDEditor from "../../common/editor";
import { Articlesr } from "@providers/article";

interface IArticleProps {}

const Article: React.FunctionComponent<IArticleProps> = (props) => {
  const [id, setId] = useState(null);
  const [article, setArticle] = useState<{
    title: string;
    content: string;
    status?: string;
    tags?: string;
  }>({
    title: "",
    content: ""
  });

  const save = useCallback(() => {
    console.log(article);
    if (!article.title) {
      message.warn("文章标题不能为空！");
      return;
    }
    if (!article.content) {
      message.warn("文章内容不能为空！");
      return;
    }

    article.status = "draft";

    if (Array.isArray(article.tags)) {
      try {
        article.tags = article.tags.map((t) => t.id).join(",");
      } catch (error) {
        console.log(error);
      }
    }

    if (id) {
      
    } else {
      return Articlesr.addArtilce(article).subscribe((res) => {
        // setId(res.id);
        console.log(res);
        message.success("文章已保存为草稿");
      });
    }
  }, [article]);

  return (
    <div className="editor-wrapper">
      <header>
        <PageHeader
          title={
            <Input
              placeholder="请输入文章标题！"
              onChange={(e) => {
                const value = e.target.value;
                setArticle((artilce) => {
                  article.title = value;
                  return article;
                });
              }}
            />
          }
          extra={[
            <Button key="1" type="dashed">
              文件库
            </Button>,
            <Button key="2" onClick={save}>
              保存草稿
            </Button>,
            <Button key="3">预览</Button>,
            <Button key="4" type="primary">
              发布
            </Button>,
          ]}
        />
      </header>
      <div className="editor-content">
        <article>
          <div>
            <MDEditor
              value={article.content}
              onChange={(value) =>
                setArticle((article: any) => {
                  article.content = value;
                  return article;
                })
              }
            />
          </div>
        </article>
      </div>
    </div>
  );
};

export default Article;
