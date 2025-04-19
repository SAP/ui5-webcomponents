import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "vessel";
const pathData = "M2.017 232c-2-7-1-15 4-23 5-7 12-10 21-10h26v-51c0-15 10-26 25-26h102c15 0 25 11 25 26v51h26c15 0 25 10 25 25h147l16-16c4-6 10-9 19-9h48c9 0 16 3 21 10 5 8 6 16 4 23l-25 73v72c0 15-10 26-25 26h-383c-11 0-22-6-25-17zm60 18l34 102h339v-51c0-1 1-4 2-8l14-43h-2l-15 17c-5 5-12 8-19 8h-184c-15 0-26-10-26-25h-143zm42-51h50v-26h-50v26z";
const ltr = false;
const accData = null;
const collection = "business-suite-v2";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v2/vessel";
export { pathData, ltr, accData };