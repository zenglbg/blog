import React, { useEffect, useState } from "react";
import { GithubSr } from "@/services";
import style from "./scss/repos.scss";
import Icon from "@ant-design/icons";
import { from } from "rxjs";
import { concatMap, map, toArray } from "rxjs/operators";
import githubSvg from "./svg/github.svg";

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
    <div className={style.repos_wrapper}>
      <div className={style.my_github}>
        <h2>我的开源</h2>

        <Icon
          component={githubSvg}
          style={{
            fontSize: "54px",
          }}
        />
      </div>
      <div className={style.repos_list}>
        {repos.map((repo) => {
          return (
            <div className={style.repos_li} key={repo.node_id}>
              <h3>{repo.name}</h3>

              <span className={style.li_star}>{repo.stargazers_count}</span>
              <span className={style.li_frok}>{repo.forks}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Res;
