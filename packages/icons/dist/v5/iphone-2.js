import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";
import { ICON_IPHONE } from "../generated/i18n/i18n-defaults.js";

const name = "iphone-2";
const pathData = "M435 64q33 0 55 22t22 55v214q-4 29-26 48t-51 19H78q-33 0-55-22.5T1 345V141q0-33 22-55t55-22h357zm0 307q12 0 19-7.5t7-18.5v-15q0-16-15-23l-23-11q-6-4-11-9.5t-5-13.5v-51q0-16 16-23l23-10q5-4 10-9.5t5-13.5v-25q0-26-26-26H78q-26 0-26 26v204q0 11 7 18.5t19 7.5h357z";
const ltr = false;
const accData = ICON_IPHONE;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, accData, collection, packageName });

export default "iphone-2";
export { pathData, ltr, accData };