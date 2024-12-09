import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "not-editable";
const pathData = "M504 94q7 7 7 18t-7 18L130 504q-8 8-18 8H26q-11 0-18.5-7.5T0 486v-86q0-9 7-18L381 8q8-8 18-8 12 0 18 8zM363 198l-50-50L62 400l50 50zm86-86l-50-50-50 50 50 50zm56 356q7 7 7 18t-7.5 18.5T486 512q-10 0-18-8l-37-37-38 37q-8 8-18 8-11 0-18.5-7.5T349 486q0-10 8-18l38-37-38-38q-8-8-8-18 0-11 7.5-18.5T375 349q10 0 18 8l38 37 37-37q8-8 18-8 11 0 18.5 7.5T512 375t-7 18l-38 38z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v5/not-editable";
export { pathData, ltr, accData };