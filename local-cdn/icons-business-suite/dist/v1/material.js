import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "material";
const pathData = "M294 512l-107-51v-40l107 50 182-90V133L294 43l-28 14-41-21 69-34 218 110v290zM108 97l77-40 219 109v109l-37 18V188L185 98l-36 18zM42 237L1 167l67-8v40h32v-40l66 8-41 70H42zm0 42v-10h83v10l-13 23v57l13 13-13 11v41l13 12-13 12v22l-28 42-29-42v-54l-13-12 13-13v-40l-13-12 13-12v-25zm374 87l-70 33v-45l70-34v46z";
const ltr = false;
const accData = null;
const collection = "business-suite-v1";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v1/material";
export { pathData, ltr, accData };