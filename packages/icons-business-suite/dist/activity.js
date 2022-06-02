import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "activity";
const pathData = "M5.5 106h501v286H5.5V106zm31 255h439V138h-439v223zm407-32h-375V168h375v161z";
const ltr = false;
const accData = null;
const collection = "business-suite";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "activity";
export { pathData, ltr, accData };