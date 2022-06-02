import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";
import { ICON_DOWN } from "../generated/i18n/i18n-defaults.js";

const name = "down";
const pathData = "M506.5 69q5 6 5 16 0 8-4 13l-226 368q-9 14-23 14t-23-14L9.5 98q-7-11-7-20 0-5 1-8 7-14 26-14h453q16 0 24 13zm-75 43h-351l175 286z";
const ltr = false;
const accData = ICON_DOWN;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, accData, collection, packageName });

export default "down";
export { pathData, ltr, accData };