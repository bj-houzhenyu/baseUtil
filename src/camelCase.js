const replace = ["-", "_", " "];
  
/**
 * 参数名转驼峰
 * @param {string} value 参数名
 * @returns {string} 驼峰参数名
 */
export default function camelCase(value) {
  let sign = false;
  return value.split("").reduce((res, next) => {
    if (replace.includes(next)) {
      if (res.length > 0) sign = true;
    } else if (sign) {
      res.push(next.toUpperCase());
      sign = false;
    } else res.push(next.toLowerCase());
    return res;
  }, []).join("");
}
