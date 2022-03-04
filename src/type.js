import { localObject, type, makeType } from "./base";

export function typeOf(target) {
  return Object.prototype.toString.call(target);
}

function isTypeOf(target, type) {
  return typeOf(target) === makeType(type);
}

export function isObject(target) {
  return isTypeOf(target, type.object);
}

export function isArray(target) {
  return isTypeOf(target, type.array);
}

export function isString(target) {
  return isTypeOf(target, type.string);
}

export function isNumber(target) {
  return isTypeOf(target, type.number) && !isNaN(target);
}

export function isBool(target) {
  return isTypeOf(target, type.bool);
}

export function isFunction(target) {
  return isTypeOf(target, type.function);
}

export function isSymbol(target) {
  return isTypeOf(target, type.symbol);
}

export function isNil(target) {
  return target === null || target === undefined;
}

export function isNilEmpty(target) {
  return isNil(target) || target === "";
}

export function isNilObject(target) {
  if (!isObject(target) && !isArray(target)) return isNilEmpty(target);
  if (target.constructor && localObject.includes(target.constructor)) return false;
  if (isArray(target)) return target.length < 1;
  for (const key of Object.keys(target)) {
    if (!isNil(target[key])) return false;
  }
  return true;
}

export function isPromise(target) {
  return target.constructor === Promise;
}

export function isError(target) {
  return [Error, TypeError].includes((target || {}).constructor);
}
