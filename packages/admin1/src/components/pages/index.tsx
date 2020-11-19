import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import SPTDataTable from "@/common/SPTDataTable";
import { useColumns } from "./index-columns";
import { IState } from "@reducer";
import { ActionPage } from "@actions";

const Wrapper = styled.div``;

interface IPagesProps {
  getpage: Function;
  setpage: Function;
  handleId: Function;
}

const Pages: React.FunctionComponent<IPagesProps & Pick<IState, "page">> = ({
  getpage,
  page,
  handleId,
}) => {
  const { pages, total } = page;
  const columns = useColumns(handleId);

  useEffect(() => {
    getpage();
  }, []);

  const onSearch = () => {};

  return (
    <Wrapper>
      <SPTDataTable
        data={pages as Array<any>}
        total={total}
        onSearch={onSearch}
        columns={columns}
      />
    </Wrapper>
  );
};

const mapStateToProps = ({ page }: IState) => ({ page });

const mapDispatchToProps = {
  getpage: ActionPage.getpage,
  setpage: ActionPage.setpage,
  handleId: ActionPage.handleId,
};

export default connect(mapStateToProps, mapDispatchToProps)(Pages);
