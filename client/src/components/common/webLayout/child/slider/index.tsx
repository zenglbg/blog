import "./index.less";
import React, { useState } from "react";
import { Card, Tag, Divider } from "antd";
import avatar from "../../../../../assets/images/snorlax.png";
import { color } from "@utils";

export default function slider({ tag_list_all, article_list, ...props }) {
  function handleDetail(id) {
    /**
     * 前往文章详情页
     */
    props.history.push(`/web/detail/${id}`);
  }

  const list = article_list
    ? article_list.map(v => (
        <li key={v.id} onClick={() => handleDetail(v.id)}>
          {v.title}
        </li>
      ))
    : null;
  return (
    <div className="sider-contianer">
      <div className="admin-info">
        <header>
          <img src={avatar} alt="avatar" title="追梦者" />
        </header>
        <p className="admin-name">圈圈</p>
        <p className="admin-desc">
          如果你看到前面的阴影
          <br />
          别怕，那是因为你背后有阳光。
        </p>
      </div>
      <div className="recent-article">
        <Card>
          <Divider orientation="left">最近文章</Divider>
          <ul className="recent-list">{list}</ul>
        </Card>
      </div>
      <div className="tags-wrapper">
        <Card>
          <Divider orientation="left">标签</Divider>
          <div className="tags-content">
            {tag_list_all.map(item => (
              <Tag
                key={item.id}
                color={color[~~(Math.random() * color.length)]}
              >
                {item.name}
              </Tag>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
