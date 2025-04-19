import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "task";
const pathData = "M390 64q24 0 41 17t17 41v332q0 24-17 41t-41 17H122q-24 0-41-17t-17-41V122q0-24 17-41t41-17h38v-6q0-24 17-41t41-17h76q24 0 41 17t17 41v6h38zM211 86q0 7 7 7h76q7 0 7-7V58q0-7-7-7h-76q-7 0-7 7v28zm186 36q0-7-7-7h-46q-8 13-20.5 21t-29.5 8h-76q-17 0-29.5-8T168 115h-46q-7 0-7 7v332q0 7 7 7h268q7 0 7-7V122zm-71 102q11 0 18.5 7.5T352 250q0 8-6 16l-94 109q-7 9-19 9-11 0-19-8l-47-52q-7-7-7-17 0-11 7.5-18.5T186 281q10 0 19 9l27 30 75-87q8-9 19-9z";
const ltr = true;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v5/task";
export { pathData, ltr, accData };