import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "recycle";
const pathData = "M271 410l60-102 1 18v21c0 3 4 3 5 3h108c7 0 12 0 15-1 5-1 15-2 32-13l-70 122c-4 5-10 11-21 12h-63c-3 0-6 0-6 3v39zM211 17h140c9 1 16 5 21 12 6 8 32 51 32 54 1 3 3 5 4 5s1 0 2-1l33-19-58 104-118-1c4-2 34-21 34-21 1-1 2-1 2-2s-1-2-2-3l-47-82c-10-20-24-35-43-46zM3 193l119-1 58 102-17-9c-8-4-17-9-18-9h-1c-1 0-2 1-3 2l-47 82c-13 17-19 39-19 60L5 298c-1-4-2-8-2-11 0-4 1-8 2-12 5-7 31-54 31-55 1-2 2-3 2-4s-1-2-2-3-10-6-18-11zm184 6L82 138l56-97c3-7 21-18 44-18 35 0 62 33 70 65zm-54 273c-11 0-45-22-45-59 0-19 7-35 15-46 4-7 9-13 14-18h128v123H133zm277-136l-64-111 106-62 56 97c3 4 3 13 3 14 0 13-8 41-31 55-15 8-29 11-42 11-7 0-13-1-20-2-3-1-5-1-8-2z";
const ltr = false;
const accData = null;
const collection = "business-suite-v1";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v1/recycle";
export { pathData, ltr, accData };