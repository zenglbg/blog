class InterceptorManager {
  handlers = [];

  use = function use(fulfilled: Function, rejected: Function) {
    this.handlers.push({
      fulfilled,
      rejected,
    });
  };
}

export { InterceptorManager };
