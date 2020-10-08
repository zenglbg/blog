import * as React from "react";
import { useState, useEffect } from "react";
import { Drawer, Form, Input, Select, Switch, Tag } from "antd";

import style from "./publish.module.scss";

import { Categorysr } from "@providers/category";
import { Tagssr } from "@providers/tags";

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

  useEffect(() => {
    console.log(`只执行一次`);
    Categorysr.getCategorys().subscribe((res) => {
      if (res.success) {
        console.log(res.data);
        setCategorys(res.data);
      }
    });
    Tagssr.getTags().subscribe((res) => {
      if (res.success) {
        setTags(res.data);
      }
    });
  }, []);

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
            {categorys.map((category) => (
              <Select.Option key={category.id} value={category.value}>
                {category.label}
              </Select.Option>
            ))}
          </Select>
        }
      />
      <FormItem
        label="选择标签"
        content={
          <Select
            value={selectedTags}
            onChange={(value) => setSelectedTags(value)}
            style={{ width: "100%" }}
          >
            {tags.map((tag) => (
              <Select.Option key={tag.id} value={tag.value}>
                {tag.label}
              </Select.Option>
            ))}
          </Select>
        }
      />
    </Drawer>
  );
};

export default Publish;
