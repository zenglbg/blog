import "./index.less";
import * as React from "react";
import { Pagination as APagination } from "antd";

interface IPaginationProps {
  total: number;
  onChange: (page: number, pageSize?: number) => void;
  page: number;
  pageSize: number;
  hideOnSinglePage?: boolean;
}

const Pagination: React.FunctionComponent<IPaginationProps> = ({
  total,
  page,
  pageSize,
  hideOnSinglePage = false,
  onChange,
}) => {
  return (
    <div className="pagination-wrapper">
      {total > 0 ? (
        <APagination
          pageSizeOptions={["8", "12", "24", "36"]}
          showSizeChanger
          total={total}
          current={page}
          pageSize={pageSize}
          hideOnSinglePage={hideOnSinglePage}
          onChange={onChange}
          onShowSizeChange={onChange}
        />
      ) : null}
    </div>
  );
};

export default Pagination;
