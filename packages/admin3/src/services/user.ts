import request from '@/utils/request';

export async function query(): Promise<any> {
  return request('/users');
}

export async function queryCurrent(): Promise<IUser> {
  return request('/user/currentUser');
}

export async function queryNotices(): Promise<any> {
  return request('/notices');
}
