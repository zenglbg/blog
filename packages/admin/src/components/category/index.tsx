import * as React from "react";
import { useState, useMemo, useCallback } from "react";
import { Row, Col, Card, Form, Input, Button, Popconfirm, message } from "antd";
import cls from "classnames";
import styled from "styled-components";



const Wrapper = styled.div`
  .categoryRow {
    justify-content: space-between;
  }

  .btns {
    button + button {
      margin-left: 16px;
    }

    &.isEdit {
      display: flex;
      justify-content: space-between;
    }
  }

  ul.list {
    background-color: #fff;
  }

  li.item {
    border: 1px solid #666;
    padding: 2px 8px;
    color: #333;
    line-height: 1.5em;
    display: inline-block;
    margin: 0 7px 7px 0;
    border-radius: 2px;
    transition: all ease-in-out 0.3s;
    cursor: pointer;

    &:hover {
      background-color: $primaryColor;
      color: #fff;
      border: 1px solid $primaryColor;
    }

    &.active {
      color: $primaryColor;
      border: 1px solid $primaryColor;
      background-color: $primaryColor;
    }
  }
`;

import { CategoryApi } from "@lib/api";

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
    CategoryApi.addCategory({ label, value }).subscribe(() => {
      message.success(`添加分类成功`);
      reset();
      getData();
    });
  };

  const del = () => {
    CategoryApi.delCategory(current.id).subscribe(() => {
      message.success(`删除分类成功`);
      reset();
      getData();
    });
  };

  const update = () => {
    if (!label) {
      return;
    }
    CategoryApi.updateCategory(current.id, { label, value }).subscribe(() => {
      message.success(`更新分类成功`);
      reset();
      getData();
    });
  };

  const getData = useCallback(() => {
    CategoryApi.getCategorys().subscribe((res) => {
      if (res.success) {
        setData(res.data);
      }
    });
  }, []);

  return (
    <Wrapper>
      <Row className="categoryRow">
        <Col xs={24} sm={24} md={8}>
          <Card title="添加分类">
            <Form>
              <Form.Item>
                <Input
                  value={label}
                  onChange={(e) => setLabel(e.target.value)}
                  placeholder="请输入分类名称"
                />
              </Form.Item>
              <Form.Item>
                <Input
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder="请输入分类值"
                />
              </Form.Item>
              <div className={cls("btns", isCreateMode ? false : "isEdit")}>
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
                    <Popconfirm title="确认删除这个分类？">
                      <Button onClick={del}>删除</Button>
                    </Popconfirm>
                  </>
                )}
              </div>
            </Form>
          </Card>
        </Col>
        <Col xs={24} sm={24} md={15}>
          <Card title="所有分类" bordered={true}>
            <ul className="list">
              {data.map((d) => (
                <li
                  key={d.id}
                  onClick={() => {
                    setMode("edit");
                    setCurrent(d);
                    setLabel(d.label);
                    setValue(d.value);
                  }}
                  className="item"
                >
                  <a key={d.id} className="tag">
                    <span>{d.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </Card>
        </Col>
      </Row>
    </Wrapper>
  );
};

export default Category;
