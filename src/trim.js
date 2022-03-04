import { isString, isArray, isObject } from "./type";

/**
 * trim 两端去空格
 * 对象时去所有字段两端空格
 * 数组时去所有子项两端空格
 * @param {object | array | string} target 原值
 * @returns {object | array | string} trim 后的值
 */
function trim(target) {
  if (isArray(target)) return target.map(item => trim(item));
  if (isString(target)) return target.trim();
  if (isObject(target)) {
    const values = Object.entries(target).map(([key, value]) => {
      return { [key]: trim(value) };
    });
    return values.length > 0 ? Object.assign(...values) : target;
  }
  return target;
}

export default trim;
