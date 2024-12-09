import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "select";
const pathData = "M502 396q10 10 10 26t-10 26l-53 51q-6 5-11.5 8t-13.5 3q-15 0-26-11L257 358v69q0 19-14 33-13 14-33 14-13 0-23-7-11-6-17-17l-2-5q-18-45-34.5-87.5T101 274q-7-17-14-34.5T73 204q-8-19-14-36t-13-34-13-32.5T21 72q-5-14-9.5-26T2 23q-3-8 3-16 6-7 15-7 4 0 5 1 11 3 23 8t26 10 30 11 33 12q33 13 69 27 18 7 35.5 14T276 97q41 15 83 31.5t87 34.5l2 1h1q16 8 22 22 6 13 3 32-3 15-16 26t-29 11h-70z";
const ltr = false;
const accData = null;
const collection = "tnt-v2";
const packageName = "@ui5/webcomponents-icons-tnt";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "tnt-v2/select";
export { pathData, ltr, accData };