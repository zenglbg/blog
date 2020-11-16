import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { concatMap, toArray, tap, map } from "rxjs/operators";
import { GithubApi } from "@lib/api";
import { from } from "rxjs";
import githubSvg from "./images/github.svg";

const Wrapper = styled.div`
  background-color: #f9f9f9;
  .github {
    text-align: center;
    padding-top: 10px;

    img {
      width: 50px;
      height: 50px;
    }
  }
  .repos-list {
    margin-top: 30px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    padding: 0 30px;
    grid-gap: 50px 30px;
  }

  h2 {
    font-size: 36px;
    line-height: 36px;
  }

  h3 {
    color: #2c3e50;
    font-size: 20px;
  }
  iframe {
    border: 0;
  }
`;

const ReposLi = styled.div`
  background-color: #fff;
  position: relative;
  height: 200px;
  max-width: 44.25rem;
  margin: 0 auto;

  &::before,
  &::after {
    content: "";
    display: block;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    transition: all 0.5s;
  }
  &::before {
    z-index: 1;
  }
  &::after {
    z-index: 2;
  }
  .li-content {
    transition: all 0.5s;
    box-sizing: border-box;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 3;

    .title {
      text-align: center;
      font-size: 20px;
      margin: 0;
      margin-top: 10%;
      font-weight: 700;
      color: #2c3e50;
    }
    .desc {
      font-size: 14px;
      padding: 10px;
      text-align: center;
      color: #2c3e50;
      opacity: 0.8;
      margin: 0;
    }
    .star-btn {
      color: #24292e;
      position: absolute;
      bottom: 10px;
      left: 50%;
      transform: translateX(-50%);
      display: inline-block;
      padding: 5px 16px;
      font-size: 14px;
      font-weight: 500;
      line-height: 20px;
      white-space: nowrap;
      border-radius: 6px;
      -webkit-appearance: none;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }

  &:hover {
    background-color: ${({ color }) => color};
    transform: translateY(-10px) rotate(0) scale(1);
    &::before {
      background-color: ${({ color }) => color};
      opacity: 0.7;
      transform: translateY(-15px) rotate(2deg) scale(1);
    }
    &::after {
      background-color: ${({ color }) => color};
      opacity: 0.4;
      transform: translateY(-15px) rotate(-3deg) scale(1);
    }

    .li-content {
      transform: scale(0.7);
    }
  }
`;

interface IRepositoryProps {}

const Repository: React.FunctionComponent<IRepositoryProps> = (props) => {
  const [repos, setRepos] = useState([]);
  const [colors, setColors] = useState([]);
  useEffect(() => {
    const user = "zenglbg";
    from(GithubApi.getRepos(user))
      .pipe(
        map((res) => {
          if (res && res.status === 200) return res["data"];
        }),
        concatMap((res) => res),
        // tap((res) => console.log(res, `tap(res=>console.log`)),

        concatMap((data: any) =>
          GithubApi.getRepoInfo({ user, repo: data.name })
        ),
        toArray()
        // tap((res) => console.log(res, `tap(res=>console.log`))
      )
      .subscribe((articles: any[]) => {
        const colors = articles.map((repo) => {
          return (
            "#" +
            ("00000" + ((Math.random() * 0x1000000) << 0).toString(16)).substr(
              -6
            )
          );
        });
        setColors(colors);
        setRepos(articles);
      });
  }, []);

  return (
    <Wrapper className="wrapper">
      <div className="github">
        <h2>我的开源</h2>
        <img src={githubSvg} alt="githubSvg" />
      </div>

      <div className="repos-list">
        {repos.map((repo, index) => {
          return (
            <ReposLi key={index} color={colors[index]}>
              <div className="li-content">
                <h2 className="title">{repo.name}</h2>
                <p className="desc">{repo.description}</p>
                <div className="star-btn">
                  {repo.name ? (
                    <p className="footer">
                      <iframe
                        src={`https://ghbtns.com/github-btn.html?user=zenglbg&repo=${repo.name}&type=star&count=true`}
                        scrolling="0"
                        width="150"
                        height="20"
                        title="GitHub"
                      ></iframe>
                    </p>
                  ) : null}
                </div>
              </div>
            </ReposLi>
          );
        })}
      </div>
    </Wrapper>
  );
};

export default Repository;
