import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { useSetting } from "@lib/hooks";
import { PageApi } from "@lib/api";
import SPTDataTable from "@/common/SPTDataTable";
import { useColumns } from "./index-columns";
import { IState } from "@redux/reducer";
import { ActionPage } from "@redux/actions";
import { action } from "typesafe-actions";

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
        data={pages}
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
