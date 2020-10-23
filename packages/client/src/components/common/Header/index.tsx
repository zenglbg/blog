import React, { memo, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { scroll } from "@/providers";
import Search from "../Search";
import cls from "classnames";
import style from "./index.module.scss";

interface Props {
  setting: any;
  menus: any;
  affix: boolean;
  affixVisible: boolean;
}

function Header({ setting, menus, affix, affixVisible }: Props) {
  const router = useRouter();
  const asPath = router.asPath;
  const pathname = router.pathname;

  const [visible, setVisible] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  return (
    <header className={cls(style.header)}>
      <div className={cls(style.wrapper, false ? style.isFixed : false)}>
        <div className="container">
          <div className={cls(style.logo)}>
            {/^http/.test(setting.systemLogo) ? (
              <Link href="/">
                <a>
                  <img src={setting.systemLogo} alt="" />
                </a>
              </Link>
            ) : (
              <Link href="/">
                <a
                  dangerouslySetInnerHTML={{
                    __html: setting.systemLogo,
                  }}
                ></a>
              </Link>
            )}
          </div>

          <div
            className={cls(style.mobileTrigger, visible ? style.active : false)}
            onClick={() => setVisible(!visible)}
          >
            <div className={style.stick}></div>
            <div className={style.stick}></div>
            <div className={style.stick}></div>
          </div>

          <nav className={cls(visible ? style.active : false)}>
            <ul>
              {menus.map((menu) => (
                <li
                  key={menu.label}
                  className={cls({
                    [style.active]:
                      pathname === menu.path ||
                      asPath === menu.path ||
                      (menu.dynamicPath && pathname === menu.dynamicPath),
                  })}
                  onClick={() => {
                    if (visible) {
                      setVisible(false);
                    }
                  }}
                >
                  {/page/.test(menu.path) ? (
                    <Link href={"/page/[id]"} as={menu.path}>
                      <a>{menu.label}</a>
                    </Link>
                  ) : (
                    <Link href={menu.path}>
                      <a>{menu.label}</a>
                    </Link>
                  )}
                </li>
              ))}
              <li
                className={style.searchWrapper}
                onClick={() => setShowSearch(true)}
              >
                <a className={style.search}></a>
              </li>
              <li className={style.themeToggle}>{/* <ThemeToggle /> */}</li>
            </ul>
          </nav>

          <Search visible={showSearch} onClose={(_) => setShowSearch(false)} />
        </div>
      </div>
    </header>
  );
}

export default scroll(Header);
