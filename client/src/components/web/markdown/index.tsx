import "./index.less";
import React, { useState, useRef, useEffect } from "react";

export interface IAppProps {}
import Editor from "../../common/editor";
import Preview from "../../common/preview";

export default function() {
  const [markdown, setMarkdown] = useState("// markdown");
  const handlechange = (val: string) => {
    if (!val) {
      val = "// markdown";
    }
    setMarkdown(val);
    sessionStorage.setItem("markdown", val);
  };

  useEffect(() => {
    const data = sessionStorage.getItem("markdown");
    setMarkdown(data);
  }, [markdown]);
  return (
    <div className="articleEdit">
      <div className="main">
        <div className="editor-wrapper">
          {markdown ? (
            <Editor markdown={markdown} setMarkdown={handlechange} />
          ) : null}
        </div>

        <div id="preview" className="preview">
          {markdown ? <Preview markdown={markdown} /> : null}
        </div>
      </div>
    </div>
  );
}
