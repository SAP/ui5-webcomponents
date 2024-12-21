import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "parts";
const pathData = "M32 263V155c0-15 12-27 27-27h87c-5-11-8-21-8-32 0-1-2-16 10-34 11-18 33-30 58-30 23 0 42 14 53 33 11 20 9 32 9 35 0 9-3 19-8 28h87c15 0 27 12 27 27v98c13-9 26-14 41-14 31 0 57 21 64 52 1 5 1 9 1 14 0 16-5 30-15 42-13 17-29 25-50 25-15 0-29-5-41-15v96c0 15-12 27-27 27H59c-15 0-27-12-27-27V328c0-3 2-6 5-7h2c4 0 6 1 7 3 10 15 24 23 42 23 15 0 28-6 39-19 7-9 11-20 11-32 0-4 0-8-1-12-5-24-25-40-49-40-19 0-33 8-42 23-1 2-3 3-7 3h-2c-3-1-5-4-5-7z";
const ltr = false;
const accData = null;
const collection = "tnt-v3";
const packageName = "@ui5/webcomponents-icons-tnt";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "tnt-v3/parts";
export { pathData, ltr, accData };