import { fillBefore } from "./fill";

/**
 * 字符串转数字
 * @param {string} number 数字字符串
 * @param {number} base 进制
 * @returns {number} 转换后的数字
 */
export function parseNumber(number, base = 10) {
  return /^-?\d+(\.\d+)?$/.test(number) ? parseFloat(number, base) : number;
}

const replacement = "yyyy,MM,dd,hh,mm,ss,timestamp".split(",");

/**
 * 转换时间日期
 * @param {string | Date} date 日期时间
 * @param {T} initial 转换失败时的返回值
 * @returns {Date | T} 转换后的日期时间
 */
function formatDate(date, initial) {
  if (arguments.length < 2) initial = date;
  if (!date) return initial;
  if (date.constructor === Date) return date;
  const result = new Date(date);
  if (result.toString() === "Invalid Date") return initial;
  return result;
}

/**
 * 转换日期时间格式
 * @param {Date | String} date 日期时间
 * @param {string} format 转换格式
 * @returns {Date | string | number} 转换后的日期时间格式
 */
export function parseDate(date, format) {
  const args = [date];
  if (format) args.push(undefined);
  const origin = formatDate(...args);
  if (!format || !origin) return origin;

  const value = {
    yyyy: () => origin.getFullYear(),
    MM: () => fillBefore(origin.getMonth() + 1, "0", 2),
    dd: () => fillBefore(origin.getDate(), "0", 2),
    hh: () => fillBefore(origin.getHours(), "0", 2),
    mm: () => fillBefore(origin.getMinutes(), "0", 2),
    ss: () => fillBefore(origin.getSeconds(), "0", 2),
    timestamp: () => origin.getTime()
  };
  return replacement.reduce((result, key) => {
    result = result.replace(new RegExp(key, "g"), value[key]());
    return result;
  }, format);
}

/**
 * json 转对象
 * @param {string} json 原 json
 * @param {any} init 解析 json 出错时的返回值
 * @returns {object | array} json 转换后的返回值
 */
export function parseJson(json, init) {
  try {
    return JSON.parse(json);
  } catch {
    return init;
  }
}
