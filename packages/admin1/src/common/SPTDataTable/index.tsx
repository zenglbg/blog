import React, { useState, useEffect } from "react";
import { Table } from "antd";

import Search from "../Search";
import Pagination from "../Pagination";

interface ISPTDataTableProps {
  data: Array<any>
  columns: Array<any>;
  total: number;
  onSearch?: (params?: any) => void;
  customDataTable?: (data: any) => React.ReactNode;
}

const SPTDataTable: React.FunctionComponent<ISPTDataTableProps> = ({
  total,
  columns,
  onSearch,
  customDataTable,
  data
}) => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(12);
  const [searchParams, setSearchParams] = useState({});

  useEffect(() => {
    const params = { page, pageSize, ...searchParams };
    onSearch && onSearch(params);
  }, [page, pageSize, searchParams]);

  return (
    <div className="SPTDataTable-wrapper">
      <Search
        onSearchBtn={(params) => {
          setPage(1);
          setSearchParams(params);
        }}
      />
      {customDataTable ? (
        customDataTable(data)
      ) : (
        <Table
          loading={!data}
          columns={columns}
          dataSource={data}
          pagination={false}
          rowKey="id"
        />
      )}

      <Pagination
        total={total}
        page={page}
        pageSize={pageSize}
        onChange={(page, pageSize = 12) => {
          setPage(page);
          setPageSize(pageSize);
        }}
      />
    </div>
  );
};

export default SPTDataTable;
