import { PageApi } from "@/lib/api";
import Helmet from "react-helmet";
import React, { useState, useEffect, useRef } from "react";
import hljs from "highlight.js";
import Viewer from "viewerjs";
import styled from "styled-components";

const Wrapper = styled.div`
  .container {
    position: relative;
    margin-top: 40px;
  }

  .coverWrapper {
    width: 100%;
    max-width: 768px;
    margin: 0 auto;
    padding-bottom: 1.5rem;

    img {
      display: inline-block;
      width: 100%;
      height: auto;
    }
  }

  .content {
    max-width: 800px;
    margin: 0 auto;
    padding: 0 8px 21px;

    > div {
      padding-top: 0.5rem;
    }
  }

  @media (max-width: 768px) {
    .content {
      padding-left: 0;
      padding-right: 0;
    }
  }
`;
interface IPageProps {
  page: IPage;
}

const Page: React.FunctionComponent<IPageProps> = (props) => {
  const { setting = {}, page } = props as any;

  const ref = useRef(null);

  useEffect(() => {
    PageApi.updatePageViews(page.id);
  }, []);

  useEffect(() => {
    if (ref.current) {
      hljs.initHighlightingOnLoad();
      setTimeout(() => {
        const blocks = ref.current.querySelectorAll("pre code");
        blocks.forEach((block) => hljs.highlightBlock(block));
      }, 0);
    }
  }, [page.id]);

  // 大图插件
  useEffect(() => {
    new Viewer(ref.current, { inline: false });
  }, []);

  return (
    <Wrapper>
      {!page ? (
        <div className="container">
          <p>页面不存在</p>
        </div>
      ) : (
        <div className="container">
          <Helmet>
            <title>{page.name + " | " + setting.systemTitle}</title>
          </Helmet>
          <div className="container">
            {page.cover && (
              <div className="coverWrapper">
                <img src={page.cover} alt="文章封面" />
              </div>
            )}
            <div className="content">
              <div
                ref={ref}
                className={"markdown"}
                dangerouslySetInnerHTML={{ __html: page.content }}
              ></div>
            </div>
          </div>
          {/* <CommentAndRecommendArticles pageId={page.id} isCommentable={true} /> */}
        </div>
      )}
    </Wrapper>
  );
};

export default Page;
