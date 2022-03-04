import camelCase from "./camelCase";
import copy from "./copy";
import debounce from "./debounce";
import EventEmitter from "./emitter";
import { flatArray, flatObject } from "./flat";
import patch from "./patch";
import Request from "./request";
import Socket from "./socket";
import storage from "./storage";
import throttle from "./throttle";
import fill, { fillBefore, fillAfter } from "./fill";
import { parseNumber, parseDate, parseJson } from "./parse";
import pick, { pickExcept } from "./pick";
import underCase from "./underCase";
import { useState, useBool, useModel, useCache, useEvent } from "./hook";
import trim from "./trim";
import {
  typeOf,
  isObject,
  isArray,
  isString,
  isNumber,
  isBool,
  isFunction,
  isSymbol,
  isNil,
  isNilEmpty,
  isNilObject,
  isPromise,
  isError
} from "./type";

const type = {
  typeOf,
  isObject,
  isArray,
  isString,
  isNumber,
  isBool,
  isFunction,
  isSymbol,
  isNil,
  isNilEmpty,
  isNilObject,
  isPromise,
  isError
};
fill.fillBefore = fillBefore;
fill.fillAfter = fillAfter;
pick.pickExcept = pickExcept;
const parse = { parseNumber, parseDate, parseJson };
const flat = { flatArray, flatObject };
const hook = { useState, useBool, useModel, useCache, useEvent };

export {
  camelCase,
  copy,
  debounce,
  EventEmitter,
  flatArray,
  flatObject,
  patch,
  Request,
  Socket,
  storage,
  throttle,
  parseNumber,
  parseDate,
  parseJson,
  pickExcept,
  pick,
  underCase,
  fillBefore,
  fillAfter,
  fill,
  parse,
  typeOf,
  isObject,
  isArray,
  isString,
  isNumber,
  isBool,
  isFunction,
  isSymbol,
  isNil,
  isNilEmpty,
  isNilObject,
  isPromise,
  isError,
  useState,
  useBool,
  useModel,
  useCache,
  useEvent,
  trim
};

export default {
  camelCase,
  copy,
  debounce,
  EventEmitter,
  patch,
  Request,
  Socket,
  storage,
  throttle,
  fill,
  pick,
  underCase,
  parse,
  type,
  flat,
  hook,
  trim
};
