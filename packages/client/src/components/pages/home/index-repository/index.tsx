import React, { useEffect, useState } from "react";
import { GithubSr } from "@/services";
import Icon from "@ant-design/icons";
import { from } from "rxjs";
import { concatMap, map, toArray } from "rxjs/operators";
import githubSvg from "../svg/github.svg";
import { DIV, P, H2, IFRAME } from "./dom";

interface IResProps {}

const Res: React.FunctionComponent<IResProps> = (props) => {
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    const user = "zenglbg";
    from(GithubSr.getRepos(user))
      .pipe(
        concatMap((res) => from(res)),
        concatMap((data) => GithubSr.getRepoInfo({ user, repo: data.name })),
        toArray()
      )
      .subscribe(setRepos);
  }, []);

  return (
    <DIV className="wrapper">
      <DIV className="github">
        <H2>我的开源</H2>

        <Icon
          component={githubSvg}
          style={{
            fontSize: "54px",
          }}
        />
      </DIV>

      <DIV className="repos-list">
        {repos.map((repo) => {
          return (
            <DIV className="repos_li">
              <H2 className="title">{repo.name}</H2>
              <DIV>
                {repo.name ? (
                  <P className="footer">
                    <IFRAME
                      src={`https://ghbtns.com/github-btn.html?user=zenglbg&repo=${repo.name}&type=star&count=true`}
                      scrolling="0"
                      width="150"
                      height="20"
                      title="GitHub"
                    ></IFRAME>
                  </P>
                ) : null}
              </DIV>
            </DIV>
          );
        })}
      </DIV>
    </DIV>
  );
};

export default Res;
