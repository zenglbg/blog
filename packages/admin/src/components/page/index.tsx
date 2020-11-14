import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { PageHeader, Button, Input, Drawer, message } from "antd";
import { useSetting } from "@lib/hooks";
import MDEditor from "@/common/editor";
import styled from "styled-components";
import { RouteComponentProps } from "react-router";
import { PageApi } from "@/lib/api/page";
import { FileImageFilled } from "@ant-design/icons";

const Wrapper = styled.div`
  background-color: #f4f5f5;
  padding-top: 66.5px;
  min-height: 100vh;

  header {
    position: fixed;
    top: 0;
    z-index: 1000;
    width: 100%;
    background-color: #fff;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);

    input {
      border-top: 0;
      border-right: 0;
      border-left: 0;
      border-radius: 0 !important;
      padding-left: 0;
      padding-right: 0;
      box-shadow: none !important;
    }
  }

  .content {
    overflow: hidden;
    > article {
      padding: 24px;

      > div {
        padding: 16px 24px;
        box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.06);
        background-color: #fff;
      }
    }
  }
`;

const Btns = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

interface IPageProps {}

const Page: React.FunctionComponent<IPageProps & RouteComponentProps> = ({
  match,
}) => {
  const setting = useSetting();
  const [id, setId] = useState(null);
  const [page, setPage] = useState<any>({});
  const [pageDrawerVisible, setPageDrawerVisible] = useState(false);

  const updateOrCreate = (msg) => {
    if (id) {
      return PageApi.updatePage(id, page).subscribe((res) => {
        console.log(res);
        if (res.success) {
          setId(res.data.id);
          message.success(msg);
        }
      });
    } else {
      return PageApi.createPage(page).subscribe((res) => {
        console.log(res);
        if (res.success) {
          setId(res.data.id);
          message.success(msg);
        }
      });
    }
  };

  const save = () => {
    const auths = {
      name: "请输入页面名称",
      content: "请输入页面内容",
      path: "请输入页面路径",
    };

    const isPublish = Object.keys(auths).some((key) => {
      if (!page[key]) {
        message.warn(auths[key]);
        return !page[key];
      }
    });

    if (isPublish) {
      return;
    }

    page.status = "draft";

    updateOrCreate("页面已保存");
  };

  const publish = () => {
    const auths = {
      name: "请输入页面名称",
      content: "请输入页面内容",
      path: "请输入页面路径",
    };

    const isPublish = Object.keys(auths).some((key) => {
      if (!page[key]) {
        message.warn(auths[key]);
        return !page[key];
      }
    });

    if (isPublish) {
      return;
    }

    page.status = "publish";

    updateOrCreate("页面已发布");
  };

  return (
    <Wrapper>
      <Helmet>
        <title>新建页面</title>
      </Helmet>

      <header>
        <PageHeader
          onBack={() => window.close()}
          title={
            <Input
              defaultValue={page.title}
              placeholder="请输入文章标题！"
              onChange={(e) => {
                const value = e.target.value;
                setPage((page: any) => {
                  page.name = value;
                  return page;
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
            <Button
              key="4"
              type="primary"
              onClick={() => {
                if (!page.name) {
                  message.warn("请输入页面名称");
                  return;
                }
                setPageDrawerVisible(true);
              }}
            >
              发布
            </Button>,
          ]}
        />
      </header>
      <div className="content">
        <article>
          <MDEditor
            value={page.content}
            onChange={(value) => {
              setPage((page) => {
                page.content = value;
                return page;
              });
            }}
          />
        </article>
      </div>

      <Drawer
        title="页面属性"
        width={480}
        onClose={() => setPageDrawerVisible(false)}
        visible={pageDrawerVisible}
      >
        <Input
          placeholder="请输入页面封面"
          addonAfter={
            <FileImageFilled
              onClick={() => {
                // setFileDrawerVisible(true);
              }}
            />
          }
          defaultValue={page.cover}
          onChange={(e) => {
            const value = e.target.value;
            setPage((page) => {
              page.cover = value;
              return page;
            });
          }}
        />

        <Input
          placeholder="请输入页面路径"
          style={{ marginTop: 16 }}
          defaultValue={page.path}
          onChange={(e) => {
            const value = e.target.value;
            setPage((page) => {
              page.path = value;
              return page;
            });
          }}
        />

        <Btns>
          <Button onClick={save}>保存草稿</Button>
          <Button type="primary" onClick={publish}>
            发布
          </Button>
        </Btns>
      </Drawer>
    </Wrapper>
  );
};

export default Page;
