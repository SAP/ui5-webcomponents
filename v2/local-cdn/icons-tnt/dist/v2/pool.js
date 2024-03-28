import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "pool";
const pathData = "M230 102H115v326q0 15 4.5 23.5t7.5 8.5h103V102zm167 0H281v358h105q2 0 6.5-8.5T397 428V102zm-11 409H127q-27 0-45-24t-18-59V83q0-35 18-59t45-24h259q26 0 44 24t18 59v345q0 35-18 59t-44 24z";
const ltr = false;
const accData = null;
const collection = "tnt-v2";
const packageName = "@ui5/webcomponents-icons-tnt";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "tnt-v2/pool";
export { pathData, ltr, accData };