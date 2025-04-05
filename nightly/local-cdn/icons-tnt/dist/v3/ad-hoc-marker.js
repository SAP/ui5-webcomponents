import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "ad-hoc-marker";
const pathData = "M459 169h41c7 0 11 5 11 9v5c0 35-9 85-36 110-11 12-22 21-38 25-14 5-27 7-43 7-11 0-23 0-32-2-11-2-22-5-33-7-36-12-52-19-86-36-23-11-45-20-66-32-18-9-38-13-58-13-46 0-56 41-59 79-2 7-5 9-11 9H8c-7 0-9-5-9-11 0-77 35-145 120-145 11 0 22 0 34 2 9 3 20 5 31 9 9 3 23 7 36 14 12 7 27 13 45 20 25 14 48 23 70 32 21 7 41 13 59 13 46 0 53-42 56-79 0-4 3-9 9-9z";
const ltr = false;
const accData = null;
const collection = "tnt-v3";
const packageName = "@ui5/webcomponents-icons-tnt";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "tnt-v3/ad-hoc-marker";
export { pathData, ltr, accData };