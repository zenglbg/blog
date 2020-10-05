import React, {
  ReactElement,
  useState,
  useRef,
  ChangeEvent,
  useEffect,
} from "react";
import "./index.less";
import "codemirror/lib/codemirror.css";
import "@toast-ui/editor/dist/toastui-editor.css";
import { EditorProps } from "@toast-ui/react-editor";

import { Spin } from "antd";
let ToastEditor;

interface Props {
  value: string;
  onChange: (arg: any) => void;
}

export default function Editor({ value, onChange }: Props): ReactElement {
  const ref = useRef(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (!mounted) {
      return;
    }
    ref.current.getInstance().setHtml(value);
  }, [mounted, value]);

  useEffect(() => {
    Promise.all([import("@toast-ui/react-editor")]).then((res) => {
      ToastEditor = res[0].Editor;
      setMounted(true);
    });

    return () => {
      setMounted(false);
    };
  }, []);

  return (
    <>
      {mounted ? (
        <ToastEditor
          ref={ref}
          language="zh"
          previewStyle="vertical"
          initialEditType="markdown"
          useCommandShortcut={true}
          placeholder="请输入文章内容"
          height="550px"
          onChange={() => {
            const html = ref.current.getInstance().getHtml();
            onChange(html);
          }}
        />
      ) : (
        <Spin tip="编辑器努力加载中..." spinning={true} />
      )}
    </>
  );
}
