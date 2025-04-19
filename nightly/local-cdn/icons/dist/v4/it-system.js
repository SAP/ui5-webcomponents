import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "it-system";
const pathData = "M224 160H64v288h160V160zm0-32q13 0 23 9 9 9 9 23v288q0 14-9 23-10 9-23 9H64q-14 0-23-9t-9-23V160q0-14 9-23t23-9h160zM112 416q-16 0-16-16t16-16h64q16 0 16 16t-16 16h-64zm48-160q-14 0-23-9t-9-23 9-23 23-9 23 9 9 23-9 23-23 9zm160 48q0-16 16-16h64q16 0 16 16t-16 16h-64q-16 0-16-16zM448 32q13 0 23 9 9 9 9 23v288q0 14-9 23-10 9-23 9H288v-32h160V64H288v32h-32V64q0-14 9-23t23-9h160zm-32 96q0 14-9 23t-23 9-23-9-9-23 9-23 23-9 23 9 9 23z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v4";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v4/it-system";
export { pathData, ltr, accData };