import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";
import { ICON_DECLINE } from "../generated/i18n/i18n-defaults.js";

const name = "decline";
const pathData = "M292 256l117 117q7 7 7 18t-7 18-19 7q-11 0-18-7L256 293 140 409q-7 7-18 7-12 0-19-7t-7-18 7-18l117-117-117-116q-7-7-7-18t7-18q8-8 19-8 10 0 18 8l116 116 116-116q8-8 18-8 11 0 19 8 7 7 7 18t-7 18z";
const ltr = false;
const accData = ICON_DECLINE;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, accData, collection, packageName });

export default "decline";
export { pathData, ltr, accData };