import request from '@/utils/request';

export function addTag(tag: ITag): Promise<ITag> {
  return request.post('/tag', { data: tag });
}

export function delTag(id: string): Promise<ITag> {
  return request.delete(`/tag/${id}`);
}

export function updateTag(id: string, tag: ITag): Promise<ITag> {
  return request.patch(`/tag/${id}`, { data: tag });
}

export function getTags(params = {}): Promise<ITag[]> {
  return request.get('/tag', { params });
}
