import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";
import { ICON_SORT_ASCENDING } from "../generated/i18n/i18n-defaults.js";

const name = "sort-ascending";
const pathData = "M222.5 135q8 10 8 19 0 11-7.5 18t-18.5 7-18-7l-33-33v296q0 11-7.5 18.5t-18.5 7.5-18-7.5-7-18.5V139l-33 33q-7 7-18 7T33 172t-7.5-18 7-19l77-76q8-8 18-8t18 8zm59-33q-11 0-18.5-7t-7.5-18 7.5-18.5 18.5-7.5h77q11 0 18 7.5t7 18.5-7 18-18 7h-77zm179 154q11 0 18.5 7.5t7.5 18.5-7.5 18-18.5 7h-179q-11 0-18.5-7t-7.5-18 7.5-18.5 18.5-7.5h179zm-179-51q-11 0-18.5-7.5t-7.5-18.5 7.5-18 18.5-7h128q11 0 18.5 7t7.5 18-7.5 18.5-18.5 7.5h-128z";
const ltr = false;
const accData = ICON_SORT_ASCENDING;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, accData, collection, packageName });

export default "sort-ascending";
export { pathData, ltr, accData };