import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "cross-order";
const pathData = "M35 474c-6-6-6-16 0-22L455 32c3-3 7-5 11-5s8 2 11 5c6 6 6 16 0 22L57 474c-3 3-7 4-11 4s-8-1-11-4zm346-206h-74l31-31h43v-16c0-17 14-31 31-31h63c17 0 31 14 31 31v63c0 17-14 31-31 31h-63c-17 0-31-14-31-31v-16zM6 284v-63c0-17 14-31 31-31h63c17 0 31 14 31 31v16h74l-31 31h-43v16c0 17-14 31-31 31H37c-17 0-31-14-31-31z";
const ltr = false;
const accData = null;
const collection = "business-suite-v1";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v1/cross-order";
export { pathData, ltr, accData };