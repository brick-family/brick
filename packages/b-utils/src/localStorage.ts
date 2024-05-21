const storage = window.localStorage;

export const lpLocalStorage = {
  add: (key: string, value: any) => {
    if (typeof value === 'object') {
      value = JSON.stringify(value);
    }
    storage.setItem(key, value);
  },
  // 覆盖原先的对象
  addCoverObject: (key: string, value: any) => {
    if (typeof value === 'string') {
      value = JSON.parse(value);
    }
    let currValue = storage.getItem(key);
    let resValue = {};
    if (currValue) {
      const newValue = JSON.parse(currValue);
      resValue = { ...newValue, ...value };
    } else {
      resValue = value;
    }
    lpLocalStorage.add(key, resValue);
  },
  get: (key: string) => {
    return storage.getItem(key);
  },
  remove: (key: string) => {
    storage.removeItem(key);
  },
  clear: () => {
    storage.clear();
  },
};

export default lpLocalStorage;
