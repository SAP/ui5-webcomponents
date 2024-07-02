import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "vessel";
const pathData = "M507.108 209c4 7 6 15 4 23l-25 73v72c0 14-11 26-25 26h-383c-11 0-22-7-25-17l-51-154c-2-8 0-16 4-23 5-7 13-10 21-10h26v-51c0-14 11-26 25-26h102c14 0 25 12 25 26v51h26c14 0 25 11 25 25h147l16-16c4-6 12-9 19-9h48c9 0 16 3 21 10zm-403-10h50v-26h-50v26zm333 94l14-43h-2l-15 17c-5 5-12 8-19 8h-184c-14 0-26-11-26-25h-143l34 102h339v-51c0-2 1-5 2-8z";
const ltr = false;
const accData = null;
const collection = "business-suite-v2";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v2/vessel";
export { pathData, ltr, accData };