import * as React from "react";
import cls from "classnames";
import style from "./index.module.scss";

interface ISearchProps {
  visible: boolean;
  onClose: Function;
  articles?: IArticle[];
}

const Search: React.FunctionComponent<ISearchProps> = ({
  visible,
  articles,
  onClose,
}) => {
  return (
    <div
      className={cls(
        style.container,
        visible ? style.active : false,
        articles && articles.length ? style.hasResult : false
      )}
      onClick={() => onClose()}
    >
      search
    </div>
  );
};

export default Search;
