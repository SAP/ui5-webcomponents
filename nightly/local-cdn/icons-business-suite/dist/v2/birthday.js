import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "birthday";
const pathData = "M43.5 294c0-65 54-119 118-119v-25c0-13 9-23 22-23 15 0 25 10 25 23v25h96v-25c0-13 8-23 23-23 13 0 24 10 24 23v25c65 0 117 54 117 119v116c0 39-31 70-70 70h-285c-39 0-70-31-70-70V294zm47 40c24-5 64-20 83-55 5-9 11-14 20-14s17 5 22 12c9 19 30 34 51 34 15 0 29-13 46-34 5-6 11-9 20-9 8 0 14 4 18 11 8 13 39 46 71 54v-39c0-40-31-72-70-72h-190c-40 0-71 32-71 72v40zm0 76c0 13 10 23 23 23h285c15 0 23-10 23-23v-29c-39-5-71-33-90-54-22 21-44 31-66 31-28 0-48-11-69-29-36 36-82 47-106 52v29zm237-305c-19 0-35-17-35-36 0-9 6-28 13-51 4-12 13-17 21-17 9 0 18 6 22 17 7 23 14 42 14 51 0 19-16 36-35 36zm-142 0c-19 0-35-17-35-36 0-9 8-28 15-51 5-12 13-17 21-17 9 0 17 5 20 17 7 23 15 42 15 51 0 19-17 36-36 36z";
const ltr = false;
const accData = null;
const collection = "business-suite-v2";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v2/birthday";
export { pathData, ltr, accData };