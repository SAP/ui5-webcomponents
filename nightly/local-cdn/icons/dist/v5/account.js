import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "account";
const pathData = "M320 128q0 26-11 51t-31 44l8 4q15 7 15 24 0 10-6.5 17t-17.5 7q-9 0-20-6-10-5-26-9t-33-4h-12q-28 0-52.5 10.5t-43 28.5-29 42.5T51 390v7h179q11 0 18.5 7t7.5 18-7.5 18.5T230 448H26q-11 0-18.5-7.5T0 422v-32q0-56 29-100.5t77-66.5l-5-5q-37-37-37-90 0-27 10-50t27.5-40.5 41-27.5T192 0t49.5 10 41 27.5 27.5 41 10 49.5zm166 247q11 0 18.5 7t7.5 18-7.5 18.5T486 426H346q-11 0-18.5-7.5T320 400t7.5-18 18.5-7h140zm-140-23q-11 0-18.5-7.5T320 326t7.5-18 18.5-7h140q11 0 18.5 7t7.5 18-7.5 18.5T486 352H346zm140 96q11 0 18.5 7t7.5 18-7.5 18.5T486 499H346q-11 0-18.5-7.5T320 473t7.5-18 18.5-7h140zM192 51q-32 0-54.5 22.5T115 128t22.5 54.5T192 205t54.5-22.5T269 128t-22.5-54.5T192 51z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v5/account";
export { pathData, ltr, accData };