import { ref, reactive } from "@vue/composition-api";
import { isBool, isFunction, isNilEmpty } from "./type";

/**
 * use state
 * vue ref 封装
 * 返回 [ref, setRef]
 * @param {any} initial 初始值
 * @returns {[any, function]} state hook
 */
export function useState(initial) {
  const state = ref(initial);
  const setState = next => {
    state.value = isFunction(next)
      ? next(state.value)
      : next;
  };
  return [state, setState];
}

/**
 * use bool 为值为 bool 类型的 useState
 * vue ref 封装
 * 返回 [ref, setRef] 空调 setRef 函数原值取反
 * @param {bool} initial 初始值
 * @returns {[any, function]} state hook
 */
export function useBool(initial) {
  const state = ref(!!initial);
  const setState = next => {
    const nextState = isFunction(next)
      ? next(state.value)
      : next;
    if (isBool(nextState)) state.value = next;
    else state.value = !state.value;
  };
  return [state, setState];
}

/**
 * use model
 * vue reactive 封装
 * 返回 [reactive, setReactive]
 * @param {object} initial 初始值
 * @returns {[object, function]} state hook
 */
export function useModel(initial) {
  const state = reactive(initial || {});
  const setState = next => {
    const nextState = isFunction(next)
      ? next(state)
      : next;
    Object.assign(state, nextState || {});
  };
  return [state, setState];
}

/**
 * use cache
 * vue ref 封装
 * 返回 [state, setState, getState]
 * @param {any} initial 初始值
 * @returns {[object, function, function]} state hook
 */
export function useCache(initial) {
  const cache = ref(initial);
  // getCache() 或 getCache(key)
  const getCache = key => {
    if (isNilEmpty(key)) return cache.value;
    else return (cache.value || {})[key];
  };
  // 对应 setCache(value) 或 setCache(key, value)
  const setCache = (...args) => {
    const [key, value] = args;
    if (args.length < 1 || isNilEmpty(key)) cache.value = undefined;
    else if (args.length === 1) cache.value = key;
    else (cache.value || {})[key] = value;
  };
  return [cache, setCache, getCache];
}

/**
 * 原生事件绑定
 * @param {element} ref 绑定事件的标签对象
 * @param {string} event 事件名称
 * @param {function} action 事件
 * @param {bool | object} option 配置 同 addEventListener 第三个参数
 * @returns {function} 解除绑定的函数
 */
export function useEvent(ref, event, action, option) {
  ref.addEventListener(event, action, option);
  return () => {
    ref.removeEventListener(event, action);
  };
}
