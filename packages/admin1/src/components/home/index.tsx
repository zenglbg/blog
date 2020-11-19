import React, { Component, useState, useEffect, useCallback } from "react";

import { connect } from "react-redux";
import { RouteComponentProps, Link } from "react-router-dom";
import { StarOutlined } from "@ant-design/icons";
import { Row, Col } from "antd";
import { IState } from "@reducer";
import { ActionUser } from "@actions";
import { ArticleApi } from "@api";
import styled from "styled-components";



const Wrapper = styled.div`
  .title {
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    padding-bottom: 8px;
    color: $textSecondColor;

    i {
      font-size: 0.8em;
      margin-left: 4px;
    }
  }

  .recentArticleItem {
    > a {
      display: inline-block;
      width: 100%;
      border: 1px solid $borderColor;
      border-radius: 4px;

      img {
        display: inline-block;
        border-top-left-radius: 4px;
        border-top-right-radius: 4px;
        width: 100%;
        height: 120px;
      }

      .title {
        font-weight: 500;
        padding: 6px 12px;
      }

      .desc {
        padding: 0px 12px 6px;

        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
    }
  }

  .listItem {
    background: #fff;
    padding: 16px 12px;
  }

  .comments {
    width: 100%;

    .ant-list-item-meta {
      width: 100%;
      overflow: hidden;
    }
  }

  .articles {
    margin: 24px 0;
  }

  .action a {
    color: #1890ff;
  }
`;

interface Props {
  user: any;
  profiles: Function;
}

const Home: React.FunctionComponent<Props & RouteComponentProps> = ({
  history,
  profiles,
}) => {
  const [collapsed, setCollapsed] = useState("");
  const [articles, setArticles] = useState([]);
  useEffect(() => {
    profiles();
    getArticles();
  }, []);

  const getArticles = useCallback((params = {}) => {
    return ArticleApi.getArticles(params).then((data) => {
      setArticles(data.data);
      return data;
    });
  }, []);

  const handleClick = () => {
    history.push("/login");
  };

  return (
    <Wrapper className="recentArticle">
      <div className="title">
        <span>最新文章</span>
        <Link to="/home/article">
          <span>更多</span>
          <StarOutlined
            type="right"
            style={{
              marginLeft: "auto",
            }}
          />
        </Link>
      </div>
      <Row gutter={16}>
        {articles.slice(0, 4).map((article, index) => {
          return (
            <Col
              key={`article.${index}`}
              span={24 / 4}
              className="recentArticleItem"
            >
              <Link
                to={`/article/editor/[id]`}
                target="_blank"
                // as={`/article/editor/` + article.id}
              >
                <img width={120} alt="文章封面" src={article.cover} />
                <p className="title">{article.title}</p>
                <p className="desc">{article.summary}</p>
              </Link>
            </Col>
          );
        })}
      </Row>
    </Wrapper>
  );
};

export default connect(
  ({ user }: IState) => ({
    user,
  }),
  {
    profiles: ActionUser.profiles,
  }
)(Home);
