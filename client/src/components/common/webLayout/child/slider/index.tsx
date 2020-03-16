import "./index.less";
import React, { useState } from "react";
import { Layout, Row, Col, Menu, Icon, Card, Tag, Divider } from "antd";
import avatar from "../../../../../assets/images/snorlax.png";

export default function slider(props) {
  return (
    <div className="sider-contianer">
      <div className="admin-info">
        <header>
          <img src={avatar} alt="avatar" title="我叫路飞，要成为海贼王的男人" />
        </header>
        <p className="admin-name">牧羊人</p>
        <p className="admin-desc">
          不爱骑行，不爱跳舞
          <br />
          前端摸鱼人员，全村最靓的仔
        </p>
      </div>
      <div className="recent-article">
        <Card>
          <Divider orientation="left">最近文章</Divider>
          <ul className="recent-list"></ul>
        </Card>
      </div>
      <div className="tags-wrapper">
        <Card>
          <Divider orientation="left">标签</Divider>
          <div className="tags-content"></div>
        </Card>
      </div>
    </div>
  );
}
