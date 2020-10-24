import { Http } from "@/utils/fetch/http";

export class GithubSr {
  /**
   * repos
   */
  public static getRepos(user: string) {
    return Http.get(`https://api.github.com/users/${user}/repos`);
  }
  /**
   * repoInfo
   */
  public static getRepoInfo({ user, repo }: { user: string; repo: string }) {
    return Http.get(`https://api.github.com/repos/${user}/${repo}`);
  }
}
