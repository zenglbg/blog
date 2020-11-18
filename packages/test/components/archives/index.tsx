import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Link from "next/link";
import dayjs from "dayjs";
import iconTop from "./images/icon-top.png";
import iconTags from "./images/tags.png";
import banner from "./images/banner.jpg";

const Wrapper = styled.div`
  .banner-wrapper {
    height: 24rem;
    background: url(${banner}) no-repeat center / cover;
    position: relative;
    width: 100%;
    margin-bottom: 4rem;
    text-align: center;

    p {
      position: absolute;
      right: 0px;
      bottom: 3rem;
      left: 0px;
      font-size: 4rem;
      -webkit-text-fill-color: transparent;
      -webkit-font-smoothing: antialiased;
      user-select: none;
      background: linear-gradient(
        90deg,
        rgb(196, 152, 122) 33%,
        rgb(255, 213, 191) 73%
      );
      background-clip: text;
      -webkit-background-clip: text;
    }
  }
`;

const ArchivesWrapper = styled.section`
  padding: 0 16.625rem;
  width: 100%;
  box-sizing: border-box;

  .year-wrapper {
    color: var(--main-text-color);
    margin-left: 5rem;
    font-size: 1.8rem;
  }

  .year-list {
    position: relative;
    padding-top: 1rem;
    margin-bottom: 1rem;
    &::after {
      content: "";
      display: block;
      position: absolute;
      left: 7rem;
      top: 0;
      bottom: 0;
      background: rgb(110, 202, 245);
      width: 0.2rem;
      z-index: 0;
    }

    .year-li {
      .li-label {
        > span {
          position: relative;
          line-height: 2.4;
          font-size: 1rem;
          color: var(--main-text-color);

          span {
            font-weight: bold;
          }
          &::before,
          &::after {
            content: "";
            display: block;
            position: absolute;
            top: 50%;
            transform: translateY(-50%) translateX(-50%);
            background-color: rgb(110, 202, 245);
            left: 7.1rem;
            width: 0.75rem;
            height: 0.75rem;
            border-radius: 50%;
            z-index: 2;
          }
          &::after {
            width: 1.05rem;
            height: 1.05rem;
            background-color: #fff;
            z-index: 1;
          }
        }
      }
      .li-body {
        min-height: 20rem;
        padding-left: 8.5rem;
        .body-content {
          position: relative;
          line-height: 2.4;

          .content-time,
          .content-link {
            color: var(--main-text-color);
            font-weight: 500;
            font-size: 0.85rem;
          }

          &::before,
          &::after {
            content: "";
            display: block;
            position: absolute;
            top: 50%;
            transform: translateY(-50%) translateX(-50%);
            background-color: rgb(110, 202, 245);
            left: -1.4rem;
            width: 0.525rem;
            height: 0.525rem;
            border-radius: 50%;
            z-index: 2;
          }
          &::after {
            width: 0.825rem;
            height: 0.825rem;
            background-color: #fff;
            z-index: 1;
          }
        }
      }
    }
  }
`;
interface IArchivesProps {
  archives: {
    [key: string]: { [key: string]: IArticle[] };
  };
}
const MonthWrapper = function (months) {};

const Archives: React.FunctionComponent<IArchivesProps> = ({ archives }) => {
  return (
    <Wrapper>
      <div className="banner-wrapper">
        <p className="banner-title">Archives</p>
      </div>
      <ArchivesWrapper>
        {archives &&
          Object.keys(archives).map((y) => {
            return (
              <>
                <h2 className="year-wrapper">{y}</h2>
                <ul className="year-list">
                  {Object.keys(archives[y]).map((m) => {
                    return (
                      <li className="year-li">
                        <label className="li-label">
                          <span>
                            <span>
                              {m}.({archives[y][m].length})
                            </span>
                          </span>
                        </label>
                        <ul className="li-body">
                          {archives[y][m].map((article) => {
                            return (
                              <li className="body-content">
                                <span className="content-time">
                                  {dayjs(article.publishAt).format("DD")}：
                                </span>
                                <Link href="">
                                  <a className="content-link">
                                    <span className="content-name">
                                      {article.title}
                                    </span>
                                    <span className="content-views">
                                      ({article.views})
                                    </span>
                                  </a>
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      </li>
                    );
                  })}
                </ul>
              </>
            );
          })}
      </ArchivesWrapper>
    </Wrapper>
  );
};

export default Archives;
