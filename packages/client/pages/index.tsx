import { NextPage, NextPageContext } from "next";

interface IHomeProps {}

const Home: NextPage<IHomeProps> = () => {
  return null;
};
Home.getInitialProps = (ctx: NextPageContext) => {
  // console.log(ctx);

  // const redirectOnError = () =>
  //   typeof window !== "undefined"
  //     ? Router.push("/home")
  //     : ctx.res.writeHead(302, { Location: "/login" }).end();
  return { a: 1 };
};
export default Home;
