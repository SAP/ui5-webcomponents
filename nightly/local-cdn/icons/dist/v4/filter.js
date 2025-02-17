import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";
import { ICON_FILTER } from "../generated/i18n/i18n-defaults.js";

const name = "filter";
const pathData = "M306 225q40-45 71-80 13-15 25.5-29.5t22.5-26T448 64H64l6 7q6 8 16 19t22.5 25.5T135 145q31 35 71 80 18 20 18 45v158l64-58V270q0-27 18-45zM448 32q20 0 26 12t6 20q0 9-6 18-12 12-23 26-11 12-23 27t-26 30q-32 36-73 82-9 9-9 23v114l-101 91q-4 5-11 5-6 0-11-4t-5-12V270q0-13-10-23l-72-82q-14-15-27-30t-23-26.5T38 82q-6-9-6-18 0-8 6-20t26-12h384z";
const ltr = false;
const accData = ICON_FILTER;
const collection = "SAP-icons-v4";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, accData, collection, packageName });

export default "SAP-icons-v4/filter";
export { pathData, ltr, accData };