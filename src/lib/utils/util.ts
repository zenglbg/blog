export function throttle(fn: Function, gapTime: number) {
  let _lastTime: any = null;

  return function () {
    const _nowTime = new Date().getTime();
    if (_nowTime - _lastTime > gapTime || !_lastTime) {
      fn();
      _lastTime = _nowTime;
    }
  };
}

export function chunk(arr: Array<any>, size: number) {
  size = size || 1;
  //
  const result = [];

  // 我这里能想到的是遍历
  const l = arr.length; //数组的长度
  const s = Math.ceil(l / size); //  假如我们有长度为10的数组，size传入的是3，是要分成4个自数组的。
  for (let i = 0; i < s; i++) {
    result[i] = arr.slice(size * i, size * (i + 1));
  }
  return result;
}
