import { localObject } from "./base";

/**
 * 深拷贝
 * @param {T} target 要拷贝的项
 * @returns {T} 拷贝项
 */
export default function copy(target) {
  if (typeof target === "object") {
    if (target === null) return null;

    const result = [];
    if (Array.isArray(target)) {
      target.forEach(value => {
        result.push(copy(value));
      });
      return result;
    }

    const Constructor = localObject.find(constructor => {
      return constructor === target.constructor;
    });
    if (Constructor) {
      if ([Blob, File].includes(Constructor)) {
        const { name, type, lastModified } = target;
        const options = { type, lastModified };
        return new Constructor([target], name, options);
      } else {
        return new Constructor(target.valueOf());
      }
    }

    for (const key in target) {
      result.push({ [key]: copy(target[key]) });
    }
    Object.getOwnPropertySymbols(target).forEach(symbol => {
      result.push({ [symbol]: copy(target[symbol]) });
    });
    return result.length > 0 ? Object.assign.apply(null, result) : {};
  } else return target;
}
