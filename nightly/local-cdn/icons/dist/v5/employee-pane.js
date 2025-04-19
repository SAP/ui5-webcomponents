import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "employee-pane";
const pathData = "M390 480H122q-38 0-64-26t-26-64V122q0-38 26-64t64-26h268q38 0 64 26t26 64v268q0 38-26 64t-64 26zM122 83q-17 0-28 11t-11 28v268q0 17 11 28t28 11h268q17 0 28-11t11-28V122q0-17-11-28t-28-11H122zm134 141q-20 0-34-14t-14-34 14-34 34-14 34 14 14 34-14 34-34 14zm102 160H154q-11 0-18.5-8.5T128 353q0-25 20.5-45t49.5-20h116q29 0 49.5 20t20.5 45q0 14-7.5 22.5T358 384z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v5/employee-pane";
export { pathData, ltr, accData };