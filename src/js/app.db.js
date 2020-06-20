class DBClass {
  constructor() {
  }

  get(key) {
    return JSON.parse(window.localStorage.getItem(`simplemock.${key}`));
  }

  getVersion() {
    return JSON.parse(window.localStorage.getItem('simplemock.version'));
  }

  set(key, data) {
      window.localStorage.setItem(`simplemock.${key}`, JSON.stringify(data));
  }
}

const DB = new DBClass();

export default DB;
