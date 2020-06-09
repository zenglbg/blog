const interceptors_req = [];
const interceptors_res = [];

export function z(input: RequestInfo, init: RequestInit = {}) {
  if (!init.method) {
    init.method = "GET";
  }

  init = interceptors_req.reduce((acc, interceptor) => {
    return interceptor(acc);
  }, init);

  return new Promise(function (resolve, reject) {
    fetch(input, init)
      .then((res) => {
        resolve(
          interceptors_res.reduce((acc, interceptor) => interceptor(acc), res)
        );
      })
      .catch((err) => reject(err));
  });
}
