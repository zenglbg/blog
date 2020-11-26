import request from '@/utils/request';

export function uploadFile(file: any) {
  const formData = new FormData();
  formData.append('file', file);
  return request.post('/file/upload', { data: formData });
}

export function getFiles() {
  return request.get('/file');
}
