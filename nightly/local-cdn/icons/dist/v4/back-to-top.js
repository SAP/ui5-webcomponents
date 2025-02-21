import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";
import { ICON_BACK_TO_TOP } from "../generated/i18n/i18n-defaults.js";

const name = "back-to-top";
const pathData = "M480 0q14 0 23 9.5t9 22.5q0 14-9 23t-23 9H32q-14 0-23-9T0 32Q0 19 9 9.5T32 0h448zm-98 239q6 5 6 11t-6 12q-6 5-12 5-5 0-11-5l-87-87v321q0 16-16 16t-16-16V177l-85 85q-5 5-11 5t-11-5q-6-6-6-11 0-6 6-12l102-101q10-9 16.5-9.5t7.5-.5q11 0 21 10z";
const ltr = false;
const accData = ICON_BACK_TO_TOP;
const collection = "SAP-icons-v4";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, accData, collection, packageName });

export default "SAP-icons-v4/back-to-top";
export { pathData, ltr, accData };