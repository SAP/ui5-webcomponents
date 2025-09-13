import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "add-calendar";
const pathData = "M96 64v32h32V64H96zm224 0v32h32V64h-32zM32 128v352h224v32H32q-14 0-23-9t-9-23V64q0-14 9-23t23-9h64V0h32v32h192V0h32v32h64q14 0 23 9t9 23v128h-32v-64H32zm64 64q14 0 23 9t9 23-9 23-23 9-23-9-9-23 9-23 23-9zm128 0q14 0 23 9t9 23-9 23-23 9-23-9-9-23 9-23 23-9zm96 32q0-14 9-23t23-9 23 9 9 23-9 23-23 9-23-9-9-23zM96 320q14 0 23 9t9 23-9 23-23 9-23-9-9-23 9-23 23-9zm128 0q14 0 23 9t9 23-9 23-23 9-23-9-9-23 9-23 23-9zm192 64h96v32h-96v96h-32v-96h-96v-32h96v-96h32v96z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v4";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v4/add-calendar";
export { pathData, ltr, accData };