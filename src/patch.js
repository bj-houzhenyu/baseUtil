import copy from "./copy";

/**
 * Array.prototype.findIndex 的其他调用方式
 * @param {array} origin 数组
 * @param {any} target 要匹配的项
 * @returns {number} 匹配的 index
 */
function findIndex(origin, target) {
  return origin.findIndex(item => item === target);
}

/**
* 整理 patch 数据结构
* @param {object} origin 原数据结构
* @param {object} target 修改后的数据结构
* @param {object} option 配置
* @returns {object} patch 数据结构
*/
export default function patchParams(origin, target, option) {
  const result = [];

  let proxy = new Proxy({}, {
    deleteProperty(target, p) {
    }
  })

  // 整理原数据结构中的字段
  Object.entries(origin).forEach(([key, value]) => {
    const targetValue = target[key];
    const callback = option && option[key];

    if (callback && typeof callback === "function") {
      // 有配置函数时 调用配置函数判断是否 patch
      const res = callback(copy(value), copy(targetValue), key, origin, target);
      if (res !== null && typeof res === "object") {
        result.push(res);
      }
    } else if (typeof value !== typeof targetValue) {
      // 修改后的数据中 与原结构类型不同的字段将直接 patch
      result.push({ [key]: copy(targetValue) });
    } else if (Array.isArray(value)) {
      // 如果是数组
      const add = copy(targetValue);
      const del = [];
      const res = {};

      // 需要调用 findIndex 方法确定
      // 1. 整理修改后的结构中 那些是添加项
      // 2. 原结构中的字段 那些是删除项
      let optionFindIndex = option && option[key] && option[key].findIndex;
      if (typeof optionFindIndex !== "function") {
        optionFindIndex = findIndex;
      }

      value.forEach(item => {
        const copyValue = copy(item);
        const index = optionFindIndex(add, copyValue);
        if (index > -1) add.splice(index, 1);
        else del.push(copyValue);
      });

      if (add.length > 0) res.add = add;
      if (del.length > 0) res.del = del;
      if (res.add || res.del) result.push({ [key]: res });
    } else if (typeof value === "object" && value !== null) {
      // 是对象时 深度遍历
      const patch = patchParams(value, targetValue, callback);
      if (patch) result.push({ [key]: patch });
    } else if (value !== targetValue) {
      // 其他情况时修改字段直接 patch
      result.push({ [key]: copy(targetValue) });
    }
  });
  // 整理修改后的数据结构中 原结构没有的字段
  Object.entries(target).forEach(([key, value]) => {
    if (!(key in origin)) {
      if (Array.isArray(value)) {
        result.push({ [key]: { add: copy(value) } });
      } else result.push({ [key]: copy(value) });
    }
  });

  return result.length > 0 ? Object.assign.apply(null, result) : undefined;
}
