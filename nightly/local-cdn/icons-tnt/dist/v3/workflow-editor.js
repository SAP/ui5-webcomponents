import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "workflow-editor";
const pathData = "M487 102c14 0 25 12 25 26v154c0 14-11 25-25 25H333c-14 0-26-11-26-25v-51h-51c-1 0-8-1-9-2s-2-1-2-1l-3-2h-1l-2-2c-3-3-4-5-5-7 0-1-1-1-2-2-1-3-1-6-1-10V102h-82c-11 30-38 52-72 52-43 0-77-35-77-77S34 0 77 0c34 0 61 22 72 51h82c28 0 51 23 51 51v77h25v-51c0-14 12-26 26-26h154zm-26 154V154H359v102h102zm-205-7c14 0 26 11 26 25 0 15-12 26-26 26s-25-11-25-26c0-14 11-25 25-25zm0 69c14 0 26 12 26 26s-12 25-26 25-25-11-25-25 11-26 25-26zm-146 41c24 0 44 20 44 43v66c0 25-20 44-44 44H44c-24 0-44-19-44-44v-66c0-23 20-43 44-43h66zm149 29c14 2 24 15 22 29-2 16-14 22-29 22-14-2-23-15-21-29 1-14 14-24 28-22zm-61 22c14 0 25 11 25 25 0 15-11 26-25 26s-26-11-26-26c0-14 12-25 26-25z";
const ltr = false;
const accData = null;
const collection = "tnt-v3";
const packageName = "@ui5/webcomponents-icons-tnt";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "tnt-v3/workflow-editor";
export { pathData, ltr, accData };