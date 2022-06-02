import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";
import { ICON_SORT_DESCENDING } from "../generated/i18n/i18n-defaults.js";

const name = "sort-descending";
const pathData = "M186.5 340q7-7 18-7t18.5 7 7.5 18-8 19l-77 76q-6 8-18 8-10 0-18-8l-77-76q-7-7-7-19 0-11 7.5-18t18.5-7 18 7l33 33V77q0-11 7-18.5t18-7.5 18.5 7.5 7.5 18.5v296zm172-84q11 0 18 7.5t7 18.5-7 18-18 7h-77q-11 0-18.5-7t-7.5-18 7.5-18.5 18.5-7.5h77zm102-205q11 0 18.5 7.5t7.5 18.5-7.5 18-18.5 7h-179q-11 0-18.5-7t-7.5-18 7.5-18.5 18.5-7.5h179zm-51 103q11 0 18.5 7t7.5 18-7.5 18.5-18.5 7.5h-128q-11 0-18.5-7.5t-7.5-18.5 7.5-18 18.5-7h128z";
const ltr = false;
const accData = ICON_SORT_DESCENDING;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, accData, collection, packageName });

export default "sort-descending";
export { pathData, ltr, accData };