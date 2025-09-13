import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "supplier";
const pathData = "M128 320H96q1-35 11.5-59.5t28-39.5 40.5-22 48-7h32q-40 0-68-28t-28-68 28-68 68-28 68 28 28 68-28 68-68 28h32q27 0 50 6.5t40.5 21.5 27.5 39.5 10 60.5h-32v-32q0-11-7.5-22.5T356 245t-30.5-15-37.5-6h-64q-20 0-37.5 6T156 245t-20.5 20.5T128 288v32zm0 32h256v160H128V352zm128-192q27 0 45.5-19T320 96t-18.5-45T256 32q-26 0-45 19t-19 45 19 45 45 19zM80 352h16v96H80q-20 0-34-14t-14-34 14-34 34-14zm336 0h16q20 0 34 14t14 34-14 34-34 14h-16v-96zm-160-32v-32h96v32h-96z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v4";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v4/supplier";
export { pathData, ltr, accData };