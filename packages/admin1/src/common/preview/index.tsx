import React, { useState, useEffect, useRef } from "react";
import Showdown from "showdown";
import styled from "styled-components";
const Wrapper = styled.div`
  min-height: 600px;
  font-size: 14px;
  box-sizing: border-box;
  overflow: hidden;
  word-wrap: break-word;
  word-break: break-all;
  background-color: #fff;

  ul {
    list-style: inherit;
  }

  ol {
    list-style: inherit;
  }

  pre {
    overflow-x: auto;
    color: #333;
    font-family: Monaco, Consolas, Courier New, monospace;
    background: #f8f8f8;
  }

  img {
    max-width: 100%;
    margin: 10px 0;
  }

  table {
    max-width: 100%;
    overflow: auto;
    font-size: 14px;
    border: 1px solid #f6f6f6;
    border-collapse: collapse;
    border-spacing: 0;

    thead {
      color: #000;
      text-align: left;
      background: #f6f6f6;
    }
  }

  td,
  th {
    min-width: 80px;
    padding: 10px;
  }

  tbody tr:nth-of-type(odd) {
    background: #fcfcfc;
  }

  tbody tr:nth-of-type(even) {
    background: #f6f6f6;
  }
`;
Showdown.setOption("tables", true);
Showdown.setOption("tasklists", true);
Showdown.setFlavor("github");

// markdown to html转换器
const converter = new Showdown.Converter();

interface IAppProps {
  markdown: string;
}

const App: React.FunctionComponent<IAppProps> = ({ markdown }) => {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const $el = document.getElementById("content");
    if ($el) {
      $el.innerHTML = converter.makeHtml(markdown);
    }
  }, []);

  return (
    <Wrapper>
      <article ref={ref} className="content"></article>
    </Wrapper>
  );
};

export default App;
