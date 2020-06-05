import React, { useContext } from "react";
import { Table } from "antd";
import Search from "../Search";

interface ISPTDataTableProps {
  data: Array<any>;
  columns: Array<any>;
  defaultTotal: number;
  onSearch?: Function;
  customDataTable?: (data) => React.ReactNode;
}

const SPTDataTable: React.FunctionComponent<ISPTDataTableProps> = ({
  customDataTable,
  data,
}) => {
  return (
    <div className="SPTDataTable-wrapper">
      <Search />
      {customDataTable ? customDataTable(data) : <Table pagination={false} />}
    </div>
  );
};

export default SPTDataTable;
