const replace = ["-", "_", " "];

/**
 * 参数名转下划线
 * @param {string} name 原值
 * @returns {string} 转换后的值
 */
export default function(name) {
  const arr = name.split("");
  return arr.reduce((res, key) => {
    const last = res[res.length - 1];
    if (replace.includes(key)) {
      if (res.length > 0 && last !== "_") res.push("_");
    } else if (/[A-Z]/.test(key)) {
      if (res.length > 0 && last !== "_") res.push("_");
      res.push(key.toLowerCase());
    } else res.push(key);
    return res;
  }, []).join("");
}
