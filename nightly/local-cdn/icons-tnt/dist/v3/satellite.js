import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "satellite";
const pathData = "M223.5 144l-71 71L7.5 71l71-71zm4 228c-14 0-27-5-36-15l-36-36c-10-10-15-23-15-37 0-13 6-26 15-35l194-195c10-10 23-14 36-14s27 4 36 14l36 36c10 10 15 23 15 37 0 13-6 26-15 36l-194 194c-9 10-22 15-36 15zm194-245l-36-37-194 194 36 37zm91 306l-71 72-145-145 71-71zm-357-1c-4 0-9-1-13-3-24-15-44-36-60-60-7-11-3-27 9-34 4-3 10-4 14-4 9 0 17 4 21 12 11 17 26 31 43 42 12 8 15 24 8 36-4 7-13 11-22 11zm-31 77c-4 0-8-1-12-3-45-25-83-62-107-106-7-13-1-28 11-35 4-2 9-3 13-3 9 0 17 4 22 13 20 36 49 66 85 85 13 7 18 23 11 35-4 9-14 14-23 14z";
const ltr = false;
const accData = null;
const collection = "tnt-v3";
const packageName = "@ui5/webcomponents-icons-tnt";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "tnt-v3/satellite";
export { pathData, ltr, accData };