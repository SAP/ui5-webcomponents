import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "fixed-cell";
const pathData = "M420 234c19 11 27 28 27 50v170c0 13-5 25-18 38-11 13-24 19-36 19H119c-10 0-19-3-27-7-6-4-13-10-19-17-5-8-8-19-8-33V284c0-13 3-24 8-32 6-8 13-14 19-18 8-4 17-7 27-7V114c0-42 35-82 71-99 17-10 40-14 68-14 50 0 115 16 128 73 5 14 7 27 7 40v113c10 0 19 3 27 7zm-82-7V114c0-12-2-23-9-33-5-6-13-12-24-17-11-4-27-7-47-7-30 0-52 6-72 29-2 4-5 9-7 13s-4 9-5 15v113h164z";
const ltr = false;
const accData = null;
const collection = "business-suite-v1";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v1/fixed-cell";
export { pathData, ltr, accData };