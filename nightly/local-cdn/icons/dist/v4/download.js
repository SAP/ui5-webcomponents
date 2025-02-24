import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";
import { ICON_DOWNLOAD } from "../generated/i18n/i18n-defaults.js";

const name = "download";
const pathData = "M480 448q13 0 22.5 9.5T512 480q0 14-9.5 23t-22.5 9H32q-14 0-23-9t-9-23q0-13 9-22.5t23-9.5h448zm-200-74q-10 10-21 10-1 0-7.5-.5T235 374L133 273q-6-6-6-12t6-11q6-6 11-6 6 0 11 6l85 85V16q0-16 16-16t16 16v321l87-87q6-6 11-6 6 0 12 6t6 12q0 5-6 11z";
const ltr = false;
const accData = ICON_DOWNLOAD;
const collection = "SAP-icons-v4";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, accData, collection, packageName });

export default "SAP-icons-v4/download";
export { pathData, ltr, accData };