import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "currency";
const pathData = "M455 96q23 0 40 17t17 40v205q0 24-17 41t-40 17H58q-24 0-41-17T0 358V153q0-23 17-40t41-17h397zm-39 269q0-19 13-32t32-13V192q-19 0-32-13t-13-32H96q0 19-13 32t-32 13v128q19 0 32 13t13 32h320zm-160-45q-26 0-45-19t-19-45 19-45 45-19 45 19 19 45-19 45-45 19zm-109-71q0 11-7 18.5t-18 7.5-18.5-7.5T96 249t7.5-18 18.5-7 18 7 7 18zm269 0q0 11-7 18.5t-18 7.5-18.5-7.5T365 249t7.5-18 18.5-7 18 7 7 18zm-160 20q13 0 13-13t-13-13-13 13 13 13z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v5/currency";
export { pathData, ltr, accData };