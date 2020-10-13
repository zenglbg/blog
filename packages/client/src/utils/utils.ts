import { time } from "console";

export function timetrans(time) {
  var date = new Date(time);
  var Y = date.getFullYear() + "-";
  var M =
    (date.getMonth() + 1 < 10
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1) + "-";
  var D = (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + " ";
  // var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
  // var m = (date.getMinutes() <10 ? '0' + date.getMinutes() : date.getMinutes()) + ':'
  // var s = (date.getSeconds() <10 ? '0' + date.getSeconds() : date.getSeconds())
  return Y + M + D;
}

export function debounce(fn, wait) {
  var timer = null;
  return (...args) => {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, wait);
  };
}

export function throttle(fn, gapTime) {
  let _lastTime = null;

  return () => {
    let _nowTime = Number(new Date());
    if (_nowTime - _lastTime > gapTime || !_lastTime) {
      fn();
      _lastTime = _nowTime;
    }
  };
}
