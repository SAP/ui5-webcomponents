import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "attachment";
const pathData = "M183.5 512q-31 0-59-12t-48-33-32-49-12-59q0-66 56-122l204-205q15-16 36.5-24t44.5-8q24 0 43.5 9t33.5 24T472 68.5t7.5 43.5q0 24-8.5 44t-22.5 34l-163 165q-17 17-33 23t-29 6q-27 0-45.5-17.5T159.5 320q0-32 30-62l119-122q8-8 18-8 11 0 18 7.5t7 18.5-7 18l-126 129q-10 9-10 16 0 8 5.5 12t10.5 4q6 0 13-4.5t12-9.5l164-166q15-15 15-41t-15-43.5-41-17.5-44 16l-204 207q-41 41-41 86 0 21 8 39t21.5 32 31.5 22 39 8q23 0 44-10.5t43-30.5l166-157q7-7 18-7t18.5 7.5 7.5 18.5q0 10-8 18l-167 157q-28 26-58 40.5t-64 14.5z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v5/attachment";
export { pathData, ltr, accData };