import VersionTransformer from "./version-transformer";

const versions = [
  "1.0.0"
];


export default function migrate(currentVersion) {
  let index = versions.indexOf(currentVersion);

  if (index == -1) {
    index = 0;
  }

  for (; index < versions.length; index++) {
    if (!VersionTransformer[versions[index]]()) {
      throw new Error(`Something went wrong with migration: ${version[index - 1]} --> ${versions[index]}`);
    }
  }
}
