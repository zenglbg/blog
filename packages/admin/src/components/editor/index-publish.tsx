import * as React from "react";
import { useState, useEffect } from "react";
import { Drawer, Form, Input, Select, Switch } from "antd";

import style from "./publish.module.scss";

interface IPublishProps {
  visible: boolean;
  article?: IArticle;
  onClose: () => void;
  onChange?: (arg: any) => void;
}

const FormItem = ({ label, content }) => {
  return (
    <div className={style.formItem}>
      <span>{label}</span>
      <div>{content}</div>
    </div>
  );
};

const Publish: React.FunctionComponent<IPublishProps> = ({
  article = {},
  visible,
  onClose,
}) => {
  const [summary, setSummary] = useState(article.summary || null);
  const [categorys, setCategorys] = useState<Array<ICategory>>([]);
  const [tags, setTags] = useState<Array<ITag>>([]);
  const [password, setPassword] = useState(article.password || null);
  const [isCommentable, setIsCommentable] = useState(
    article.isCommentable || true
  );
  const [selectedCategory, setSelectedCategory] = useState(
    (article.category && article.category.id) || null
  );
  const [selectedTags, setSelectedTags] = useState(
    (Array.isArray(article.tags) && article.tags.map((tag) => tag.id)) || []
  );
  const [cover, setCover] = useState(article.cover || null);
  useEffect(() => {
    console.log(password);
    return () => {
      // cleanup
    };
  }, [password]);

  return (
    <Drawer
      title="文章设置"
      placement="right"
      width={480}
      onClose={onClose}
      visible={visible}
    >
      <FormItem
        label="文章摘要"
        content={
          <Input.TextArea
            placeholder="请输入文章摘要！"
            autoSize={{ minRows: 6, maxRows: 8 }}
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
          />
        }
      />
      <FormItem
        label="访问密码"
        content={
          <Input.Password
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="输入后查看需要密码"
          />
        }
      />
      <FormItem
        label="开启评论"
        content={<Switch checked={isCommentable} onChange={setIsCommentable} />}
      />
      <FormItem
        label="选择分类"
        content={
          <Select
            value={selectedCategory}
            onChange={setSelectedCategory}
            style={{ width: "100%" }}
          >
            <Select.Option value="323">dad</Select.Option>
          </Select>
        }
      />
    </Drawer>
  );
};

export default Publish;
