import { Http } from "@lib/utils/fetch/http";

export class GithubApi {
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
