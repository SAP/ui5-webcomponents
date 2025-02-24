import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "indent";
const pathData = "M58 365q-11 0-18.5-7.5T32 339t7-18l59-59-59-58q-7-7-7-18t7.5-18.5T58 160t18 7l77 77q7 9 7 18 0 10-7 19l-77 76q-8 8-18 8zm396 64q11 0 18.5 7t7.5 18-7.5 18.5T454 480H58q-11 0-18.5-7.5T32 454t7.5-18 18.5-7h396zm0-96q11 0 18.5 7t7.5 18-7.5 18.5T454 384H282q-11 0-18.5-7.5T256 358t7.5-18 18.5-7h172zM58 83q-11 0-18.5-7T32 58t7.5-18.5T58 32h396q11 0 18.5 7.5T480 58t-7.5 18-18.5 7H58zm396 45q11 0 18.5 7.5T480 154t-7.5 18-18.5 7H282q-11 0-18.5-7t-7.5-18 7.5-18.5T282 128h172zm0 109q11 0 18.5 7t7.5 18-7.5 18.5T454 288H282q-11 0-18.5-7.5T256 262t7.5-18 18.5-7h172z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v5/indent";
export { pathData, ltr, accData };