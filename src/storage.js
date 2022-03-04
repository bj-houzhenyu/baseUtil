import { isNilEmpty } from "./type";

function toJson(arg) {
  return JSON.stringify(arg);
}

function toArg(json) {
  try {
    return JSON.parse(json);
  } catch (e) {
    console.error(e);
    return json;
  }
}

class Storage {
  storage
  constructor(storage) {
    switch (storage) {
      case "session":
        this.storage = sessionStorage;
        break;
      case "local":
        this.storage = localStorage;
        break;
      // skip default
    }
  }

  length() {
    this.storage.length;
  }

  set(key, value) {
    this.storage.setItem(key.toString(), toJson({ value }));
  }

  get(key) {
    const value = this.storage.getItem(key.toString());
    return (isNilEmpty(value) ? value : toArg(value).value) || undefined;
  }

  remove(key) {
    this.storage.removeItem(key);
  }
}

export default {
  session: new Storage("session"),
  local: new Storage("local")
};
