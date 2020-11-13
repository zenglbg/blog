import style from "./index.module.scss";

import * as React from "react";
import { useState, useCallback } from "react";
import { PageHeader, Input, Button, message } from "antd";
import { connect, DispatchProp } from "react-redux";

import MDEditor from "../../common/editor";
import ArticleSetting from "./index-publish";

import { IState } from "@lib/redux/reducer/index";
import { Articlesr } from "src/lib/api/article";
import { ActionArticle } from "@lib/redux/actions/index";

interface IArticleProps {}

const Article: React.FunctionComponent<
  IArticleProps & Pick<IState, "article"> & DispatchProp
> = ({ article, dispatch }) => {
  const [id, setId] = useState(article.onId);
  const [settingDrawerVisible, setSettingDrawerVisible] = useState(false);
  const [data, setData] = useState<any>(
    article.articles.find((item) => item.id === article.onId) || {}
  );

  const save = useCallback(() => {
    if (!data.title) {
      message.warn("文章标题不能为空！");
      return;
    }
    if (!data.content) {
      message.warn("文章内容不能为空！");
      return;
    }

    data.status = "draft";

    if (Array.isArray(data.tags)) {
      try {
        data.tags = data.tags.map((t) => t.id).join(",");
      } catch (error) {
        console.log(error);
      }
    }
    if (id) {
      return Articlesr.updateArticle(id, data).subscribe((res) => {
        if (res.success) {
          setId(res.data.id);
          message.success("文章已保存为草稿");
          dispatch(ActionArticle.getArticles(article.params));
        }
      });
    } else {
      return Articlesr.addArticle(article).subscribe((res) => {
        // setId(res.id);
        if (res.success) {
          setId(res.data.id);
          message.success("文章已保存为草稿");
          dispatch(ActionArticle.getArticles(article.params));
        }
      });
    }
  }, [data, id]);

  const publish = useCallback(() => {
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

    if (!canPublish) {
      return;
    }

    setSettingDrawerVisible(true);
  }, [data, id]);

  const saveOrPublish = (patch) => {
    const _article = Object.assign({}, data, patch);

    const handle = (res) => {
      if (res.success) {
        setId(res.data.id);
        message.success(
          res.data.status === "draft" ? "文章已保存为草稿" : "文章已发布"
        );
      }
    };

    if (id) {
      Articlesr.updateArticle(id, _article).subscribe(handle);
      dispatch(ActionArticle.getArticles(article.params));
    } else {
      Articlesr.addArticle(_article).subscribe(handle);
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
