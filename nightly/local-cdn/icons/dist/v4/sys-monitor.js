import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "sys-monitor";
const pathData = "M480 32q14 0 23 9t9 23v320q0 13-9 22.5t-23 9.5H32q-13 0-22.5-9.5T0 384V64q0-14 9.5-23T32 32h448zm0 32H32v320h448V64zM368 448q16 0 16 16 0 6-4.5 11t-11.5 5H144q-6 0-11-5t-5-11q0-7 5-11.5t11-4.5h224z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v4";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v4/sys-monitor";
export { pathData, ltr, accData };