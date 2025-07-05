import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "intranet";
const pathData = "M422.5 511h-313c-43 0-79-35-79-78V221c0-24 10-44 29-60l155-135c15-13 34-20 52-20 19 0 38 7 52 22l156 134c18 19 27 39 27 59v212c0 43-36 78-79 78zm-156-452c-6 0-12 2-17 7l-157 136c-7 6-9 10-9 19v212c0 15 11 26 26 26h313c14 0 26-11 26-26V221c0-2 0-10-10-20l-155-135c-6-5-11-7-17-7zm-1 361c-71 0-129-59-129-130 0-15 2-30 7-43 0-2 0-3 1-5 20-50 68-82 121-82 10 0 19 1 29 3 1 0 3 1 4 1 56 15 98 65 98 126 0 71-60 130-131 130zm-20-130h47c7 0 13 6 13 13v38c18 1 29 11 34 22 19-19 31-45 31-73 0-44-27-81-65-96v18c0 7-6 13-13 13h-40v26c0 7-5 13-13 13h-20zm-18 44l-64-62c0 6-1 12-1 18 0 53 39 96 90 103v-27c-15-5-23-19-25-32z";
const ltr = false;
const accData = null;
const collection = "tnt-v3";
const packageName = "@ui5/webcomponents-icons-tnt";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "tnt-v3/intranet";
export { pathData, ltr, accData };