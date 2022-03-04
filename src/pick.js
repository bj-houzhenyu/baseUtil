import { isArray, isObject } from "./type";

/**
 * 从对象或数组中获取所有 key 值
 * 对象时返回 Object.keys
 * 非数组时返回 [key]
 * 数组时直接返回
 * @param {object | array | string} origin keys
 * @returns {array} keys
 */
function buildKeys(origin) {
  if (isObject(origin)) return Object.keys(origin);
  if (!isArray(origin)) return [origin];
  return origin;
}

function formatValue(target, key) {
  return (target || {})[key];
}

/**
 * 返回新对象
 * 不包含 origin 中传递的字段
 * @param {object} target 原对象
 * @param {object | array | string} origin keys
 * @returns {object} 转换后的对象
 */
export function pickExcept(target, origin) {
  const keys = buildKeys(origin);
  const values = Object.keys(target).map(key => {
    if (keys.includes(key)) return {};
    else return { [key]: formatValue(target, key) };
  });
  return Object.assign(...values);
}

/**
 * 返回新对象
 * 只包含 origin 中传递的字段
 * @param {object} target 原对象
 * @param {object | array | string} origin keys
 * @returns {object} 转换后的对象
 */
export default function(target, origin) {
  const keys = buildKeys(origin);
  const values = keys.map(key => {
    return { [key]: formatValue(target, key) };
  });
  return Object.assign(...values);
}
