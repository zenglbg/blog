import { extend } from 'umi-request';

const ajax = extend({
  //   timeout: 1000,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

export { ajax };
