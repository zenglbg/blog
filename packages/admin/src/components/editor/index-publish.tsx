import * as React from "react";
import { useState, useEffect } from "react";
import { Button, Drawer, Form, Input, Select, Switch, Tag } from "antd";

import style from "./index-publish.module.scss";

import { Categorysr } from "@providers/category";
import { Tagssr } from "@providers/tags";

interface IPublishProps {
  visible: boolean;
  article?: IArticle;
  onClose: () => void;
  onChange?: (arg: any) => void;
}

const FormItem = ({ label, content, ...data }) => {
  return (
    <div className={style.formItem} {...data}>
      <span>{label}</span>
      <div>{content}</div>
    </div>
  );
};

const Publish: React.FunctionComponent<IPublishProps> = ({
  article = {},
  visible,
  onClose,
  onChange,
}) => {
  const [fileVisible, setFileVisible] = useState(false);
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

  const send = (status: string) => () => {
    onChange({
      summary,
      password,
      isCommentable,
      category: selectedCategory,
      tags: selectedTags.join(","),
      cover,
      status,
    });
  };

  return (
    <Drawer
      title="文章设置"
      placement="right"
      width={480}
      onClose={onClose}
      visible={visible}
      className={style.drawer}
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
            mode="tags"
            value={selectedTags}
            onChange={(value) => setSelectedTags(value)}
            style={{ width: "100%" }}
          >
            {tags.map((tag) => (
              <Select.Option key={tag.id} value={tag.id}>
                {tag.label}
              </Select.Option>
            ))}
          </Select>
        }
      />
      <FormItem
        style={{
          paddingBottom: 50,
        }}
        label="文章封面"
        content={
          <div className={style.cover}>
            <div onClick={() => setFileVisible(true)} className={style.preview}>
              <img src={cover} alt="预览图" />
            </div>

            <Input
              placeholder="或输入外部链接"
              value={cover}
              onChange={(e) => setCover(e.target.value)}
            />

            <Button onClick={(_) => setCover(null)}>移除</Button>
          </div>
        }
      />

      <div className={style.btns}>
        <Button
          style={{
            marginRight: 8,
          }}
          onClick={send("draft")}
        >
          保存草稿
        </Button>
        <Button type="primary" onClick={send("publish")}>
          发布
        </Button>
      </div>
    </Drawer>
  );
};

export default Publish;
