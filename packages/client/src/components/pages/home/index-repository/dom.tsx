import styled from "styled-components";

export const DIV = styled.div`
  .wrapper {
    background-color: #f9f9f9;
  }
  .github {
    text-align: center;
    padding-top: 10px;
  }
  .repos-list {
    margin-top: 30px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    padding: 0 30px;
    grid-gap: 30px 50px;
  }
  .repos_li {
    padding: 30px;
    box-sizing: border-box;
    background-color: #fff;
    &:hover {
      background-color: pink;
    }
  }
`;

export const P = styled.p``;

export const H2 = styled.h2`
  font-size: 36px;
  line-height: 36px;
`;

export const H3 = styled.h3`
  color: #2c3e50;
  font-size: 20px;
`;

export const IFRAME = styled.iframe`
  border: 0;
`;
