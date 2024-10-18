import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "insurance-car";
const pathData = "M288 384q16 0 16 16t-16 16-16-16 16-16zm128 0q16 0 16 16t-16 16-16-16 16-16zm80 102q0 11-7.5 18.5T470 512h-12q-11 0-18.5-7.5T432 486v-6H272v6q0 11-7.5 18.5T246 512h-12q-11 0-18.5-7.5T208 486V354q0-4 1-6l21-89q7-17 21-26t31-9h138q17 0 31.5 9.5T472 259l23 88q1 2 1 7v132zm-51-57v-74H259v74h186zM282 275q-3 0-3 2l-7 26h159l-7-26q-2-2-4-2H282zM68 201v260h51q11 0 18 7t7 18-7 18.5-18 7.5H42q-11 0-18-7.5T17 486V192q0-10 6-17L165 9q8-9 20-9h190q11 0 18.5 7.5T401 26v109q0 11-7.5 18.5T375 161t-18.5-7.5T349 135V51H196l-20 24v66q0 21-15 36t-36 15H76z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v5/insurance-car";
export { pathData, ltr, accData };