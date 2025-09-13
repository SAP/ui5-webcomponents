import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "check-availability";
const pathData = "M390 64q38 0 64 26t26 64v204q0 11-7.5 18.5T454 384t-18-7.5-7-18.5V256h-19q-11 0-18.5-7.5T384 230t7.5-18 18.5-7h19v-51q0-17-11-28t-28-11h-6v19q0 11-7.5 18.5T358 160t-18-7.5-7-18.5v-19H179v19q0 11-7 18.5t-18 7.5-18.5-7.5T128 134v-19h-6q-17 0-28 11t-11 28v51h19q11 0 18.5 7t7.5 18-7.5 18.5T102 256H83v166q0 17 11 28t28 11h172q11 0 18.5 7t7.5 18-7.5 18.5T294 512H122q-38 0-64-26t-26-64V154q0-38 26-64t64-26h6V26q0-11 7.5-18.5T154 0t18 7.5 7 18.5v38h154V26q0-11 7-18.5T358 0t18.5 7.5T384 26v38h6zm83 404q7 7 7 18t-7.5 18.5T454 512t-18-7L331 399q-28 17-59 17-22 0-42.5-9t-36-24.5-24.5-36-9-42.5q0-23 9-43.5t24.5-35.5 36-24 42.5-9q23 0 43.5 9t35.5 24 24 35.5 9 43.5q0 31-17 59zM272 365q24 0 42.5-18.5T333 304t-18.5-42.5T272 243t-42.5 18.5T211 304t18.5 42.5T272 365z";
const ltr = true;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v5/check-availability";
export { pathData, ltr, accData };