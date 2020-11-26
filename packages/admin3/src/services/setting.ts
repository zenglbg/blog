import request from '@/utils/request';

/**
 * 获取设置
 */
export function getSetting(): Promise<any> {
  return request.post('/setting/get');
}

/**
 * 更新设置
 */
export function updateSetting(data: any): Promise<any> {
  return request.post(`/setting`, { data });
}
