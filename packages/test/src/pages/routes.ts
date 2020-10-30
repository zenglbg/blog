import Routes from "next-routes";
const _routes = new Routes();

_routes
  .add("index", "/")
  .add("about", "/about")
  .add("contact", "/contact")
  .add("post", "/blog/:slug");

export default _routes;
