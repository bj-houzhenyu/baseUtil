function makeFill(fill, length) {
  const len = fill.length;
  const originLength = len > length ? 0 : Math.floor(length / len);
  const origin = new Array(originLength).fill(fill).join("");
  const last = length % len;
  return `${origin}${last > 0 ? fill.slice(0, last) : ""}`;
}

/**
 * 前填充
 * @param {string} value 原值
 * @param {string} fill 填充值
 * @param {number} length 填充长度
 * @returns {string} 填充后的值
 */
export function fillBefore(value, fill, length = 0) {
  const localValue = value.toString();
  if (localValue.toString().length >= length) return value;
  return `${makeFill(fill, length - localValue.length)}${localValue}`;
}

/**
 * 后填充
 * @param {string} value 原值
 * @param {string} fill 填充值
 * @param {number} length 填充长度
 * @returns {string} 填充后的值
 */
export function fillAfter(value, fill, length = 0) {
  const localValue = value.toString();
  if (localValue.length >= length) return value;
  return `${localValue}${makeFill(fill, length - localValue.length)}`;
}

/**
 * 填充
 * @param {string} value 原值
 * @param {object} option 配置
 * @returns {string} 填充后的值
 */
export default function(value, option = {}) {
  const { position, fill, length } = option;
  switch (position) {
    case "before": return fillBefore(value, fill, length);
    case "after": return fillAfter(value, fill, length);
    default: return value;
  }
}
