 
import { api } from '@/utils/fetch/api';

export class SearchProvider {
  static async searchArticles(keyword): Promise<IArticle[]> {
    return api.get("/search/article", {
      params: { keyword }
    });
  }

  static getRecords(params): Promise<[ISearch[], number]> {
    return api.get("/search", { params });
  }

  static deleteRecord(id): Promise<ISearch> {
    return api.delete("/search/" + id);
  }
}
