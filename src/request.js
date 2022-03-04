import axios from "axios";
import { isFunction, isNilEmpty, isObject, isPromise } from "./type";
import copy from "./copy";

const defaultSetting = {
  base: "",
  header: {},
  onError: undefined
};

function formatResponse(response, config = {}) {
  const { native } = config;
  if (native === true || !isObject(response)) return response;
  
  const { data } = response;
  return data;
}

function makeUrl(url, base) {
  if (/^http.*/.test(url) || isNilEmpty(base)) return url;
  return `${base}${url}`;
}

function mergeConfig(defaultConfig, config = {}) {
  const defaultHeaders = defaultConfig.headers;
  const configHeaders = config.headers;
  return Object.assign({}, defaultConfig, config, {
    headers: Object.assign({}, defaultHeaders, configHeaders)
  });
}

export default class Request {
  config
  axios
  constructor(settings) {
    this.config = { ...copy(defaultSetting), ...(settings || {}) };
    this.axios = axios.create(this.config);
  }

  use(action) {
    if (isFunction(action)) {
      action(this.axios.interceptors);
    }
  }
  request(request = {}) {
    const { url, options, ...requestOthers } = request;
    const mergedConfig = mergeConfig(this.config, { ...requestOthers, ...(options || {}) });
    const { base, onError, responseConfig, ...optionOthers } = mergedConfig;
    const resquest = {
      url: makeUrl(url, base),
      ...optionOthers
    };
    return this.axios(resquest).then(response => {
      const result = typeof onError === "function"
        ? onError(response)
        : Promise.resolve(response);
      const promise = isPromise(result) ? result : Promise.resolve(result);
      return promise.then(response => {
        return formatResponse(response, responseConfig);
      });
    });
  }
  get(url, params, options = {}) {
    return this.request({
      method: "get",
      url,
      params,
      options
    });
  }
  post(url, data, options = {}) {
    return this.request({
      method: "post",
      url,
      data,
      options
    });
  }
  patch(url, data, options) {
    return this.request({
      method: "patch",
      url,
      data,
      options
    });
  }
  put(url, data, options) {
    return this.request({
      method: "put",
      url,
      data,
      options
    });
  }
  delete(url, params, options) {
    return this.request({
      method: "delete",
      url,
      params,
      options
    });
  }
}
