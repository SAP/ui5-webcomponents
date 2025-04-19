import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "goods";
const pathData = "M124 480c-39 0-71-32-71-71V252c0-31 12-60 35-83l29-29c7-7 7-9 7-16v-6h-24c-13 0-23-8-23-23V24c0-13 10-24 23-24h236c13 0 22 11 22 24v71c0 14-7 22-20 23H171v6c0 17-7 34-21 49l-29 30c-14 12-21 28-21 49v157c0 13 11 24 24 24 18 0 36 0 53-1h156c13 0 23 9 23 24 0 13-10 24-23 24H124zm82-196c0-47 19-100 75-100 12 0 22 2 29 5 0-24 22-44 46-44h2c13 0 22 9 22 21 0 8-3 14-9 19 4 0 8-1 13-1 56 0 75 53 75 100 0 48-28 126-87 126-19 0-31-5-38-10l-1-2-3 2c-7 5-18 10-37 10-59 0-87-78-87-126zm75-56c-27 0-31 36-31 56 0 35 12 54 19 63 11 15 21 19 24 19 8 0 12-1 13-3 7-4 14-10 27-10s21 6 25 9c3 1 6 4 14 4 4 0 15-4 24-19 13-17 19-38 19-63 0-20-4-56-31-56-12 0-16 1-23 9-3 9-21 16-29 16-11 0-21-7-28-14-8-8-11-11-23-11zM120 67h197V45H120v22z";
const ltr = false;
const accData = null;
const collection = "business-suite-v2";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v2/goods";
export { pathData, ltr, accData };