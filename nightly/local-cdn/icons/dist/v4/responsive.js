import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "responsive";
const pathData = "M352 448V256q0-14 9-23t23-9h96q13 0 22.5 9t9.5 23v192q0 14-9.5 23t-22.5 9h-96q-14 0-23-9t-9-23zM128 64q0-14 9-23t23-9h256q13 0 22.5 9t9.5 23v128h-32V64H160v192h128v32H160q-14 0-23-9t-9-23V64zM0 384V160q0-14 9-23t23-9h64v32H32v224h288v32H32q-14 0-23-9.5T0 384zm384 64h96V256h-96v192zm-256 16q0-16 16-16h96q6 0 11 4.5t5 11.5q0 6-5 11t-11 5h-96q-7 0-11.5-5t-4.5-11z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v4";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v4/responsive";
export { pathData, ltr, accData };