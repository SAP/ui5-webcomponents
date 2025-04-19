import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "home";
const pathData = "M451 148q29 26 29 66v208q0 38-26 64t-64 26H122q-38 0-64-26t-26-64V214q0-39 29-66L195 24q26-24 61-24 36 0 61 24zm-22 66q0-16-12-28L282 61q-12-10-26-10t-26 10L96 186q-13 11-13 28v208q0 17 11 28t28 11h38V313q0-24 17-41t41-17h77q23 0 40 17t17 41v148h38q17 0 28-11t11-28V214zm-128 99q0-7-6-7h-77q-7 0-7 7v148h90V313z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v5/home";
export { pathData, ltr, accData };