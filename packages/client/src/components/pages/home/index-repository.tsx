import React, { useEffect, useState } from "react";

interface IResProps {}

const Res: React.FunctionComponent<IResProps> = (props) => {
  const [repos, setRepos] = useState([]);
  useEffect(() => {
    fetch(`https://api.github.com/users/zenglbg/repos`)
      .then((res) => res.json())
      .then((repos) => {
        console.log(repos)
        setRepos(repos);
      });
  }, []);
  return (
    <div>
      {repos.map((repo) => {
        return <h3>{repo.name}</h3>;
      })}
    </div>
  );
};

export default Res;
