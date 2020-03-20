import "./index.less";

import React, { Component } from "react";
import { Card, Icon } from "antd";
import { EditorState, ContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import htmlToDraft from "html-to-draftjs";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

interface Props {}
interface State {}

export default class Detail extends Component<Props, State> {
  state = {
    editorState: EditorState.createEmpty()
  };

  render() {
    return (
      <div>
        <h1>detail</h1>
      </div>
    );
  }
}
