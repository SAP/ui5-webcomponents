import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "text-align-right";
const pathData = "M29.5 121q-14 0-21.5-8T.5 92q0-28 29-28h454q28 0 28 28 0 13-7.5 21t-20.5 8h-454zm454 170q28 0 28 28 0 13-7.5 21t-20.5 8h-454q-14 0-21.5-8T.5 319q0-28 29-28h454zm0-114q13 0 20.5 8t7.5 21q0 28-28 28h-227q-13 0-21-7.5t-8-20.5 8-21 21-8h227zm0 227q13 0 20.5 8t7.5 21q0 28-28 28h-227q-13 0-21-7.5t-8-20.5 8-21 21-8h227z";
const ltr = true;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "text-align-right";
export { pathData, ltr, accData };