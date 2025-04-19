import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "gis-layer";
const pathData = "M455 270l35 26c6 5 9 11 9 20s-3 16-10 20L270 485c-3 3-8 4-14 4s-11-1-14-4L23 336c-7-4-11-11-11-20 0-8 3-15 10-20l34-25-33-23c-7-5-11-11-11-19 0-9 3-15 9-20l85-69c1-1 3-1 4-2C115 61 178 0 256 0s141 61 146 138c1 1 3 1 4 2l85 69c6 5 9 11 9 20 0 8-4 14-11 19zM352 130c-7-41-39-73-82-80-15 31-23 63-23 96 36 1 70-5 105-16zm-154 10c1-28 6-55 15-81-28 15-48 40-53 71 13 4 25 7 38 10zm149 43c-31 8-62 12-95 12 3 15 9 31 18 48 35-5 64-28 77-60zm-145 7c-12-3-25-4-37-7 9 23 25 40 48 51-5-15-8-29-11-44zm232 36l-39-32c-20 59-75 99-139 99s-119-40-139-99l-39 32 178 121zM99 300l-20 15 177 120 177-120-20-15-143 97c-3 3-8 4-14 4s-11-1-14-4z";
const ltr = false;
const accData = null;
const collection = "business-suite-v2";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v2/gis-layer";
export { pathData, ltr, accData };