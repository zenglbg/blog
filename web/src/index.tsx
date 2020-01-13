import * as React from "react";
import { render } from "react-dom";
import Login from "./components/admin/login";
import "antd/dist/antd.less";

render(<Login />, document.getElementById("root") as HTMLElement);
