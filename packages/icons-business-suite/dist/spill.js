import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "spill";
const pathData = "M112 0h32l16 32h272q11 0 22 1t20.5 5.5 15.5 14 6 27.5-6 27.5-15.5 14T454 127t-22 1H160l-16 32h-32V0zM64 293q0-15 48-85 48 70 48 85t-12.5 29-35.5 14q-25 0-36.5-14T64 293zm-32 75q13 0 20 5t18 27 18.5 27 23.5 5q8 0 13.5-1t10.5-4 10.5-9.5T160 400q15-23 21.5-27.5T192 368h304v144H18V368h14z";
const ltr = false;
const accData = null;
const collection = "business-suite";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "spill";
export { pathData, ltr, accData };