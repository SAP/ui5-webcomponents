import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "port";
const pathData = "M64 32h384c19 0 32 13 32 32v384c0 19-13 32-32 32H64c-19 0-32-13-32-32V64c0-19 13-32 32-32zm384 416V64H64v384h384zM317 149l95 96c5 7 5 17 0 22l-96 96c-3 3-7 5-11 5-5 0-9-2-12-5s-5-7-5-10c0-1 0-7 5-12l79-79c2-2 3-4 3-6s-1-4-3-5l-78-80c-7-7-7-15 0-22 3-3 7-5 11-5 3 0 7 2 12 5zM140 262l79 79c5 5 5 11 5 12 0 3-2 7-5 10s-7 5-12 5c-4 0-8-2-11-5l-95-96c-7-5-7-15 0-22l95-96c3-3 6-5 11-5s8 2 11 5c7 7 7 15 0 22l-78 80c-2 1-3 3-3 5s1 4 3 6z";
const ltr = false;
const accData = null;
const collection = "tnt-v3";
const packageName = "@ui5/webcomponents-icons-tnt";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "tnt-v3/port";
export { pathData, ltr, accData };