import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "select";
const pathData = "M358.5 255l143 141c7 7 10 15 10 26 0 10-3 19-10 26l-53 51c-7 7-15 11-25 11s-18-3-26-11l-141-141v69c0 25-22 47-47 47-8 0-16-2-23-7-8-4-13-9-17-17l-2-5c-24-60-46-117-67-171-9-23-19-46-28-70-10-25-18-48-27-70s-17-43-25-62c-7-19-13-35-19-49-2-5-1-11 3-16s9-7 15-7c2 0 4 0 6 1 14 4 30 10 48 17 19 7 40 16 63 24 22 9 45 18 69 27 80 30 161 62 240 94l3 1c10 5 18 12 22 22 5 10 6 21 3 32-4 20-24 37-45 37h-70z";
const ltr = false;
const accData = null;
const collection = "tnt-v3";
const packageName = "@ui5/webcomponents-icons-tnt";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "tnt-v3/select";
export { pathData, ltr, accData };