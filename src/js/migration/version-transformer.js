import DB from "../app.db";

const VersionTransformer = {
  "1.0.0": () => {
    let data = DB.get("data");

    DB.set("data", data || {
      mocks: [],
      selectedMock: -1
    });

    DB.set("version", "1.0.0");

    return true;
  }
};

export default VersionTransformer;
