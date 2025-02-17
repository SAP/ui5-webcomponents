import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";
import { ICON_GENERATE_SHORTCUT } from "../generated/i18n/i18n-defaults.js";

const name = "generate-shortcut";
const pathData = "M112 290q2-1 2.5-1t2.5-1l-57-1q-7-1-11-5t-4-10v-2q0-6 4.5-10t9.5-4h86q31 4 31 35l-9 84q0 15-16 15-7-1-11-5.5t-4-9.5v-2l5-58q-18 8-35 18t-30 22-20.5 27-7.5 34 6 31.5 16.5 19T94 476t28 4q15 0 15 16t-16 16l-14-1q-16 0-32.5-5.5t-29.5-17T24 459t-8-43 10-45.5T51 334t31.5-27 29.5-17zM80 32h384q14 0 23 9.5t9 22.5v384q0 14-9 23t-23 9H208v-32h256V160H80v32H48V64q0-13 9.5-22.5T80 32z";
const ltr = false;
const accData = ICON_GENERATE_SHORTCUT;
const collection = "SAP-icons-v4";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, accData, collection, packageName });

export default "SAP-icons-v4/generate-shortcut";
export { pathData, ltr, accData };