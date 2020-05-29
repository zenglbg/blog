import React, {
  ReactElement,
  useState,
  useRef,
  ChangeEvent,
  useEffect
} from "react";
import CodeMirror from "react-codemirror";
import "./index.less";

interface Props {
  setMarkdown: Function;
  markdown: string;
}

export default function editor({ markdown, setMarkdown }: Props): ReactElement {
  const options = {
    lineNumbers: true
  };
  console.log(markdown, 33333);

  return (
    <div className="editor">
      <CodeMirror
        value={markdown}
        onChange={val => setMarkdown(val)}
        options={options}
      />
    </div>
  );
}
