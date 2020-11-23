import React, { useState, useEffect, useRef } from 'react';
import { PageHeader, Layout, Input, Button, Spin } from 'antd';
import { Editor } from '@toast-ui/react-editor';
import 'codemirror/lib/codemirror.css';
import '@toast-ui/editor/dist/toastui-editor.css';
import styles from './index.less';

interface IEditorProps {
  titleText: React.ReactNode;
  titleExtra: React.ReactNode;
  initvalue: string;
  previewStyle?: 'tab' | 'vertical';
  useCommandShortcut?: boolean;
  getData: (html: string | undefined, md: string | undefined) => void;
}

const EditorComponent: React.FunctionComponent<IEditorProps> = ({
  titleText,
  titleExtra,
  initvalue,
  previewStyle = 'vertical',
  useCommandShortcut = true,
  getData,
}) => {
  const ref = useRef<Editor>(null);
  useEffect(() => {
    ref.current?.getInstance().addHook('change', (type) => {
      const md = ref.current?.getInstance().getMarkdown();
      const html = ref.current?.getInstance().getHtml();
      getData(html, md);
    });
  }, []);
  return (
    <Layout className={styles.main}>
      <Layout.Header className={styles.header}>
        <PageHeader title={titleText} extra={titleExtra} />
      </Layout.Header>

      <article className={styles.content}>
        <Editor
          ref={ref}
          language="zh"
          placeholder="请输入文章内容"
          initialValue={initvalue}
          previewStyle={previewStyle}
          useCommandShortcut={useCommandShortcut}
          initialEditType="markdown"
          height="550px"
        />
      </article>
    </Layout>
  );
};

export default EditorComponent;
