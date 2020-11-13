import React, { Component, useState, useEffect, useCallback } from "react";

import { connect } from "react-redux";
import { RouteComponentProps, Link } from "react-router-dom";
import { StarOutlined } from "@ant-design/icons";
import { Row, Col } from "antd";
import { IState } from "@lib/redux/reducer/index";
import { ActionUser } from "@lib/redux/actions/index";
import { Articlesr } from "src/lib/api/index";

import style from "./index.module.scss";

interface Props {
  user: any;
  profiles: Function;
}

const Home: React.FunctionComponent<Props & RouteComponentProps> = ({
  history,
  profiles,
}) => {
  const [collapsed, setCollapsed] = useState("");
  const [articles, setArticles] = useState([])
  useEffect(() => {
    profiles();
    getArticles()
  },[]);

  const getArticles = useCallback((params = {}) => {
    return Articlesr.getArticles(params).subscribe((res) => {
      if (res && res.success) {
        setArticles(res.data.data);
      }
      return res;
    });
  }, []);

  const handleClick = () => {
    history.push("/login");
  };
  return (
    <div className={style.recentArticle}>
      <div className={style.title}>
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
        {articles.slice(0, 4).map((article) => {
          return (
            <Col span={24 / 4} className={style.recentArticleItem}>
              <Link
                to={`/article/editor/[id]`}
                // as={`/article/editor/` + article.id}
              >
                <a target="_blank">
                  <img width={120} alt="文章封面" src={article.cover} />
                  <p className={style.title}>{article.title}</p>
                  <p className={style.desc}>{article.summary}</p>
                </a>
              </Link>
            </Col>
          );
        })}
      </Row>
    </div>
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
