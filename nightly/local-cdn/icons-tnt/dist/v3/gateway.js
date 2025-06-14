import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "gateway";
const pathData = "M258.625 512c-22 0-42-8-58-24l-170-170c-33-33-33-83 0-116l170-170c16-16 37-24 58-24 20 0 41 8 57 24l170 170c33 33 33 83 0 116l-170 170c-15 16-36 24-57 24zm0-449c-7 0-14 2-20 8l-170 170c-5 5-8 12-8 19s3 13 8 19l170 170c6 5 13 8 19 8 7 0 13-3 19-8l170-170c6-6 9-12 9-19s-3-14-9-19l-170-170c-5-6-12-8-18-8z";
const ltr = false;
const accData = null;
const collection = "tnt-v3";
const packageName = "@ui5/webcomponents-icons-tnt";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "tnt-v3/gateway";
export { pathData, ltr, accData };