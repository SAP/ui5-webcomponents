import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";
import { ICON_FILTER } from "../generated/i18n/i18n-defaults.js";

const name = "filter";
const pathData = "M447.897 32q20 0 28.5 17t-2.5 33q-12 12-23 26-11 12-23 27t-26 30q-32 36-73 82-9 9-9 23v114l-101 91q-4 5-11 5-6 0-11-4t-5-12V270q0-13-10-23l-72-82q-14-15-27-30t-23-26.5-16-19l-6-7.5q-11-16-2.5-33t28.5-17h384zm-142 193q40-45 71-80 13-15 25.5-29.5t22.5-26 16.5-18.5l6.5-7h-384l6 7.5 16 18.5 22.5 25.5 26.5 29.5q31 35 71 80 18 20 18 45v158l64-58V270q0-27 18-45z";
const ltr = false;
const accData = ICON_FILTER;
const collection = "SAP-icons-v4";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, accData, collection, packageName });

export default "SAP-icons-v4/filter";
export { pathData, ltr, accData };