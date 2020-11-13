import * as React from "react";
import { useState, useMemo, useCallback } from "react";
import { Row, Col, Card, Form, Input, Button, Popconfirm, message } from "antd";
import cls from "classnames";

import style from "./index.module.scss";
import { Tagssr } from "src/lib/api/index";

interface ICategoryProps {}

const Category: React.FunctionComponent<ICategoryProps> = (props) => {
  const [data, setData] = useState([]);
  const [mode, setMode] = useState("create");
  const [label, setLabel] = useState(null);
  const [value, setValue] = useState(null);
  const [current, setCurrent] = useState(null);
  const isCreateMode = useMemo(() => mode === "create", [mode]);

  const reset = useCallback(() => {
    setMode("create");
    setLabel(null);
    setValue(null);
    setCurrent(null);
  }, []);

  const addCategory = () => {
    if (!label) {
      return;
    }
    Tagssr.addTag({ label, value }).subscribe(() => {
      message.success(`添加标签成功`);
      reset();
      getData();
    });
  };

  const del = () => {
    Tagssr.delTag(current.id).subscribe(() => {
      message.success(`删除标签成功`);
      reset();
      getData();
    });
  };

  const update = () => {
    if (!label) {
      return;
    }
    Tagssr.updateTag(current.id, { label, value }).subscribe(() => {
      message.success(`更新标签成功`);
      reset();
      getData();
    });
  };

  const getData = useCallback(() => {
    Tagssr.getTags().subscribe((res) => {
      if (res.success) {
        setData(res.data);
      }
    });
  }, []);

  return (
    <div className={style.categoryWrapper}>
      <Row className={style.categoryRow}>
        <Col xs={24} sm={24} md={8}>
          <Card title="添加标签">
            <Form>
              <Form.Item>
                <Input
                  value={label}
                  onChange={(e) => setLabel(e.target.value)}
                  placeholder="请输入标签名称"
                />
              </Form.Item>
              <Form.Item>
                <Input
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder="请输入标签值"
                />
              </Form.Item>
              <div
                className={cls(style.btns, isCreateMode ? false : style.isEdit)}
              >
                {isCreateMode ? (
                  <Button type="primary" onClick={addCategory}>
                    保存
                  </Button>
                ) : (
                  <>
                    <Button.Group>
                      <Button onClick={update}>更新</Button>
                      <Button onClick={reset}>返回添加</Button>
                    </Button.Group>
                    <Popconfirm title="确认删除这个标签？">
                      <Button onClick={del}>删除</Button>
                    </Popconfirm>
                  </>
                )}
              </div>
            </Form>
          </Card>
        </Col>
        <Col xs={24} sm={24} md={15}>
          <Card title="所有标签" bordered={true}>
            <ul className={style.list}>
              {data.map((d) => (
                <li
                  key={d.id}
                  onClick={() => {
                    setMode("edit");
                    setCurrent(d);
                    setLabel(d.label);
                    setValue(d.value);
                  }}
                  className={cls(style.item)}
                >
                  <a key={d.id} className={style.tag}>
                    <span>{d.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Category;
