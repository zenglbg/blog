import request from '@/utils/request';

/**
 * 获取所有文章
 */
export function getArticles(params: {
  page: number | undefined;
  pageSize: number | undefined;
  status?: string;
  [key: string]: any;
}): Promise<{ data: IArticle[]; total: number }> {
  return request.get('/article', { params });
}

export function getLove(): Promise<IArticle[]> {
  return request.get('/article/love');
}
/**
 * 获取分类所有文章
 * @param category
 * @param params
 */
export function getArticlesByCategory(
  category: ICategory,
  params: any,
): Promise<{ data: IArticle[]; total: number }> {
  return request.get('/article/category/' + category, { params });
}

/**
 * 获取标签所有文章
 * @param tag
 * @param params
 */
export function getArticlesByTag(
  tag: ITag,
  params: any,
): Promise<{ data: IArticle[]; total: number }> {
  return request.get('/article/tag/' + tag, { params });
}

/**
 * 获取推荐文章
 * @param articleId
 */
export function getRecommend(articleId = null): Promise<IArticle[]> {
  return request.get('/article/recommend', { params: { articleId } });
}

/**
 * 获取所有文章归档
 */
export function getArchives(): Promise<{
  [key: string]: { [key: string]: IArticle[] };
}> {
  return request.get('/article/archives');
}

/**
 * 获取指定文章
 * @param id
 */
export function getArticle(id: string): Promise<IArticle> {
  return request.get(`/article/${id}`);
}

/**
 * 新建文章
 * @param data
 */
export function addArticle(article: IArticle): Promise<IArticle> {
  return request.post('/article/create', { data: article });
}

/**
 * 更新文章
 * @param id
 * @param data
 */
export function updateArticle(id: string, data: IArticle): Promise<IArticle> {
  return request.patch(`/article/${id}`, { data });
}

/**
 * 更新文章阅读量
 * @param id
 * @param data
 */
export function updateArticleViews(id: string): Promise<IArticle> {
  return request.post(`/article/${id}/views`);
}

/**
 * 校验文章密码是否正确
 * @param id
 * @param password
 */
export function checkPassword(id: string, password: string): Promise<{ pass: boolean } & IArticle> {
  return request.post(`/article/${id}/checkPassword`, { data: password });
}

/**
 * 删除文章
 * @param id
 */
export function deleteArticle(id: string): Promise<IArticle> {
  return request.delete(`/article/${id}`);
}
