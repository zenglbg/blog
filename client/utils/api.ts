import Http from '@/utils/http';

export const getImg = (params?: any) => {
  return Http.get('/chat/img', params);
};

export const getText = (body?: any) => {
  return Http.post('/chat/qa', body);
};
