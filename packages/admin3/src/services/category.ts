import request from '@/utils/request';

export function addCategory(category: ICategory): Promise<ICategory> {
  return request.post(`/category`, { data: category });
}

export function delCategory(id: string): Promise<ICategory> {
  return request.delete(`/category/${id}`);
}

export function updateCategory(id: string, category: ICategory): Promise<ICategory> {
  return request.patch(`/category/${id}`, { data: category });
}

export function getCategorys(data = {}): Promise<ICategory[]> {
  return request.get('/category', data);
}
