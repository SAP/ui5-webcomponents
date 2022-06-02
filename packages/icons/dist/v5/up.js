import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";
import { ICON_UP } from "../generated/i18n/i18n-defaults.js";

const name = "up";
const pathData = "M254 137L79 423h351zm253 329q-10 14-26 14H28q-9 0-16-4.5T2 466q-3-8-1-15t7-14L235 68q3-6 9.5-10t12.5-4q13 0 23 14l227 369q10 14 0 29z";
const ltr = false;
const accData = ICON_UP;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, accData, collection, packageName });

export default "up";
export { pathData, ltr, accData };