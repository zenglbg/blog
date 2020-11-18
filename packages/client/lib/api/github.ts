import { api } from "@lib/utils/fetch/api";

export class GithubApi {
  /**
   * repos
   */
  public static getRepos(user: string) {
    return api.get(`https://api.github.com/users/${user}/repos`);
  }
  /**
   * repoInfo
   */
  public static getRepoInfo({ user, repo }: { user: string; repo: string }) {
    return api.get(`https://api.github.com/repos/${user}/${repo}`);
  }
}
