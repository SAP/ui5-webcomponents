import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "float";
const pathData = "M338 304h67v42H290v-35l45-76c7-12 13-22 16-29 4-5 7-13 9-22 1-3 2-7 2-11v-11c0-11 0-16-3-21-2-5-6-7-11-7-6 0-10 2-12 7-3 5-6 11-8 20l-36-9c2-16 8-31 18-44 11-11 23-16 38-16 11 0 20 3 29 8 6 5 12 13 18 24 5 11 7 23 7 36 0 12-2 21-5 32s-7 20-10 27c-4 9-10 19-17 30zm-231 42v-41h38V149l-35 36v-48l38-41h35v209h31v41H107zm143 56l-15-11c8-17 13-32 16-45-5-1-10-4-14-9-3-5-5-11-5-18 0-9 2-15 6-20s9-8 15-8c7 0 12 3 16 8 5 6 7 14 7 24s-2 20-5 30c-3 9-4 17-7 25s-9 15-14 24z";
const ltr = false;
const accData = null;
const collection = "tnt-v3";
const packageName = "@ui5/webcomponents-icons-tnt";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "tnt-v3/float";
export { pathData, ltr, accData };