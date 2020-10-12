import React from "react";
import cls from "classnames";
import Link from "next/link";
import { TagsFilled } from "@ant-design/icons";
import { useRouter } from "next/router";
import style from "./index.module.scss";

const Tag: React.FunctionComponent<{ tags: ITag[] }> = ({ tags = [] }) => {
  const router = useRouter();
  const { tag: routerTag } = router.query;
  console.log(tags);
  return (
    <div className={style.wrapper}>
      <div className={style.title}>
        <TagsFilled />
        <span>标签</span>
      </div>
      <ul>
        {tags.map((tag) => (
          <li
            key={tag.id}
            className={cls(
              style.item,
              routerTag === tag.value ? style.active : false
            )}
          >
            <Link href={`/tag/[tag]`} as={`/tag/` + tag.value}>
              <a>
                {tag.label} [{tag.articleCount}]
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tag;
