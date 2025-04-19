import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "message-popup";
const pathData = "M486 512q-10 0-17-7l-95-89H90q-38 0-64-26T0 326V90q0-38 26-64T90 0h332q38 0 64 26t26 64v396q0 11-7.5 18.5T486 512zM90 51q-17 0-28 11T51 90v236q0 17 11 28t28 11h294q11 0 18 7l59 55V90q0-17-11-28t-28-11H90zm166 173q-11 0-18.5-7.5T230 198v-76q0-11 7.5-18.5T256 96t18.5 7.5T282 122v76q0 11-7.5 18.5T256 224zm0 32q13 0 22.5 9.5T288 288t-9.5 22.5T256 320t-22.5-9.5T224 288t9.5-22.5T256 256z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v5/message-popup";
export { pathData, ltr, accData };