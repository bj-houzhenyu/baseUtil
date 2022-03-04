/**
 * 防抖
 * @param {function} fn 回调函数
 * @param {number} timeout 延迟时间
 * @returns 防抖函数
 */
export default function debounce(fn, timeout) {
  let t;
  function debounce(...args) {
    if (t) return;
    fn.apply(this, args);
    t = setTimeout(() => {
      t = undefined;
    }, timeout);
  }
  debounce.clear = function() {
    if (t) clearTimeout(t);
  };
  debounce.immediate = function(...args) {
    debounce.clear();
    fn.apply(this, args);
  };
  return debounce;
}
