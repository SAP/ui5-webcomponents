import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "data-output-arrow";
const pathData = "M0 199q0-5 3.5-8.5T12 187h192q5 0 8.5-4t3.5-9V80q0-5 3.5-8.5T228 68t7 2l272 193q5 4 5 10t-5 10L235 477q-2 2-7 2t-8.5-3.5-3.5-8.5v-94q0-5-3.5-8.5T204 361H12q-5 0-8.5-4T0 348V199z";
const ltr = false;
const accData = null;
const collection = "tnt-v2";
const packageName = "@ui5/webcomponents-icons-tnt";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "tnt-v2/data-output-arrow";
export { pathData, ltr, accData };