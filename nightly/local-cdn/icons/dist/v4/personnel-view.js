import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "personnel-view";
const pathData = "M352 512H32v-64q0-26 10-49.5t27.5-41 41-27.5 49.5-10h32q-40 0-68-28t-28-68 28-68 68-28 68 28 28 68-28 68-68 28h32q26 0 49.5 10t41 27.5 27.5 41 10 49.5v64zM64 448v32h256v-32q0-40-28-68t-68-28h-64q-40 0-68 28t-28 68zm64-416h320q14 0 23 9t9 23v352q0 14-9 23t-23 9h-64v-32h64V64H128v32H96V64q0-14 9-23t23-9zm0 192q0 26 19 45t45 19 45-19 19-45-19-45-45-19-45 19-19 45z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v4";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v4/personnel-view";
export { pathData, ltr, accData };