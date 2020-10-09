import * as React from "react";
import { NextPage, NextPageContext } from "next";

interface Props {
  query: { name?: string };
}

const Index: NextPage<Props> = ({ query }) => {
  const greetName = query.name ? query.name : "World";
  return (
    <div>
      <h1>Hello, {greetName}!</h1>
    </div>
  );
};

Index.getInitialProps = async (ctx: NextPageContext) => {
  const { query } = ctx;
  return { query };
};

export default Index;
