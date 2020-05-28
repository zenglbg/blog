import React, { memo } from "react";
import { useRouter } from "next/router";
import cls from "classnames";
import style from "./style.scss";

interface Props {
  setting: any;
  className: string;
}

export default memo(function Footer({ setting, className = "" }: Props) {
  return (
    <footer className={cls(style.footer)}>
      <div className={cls(style.wrapper, style.isFixed)}>
        <h1>footer</h1>
      </div>
    </footer>
  );
});
