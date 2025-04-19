import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "circuit-breaker";
const pathData = "M383.5 409V85c0-20-16-35-36-35h-71v88l58 101c5 9 3 23-7 28-2 1-6 3-10 3-7 0-14-3-18-10l-61-106c-2-4-2-8-2-12V50h-72c-20 0-35 15-35 35v324c0 20 15 35 35 35h72V341c0-10 9-20 20-20 10 0 20 10 20 20v103h71c20 0 36-15 36-35zM164.5 9h183c43 0 76 33 76 76v324c0 43-33 76-76 76h-183c-43 0-76-33-76-76V85c0-43 33-76 76-76z";
const ltr = false;
const accData = null;
const collection = "business-suite-v1";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v1/circuit-breaker";
export { pathData, ltr, accData };