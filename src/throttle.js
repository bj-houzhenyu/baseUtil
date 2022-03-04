/**
 * 截流
 * @param {function} fn 回调函数
 * @param {number} timeout 截流间隔
 * @returns {function} 截流函数
 */
export default function throttle(fn, timeout) {
  let t;
  function throttle(...args) {
    throttle.clear();
    t = setTimeout(() => {
      fn.apply(this, args);
    }, timeout);
  }
  throttle.clear = function() {
    if (t) clearTimeout(t);
  };
  throttle.immediate = function(...args) {
    throttle.clear();
    fn.apply(this, args);
  };
  return throttle;
}