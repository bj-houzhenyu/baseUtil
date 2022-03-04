export const localObject = [Date, RegExp, Function, Map, Set, WeakMap, WeakSet, Blob, File];

export const type = {
  object: "Object",
  array: "Array",
  string: "String",
  number: "Number",
  bool: "Boolean",
  function: "Function",
  symbol: "Symbol"
};
export function makeType(type) {
  return `[object ${type}]`;
}
