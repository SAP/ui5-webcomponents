import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "data";
const pathData = "M320 0l128 128v352q0 14-9.5 23t-23.5 9H95q-14 0-22.5-9T64 480V32q0-14 9-23t23-9h224zm96 480V160h-96q-14 0-23-9t-9-23V32H96l-1 448h321z";
const ltr = false;
const accData = null;
const collection = "tnt-v2";
const packageName = "@ui5/webcomponents-icons-tnt";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "tnt-v2/data";
export { pathData, ltr, accData };