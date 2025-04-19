import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "aggregator";
const pathData = "M32 288v-64q0-14 9-23t23-9h64q14 0 23 9.5t9 22.5v16h64V128q0-13-9-22.5T192 96h-32v32q0 13-9.5 22.5T128 160H64q-13 0-22.5-9T32 128V64q0-14 9-23t23-9h64q14 0 23 9.5t9 22.5h32q26 0 45 19t19 45v112h64v-80q0-14 9-23t23-9h96q14 0 23 9.5t9 22.5v192q0 13-9.5 22.5T448 384h-96q-13 0-22.5-9t-9.5-23v-80h-64v112q0 26-19 45t-45 19h-32q0 13-9.5 22.5T128 480H64q-13 0-22.5-9T32 448v-64q0-14 9-23t23-9h64q14 0 23 9.5t9 22.5v32h32q14 0 23-9.5t9-22.5V272h-64v16q0 13-9.5 22.5T128 320H64q-13 0-22.5-9T32 288zm96-160V64H64v64h64zm-64 96v64h64v-64H64zm0 160v64h64v-64H64z";
const ltr = false;
const accData = null;
const collection = "tnt-v2";
const packageName = "@ui5/webcomponents-icons-tnt";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "tnt-v2/aggregator";
export { pathData, ltr, accData };