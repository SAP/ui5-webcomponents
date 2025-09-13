import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "opportunity";
const pathData = "M0 160q0-14 9-23t23-9h192v32H32v212l36-37q-4-7-4-15 0-14 9-23t23-9 23 9 9 23q0 11-4 15l53 53q7-4 15-4l46-102q-14-9-14-26 0-14 9-23t23-9 23 9 9 23q0 12-9 23l39 105q11 0 19 5l52-50q10-10 19-18.5t17-16.5l16-16q6 0 7 4v188q0 14-9 23t-23 9H32q-14 0-23-9t-9-23V160zm32 320h384V335l-68 66q4 4 4 15 0 14-9 23t-23 9-23-9-9-23q0-17 15-27l-38-102q-1 1-9 1h-3l-45 100q16 10 16 28 0 14-9 23t-23 9-23-9-9-23q0-9 5-17l-52-52q-8 5-17 5t-17-5l-47 48v85zM377 96l26-79 26 79h83l-68 49 26 79-67-49-68 49 26-79-67-49h83z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v4";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v4/opportunity";
export { pathData, ltr, accData };