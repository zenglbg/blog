import * as React from "react";
import { AppstoreFilled } from "@ant-design/icons";
import { useRouter } from "next/router";
import Link from "next/link";
import cls from "classnames";
import style from "./index.module.scss";

interface ICategoryProps {
  categories: ICategory[];
}

const Category: React.FunctionComponent<ICategoryProps> = ({
  categories = [],
}) => {
  const router = useRouter();
  const { category: routerCategory } = router.query;


  return (
    <div className={style.wrapper}>
      <div className={style.title}>
        <AppstoreFilled />

        <span>分类</span>
      </div>

      <ul>
        {categories.map((category) => {
          <li
            key={category.id}
            className={cls(
              style.tagItem,
              routerCategory === category.value ? style.active : false
            )}
          >
            <Link href="/[category]" as={`/${category.value}`} shallow={false}>
              <a>
                <span>{category.label}</span>
                <span>共 {category.articleCount} 篇文章</span>
              </a>
            </Link>
          </li>;
        })}
      </ul>
    </div>
  );
};

export default Category;
