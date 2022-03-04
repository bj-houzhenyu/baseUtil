import { isObject, isArray, isFunction } from "./type";

/**
 * 数组展开
 * @param {array} array 要展开的数组
 * @returns {array} 展开后的数组
 */
export function flatArray(array) {
  return array.reduce((result, current) => {
    const value = isArray(current) ? flatArray(current) : [current];
    return [...result, ...value];
  }, []);
}

/**
 * 对象属性检出
 * @param {object} target 要检出属性的对象
 * @param {object} options 配置
 * @returns {object} 检出的对象
 */
export function flatObject(target, options = {}) {
  const entries = Object.entries(options);
  if (entries.length < 1) return target;

  const results = [];
  entries.forEach(([property, setting]) => {
    const keys = property.split(".");
    const origin = keys.reduce((res, key) => {
      if (res && res[key]) return res[key];
      return null;
    }, target);
    if (origin) {
      if (isObject(setting)) {
        const { name, format } = setting;
        results.push({
          [name || property]: isFunction(format) ? format(origin) : origin
        });
      } else results.push({ [setting]: origin });
    }
  });
  return Object.assign({}, ...results);
}
