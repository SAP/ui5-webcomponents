import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "attachment-video";
const pathData = "M128 256q0-18 9-32.5t23-22.5q14-9 32-9h128q19 0 32 9 14 8 23 22.5t9 32.5v5l80-65q7-4 16-4 13 0 22.5 9t9.5 23v174q0 14-9.5 23t-22.5 9q-8 0-16-5l-81-68q-3 34-31 50-13 9-32 9H192q-26 0-45-19t-19-45v-96zm0-256h224q13 0 22.5 9t9.5 23v96h-32V32H160v96q0 14-9.5 23t-23.5 9H32v320h320v-32h32v32q0 14-9 23t-23 9H32q-14 0-23-9t-9-23V128zm32 352q0 13 9 22.5t23 9.5h128q14 0 23-9.5t9-22.5v-96q0-14-9-23t-23-9H192q-14 0-23 9t-9 23v96zm224-50v14l96 82V224z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v4";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v4/attachment-video";
export { pathData, ltr, accData };