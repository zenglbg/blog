import * as React from "react";
import { useState, useCallback } from "react";
import { PageHeader, Input, Button, message } from "antd";
import { connect, DispatchProp } from "react-redux";

import MDEditor from "../../common/editor";
import ArticleSetting from "./index-publish";

import { IState } from "@reducer";
import { ArticleApi } from "@api";
import { ActionArticle } from "@actions";

interface IArticleProps {}

const Article: React.FunctionComponent<
  IArticleProps & Pick<IState, "article"> & DispatchProp
> = ({ article, dispatch }) => {
  const [id, setId] = useState(article.onId);
  const [settingDrawerVisible, setSettingDrawerVisible] = useState(false);
  const [data, setData] = useState<any>(
    (article.articles &&
      article.articles.find((item) => item.id === article.onId)) ||
      {}
  );

  const checkAuth = () => {
    let canPublish = true;
    void [
      ["title", "请输入文章标题"],
      ["content", "请输入文章内容"],
    ].forEach(([key, msg]) => {
      if (!data[key]) {
        message.warn(msg);
        canPublish = false;
      }
    });
    return canPublish;
  };

  const save = useCallback(() => {
    if (checkAuth()) {
      data.status = "draft";

      if (Array.isArray(data.tags)) {
        try {
          data.tags = data.tags.map((t: ITag) => t.id).join(",");
        } catch (error) {
          console.log(error);
        }
      }
      if (id) {
        return ArticleApi.updateArticle(id, data).then((data) => {
          setId(data.id);
          message.success("文章已保存为草稿");
          dispatch(ActionArticle.getArticles(article.params));
        });
      } else {
        return ArticleApi.addArticle(data).then((data) => {
          setId(data.id);
          message.success("文章已保存为草稿");
          dispatch(ActionArticle.getArticles(article.params));
        });
      }
    }
  }, [data, id]);

  const publish = useCallback(() => {
    if (checkAuth()) {
      setSettingDrawerVisible(true);
    }
  }, [data, id]);

  const saveOrPublish = (patch: any) => {
    const _article = Object.assign({}, data, patch);

    const handle = (res: IArticle) => {
      setId(res.id);
      message.success(
        res.status === "draft" ? "文章已保存为草稿" : "文章已发布"
      );
    };

    if (id) {
      ArticleApi.updateArticle(id, _article).then(handle);
      dispatch(ActionArticle.getArticles(article.params));
    } else {
      ArticleApi.addArticle(_article).then(handle);
      dispatch(ActionArticle.getArticles(article.params));
    }
  };
  return (
    <div className="editor-wrapper">
      <header>
        <PageHeader
          title={
            <Input
              defaultValue={data.title}
              placeholder="请输入文章标题！"
              onChange={(e) => {
                const value = e.target.value;
                setData((data: any) => {
                  data.title = value;
                  return data;
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
              value={data.content}
              onChange={(value) =>
                setData((data: any) => {
                  data.content = value;
                  return data;
                })
              }
            />
          </div>
        </article>
      </div>

      <ArticleSetting
        article={data}
        visible={settingDrawerVisible}
        onClose={() => setSettingDrawerVisible(false)}
        onChange={saveOrPublish}
      />
    </div>
  );
};

export default connect(({ article }: IState) => ({ article }))(Article);
