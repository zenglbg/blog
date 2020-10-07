import style from "./index.module.scss";

import * as React from "react";
import { useState, useCallback } from "react";
import { PageHeader, Input, Button, message } from "antd";
import { Articlesr } from "@providers/article";

import MDEditor from "../../common/editor";
import ArticleSetting from "./index-publish";

interface IArticleProps {}

const Article: React.FunctionComponent<IArticleProps> = (props) => {
  const [id, setId] = useState(null);
  const [settingDrawerVisible, setSettingDrawerVisible] = useState(false);
  const [article, setArticle] = useState<{
    title: string;
    content: string;
    status?: string;
    tags?: string;
  }>({
    title: "",
    content: "",
  });

  const save = useCallback(() => {
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
      return Articlesr.updateArticle(id, article).subscribe((res) => {
        if (res.success) {
          setId(res.data.id);
          message.success("文章已保存为草稿");
        }
      });
    } else {
      return Articlesr.addArticle(article).subscribe((res) => {
        // setId(res.id);
        if (res.success) {
          setId(res.data.id);
          message.success("文章已保存为草稿");
        }
      });
    }
  }, [article, id]);

  const publish = useCallback(() => {
    let canPublish = true;
    void [
      ["title", "请输入文章标题"],
      ["content", "请输入文章内容"],
    ].forEach(([key, msg]) => {
      if (!article[key]) {
        message.warn(msg);
        canPublish = false;
      }
    });

    if (!canPublish) {
      return;
    }

    setSettingDrawerVisible(true);
  }, [article, id]);

  const saveOrPublish = (patch) => {
    const data = Object.assign({}, article, patch);

    const handle = (res) => {
      setId(res.id);
      message.success(
        data.status === "draft" ? "文章已保存为草稿" : "文章已发布"
      );
    };

    if (id) {
      Articlesr.updateArticle(id, data).subscribe(handle);
    } else {
      Articlesr.addArticle(data).subscribe(handle);
    }
  };
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
            <Button key="4" type="primary" onClick={publish}>
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

      <ArticleSetting
        visible={settingDrawerVisible}
        onClose={() => setSettingDrawerVisible(false)}
        onChange={saveOrPublish}
      />
    </div>
  );
};

export default Article;
