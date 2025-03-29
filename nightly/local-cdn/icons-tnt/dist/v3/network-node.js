import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "network-node";
const pathData = "M256 512C115 512 0 397 0 255 0 114 115 0 256 0s256 114 256 255c0 142-115 257-256 257zm0-461C143 51 51 143 51 255c0 114 92 205 205 205s205-91 205-205c0-112-92-204-205-204zm1 180c-10 0-19-8-19-19v-70l-30 29c-3 4-8 6-13 6s-10-2-14-6c-7-7-7-20 0-27l62-63c4-4 9-5 14-5s11 1 14 5l63 63c7 7 7 20 0 27-5 4-10 6-14 6-5 0-10-3-14-6l-30-30v71c0 11-8 19-19 19zm119 152h-89c-11 0-19-9-19-19 0-11 8-20 19-20h42l-50-49c-8-8-8-20 0-28 8-7 20-7 27 0l50 50v-41c0-11 8-20 20-20 10 0 18 9 18 20v88c0 10-8 19-18 19zm-151 3h-88c-10 0-19-9-19-19v-88c0-11 9-20 19-20 11 0 19 9 19 20v42l50-50c4-4 8-6 13-6s10 2 14 6c8 7 7 19 0 26l-49 50h41c11 0 19 9 19 20 0 10-8 19-19 19z";
const ltr = false;
const accData = null;
const collection = "tnt-v3";
const packageName = "@ui5/webcomponents-icons-tnt";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "tnt-v3/network-node";
export { pathData, ltr, accData };