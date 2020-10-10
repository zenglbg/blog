import React from "react";

const Index = (...props) => {
  return (
    <div>
      <h1>hello next</h1>
      <h2>{process.env.NODE_ENV}</h2>
    </div>
  );
};

export default Index;
