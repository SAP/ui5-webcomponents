import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "heart";
const pathData = "M360 10c103 0 138 99 138 166 0 85-61 167-121 229-35 37-75 71-120 104-45-33-86-67-121-104C75 344 16 260 16 176c0-67 34-166 137-166 35 0 61 17 78 33 10 10 19 21 26 33 7-12 16-23 26-33 17-16 42-33 77-33zM257 443c32-32 61-63 86-92 42-50 86-108 86-141 0-48 0-135-69-135-44 0-70 34-85 67-9 20-15 42-19 67-4-25-10-47-19-67-15-33-41-67-84-67-69 0-69 87-69 135 0 33 44 91 86 141 25 29 54 60 87 92z";
const ltr = false;
const accData = null;
const collection = "business-suite-v1";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v1/heart";
export { pathData, ltr, accData };