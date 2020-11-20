import "./index.less";
import React, { ReactElement, useState, useEffect } from "react";
import Showdown from "showdown";

Showdown.setOption("tables", true);
Showdown.setOption("tasklists", true);
Showdown.setFlavor("github");

// markdown to html转换器
const converter = new Showdown.Converter();

interface Props {
  markdown?: string;
}

export default function preview({ markdown = "" }: Props): ReactElement {
  useEffect(() => {
    const $el = document.getElementById("content");
    if ($el) {
      $el.innerHTML = converter.makeHtml(markdown);
    }
  });

  return (
    <div className="preview">
      <article id="content" className="content"></article>
    </div>
  );
}
