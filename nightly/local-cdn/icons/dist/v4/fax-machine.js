import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "fax-machine";
const pathData = "M0 96q0-14 9-23t23-9h64q14 0 23 9t9 23v320q0 14-9 23t-23 9H32q-14 0-23-9t-9-23V96zm0 384h480V224H160v-32h320q14 0 23 9t9 23v256q0 14-9 23t-23 9H32q-14 0-23-9t-9-23zm192-320V32q0-14 9-23t23-9h160l96 96v64h-32v-32h-63q-14 0-23.5-9T352 96V32H224v128h-32zm192 128q0-14 9-23t23-9 23 9 9 23-9 23-23 9-23-9-9-23zm32 64q14 0 23 9t9 23-9 23-23 9-23-9-9-23 9-23 23-9zm-224-64q0-14 9-23t23-9 23 9 9 23-9 23-23 9-23-9-9-23zm32 64q14 0 23 9t9 23-9 23-23 9-23-9-9-23 9-23 23-9zm64 32q0-14 9-23t23-9 23 9 9 23-9 23-23 9-23-9-9-23zm32-128q14 0 23 9t9 23-9 23-23 9-23-9-9-23 9-23 23-9z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v4";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v4/fax-machine";
export { pathData, ltr, accData };