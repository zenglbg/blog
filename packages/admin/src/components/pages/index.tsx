import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useSetting } from "@lib/hooks";
import { PageApi } from "@lib/api";
import SPTDataTable from "@/common/SPTDataTable";
import {useColumns} from './columns'
const Wrapper = styled.div``;
interface IPagesProps {}

const Pages: React.FunctionComponent<IPagesProps> = (props) => {
  const [pages, setPage] = useState<IPage[]>([]);
  const [total, setTotal] = useState(0);
  const columns = useColumns()


  useEffect(() => {
    PageApi.getPagelist().subscribe((res) => {
      if (res.success) {
        const [pages, total] = res.data;
        setPage(pages);
        setTotal(total);
      }
    });
  }, []);

  const onSearch = () => {
    
  };

  return (
    <Wrapper>
      <SPTDataTable
        data={pages}
        total={total}
        onSearch={onSearch}
        columns={columns}
      />
    </Wrapper>
  );
};

export default Pages;
