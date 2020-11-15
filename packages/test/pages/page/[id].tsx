import React, { useState, useEffect } from "react";
import { NextPage, NextPageContext } from "next";
import { PageApi } from "@/lib/api";
import PagePage from "@components/page";


interface IPageProps {
  page: IPage;
}

const Page: NextPage<IPageProps> = (props) => {
  return <PagePage />;
};

Page.getInitialProps = async function (ctx: NextPageContext) {
  const { id } = ctx.query;
  const page = await PageApi.getPage(id);

  return { page };
};

export default Page;
