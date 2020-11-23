import request from '@/utils/request';

export function getArticles(params: {
  page: number | undefined;
  pageSize: number | undefined;
  status?: string;
  [key: string]: any;
}): Promise<{ data: IArticle[]; total: number }> {
  return request.get('/article', { params });
}
