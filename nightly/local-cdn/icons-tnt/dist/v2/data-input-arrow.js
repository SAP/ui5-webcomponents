import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "data-input-arrow";
const pathData = "M442 253L264 127v75H51v103h213v74zm60-21q10 6 10 21 0 14-10 21L257 447q-8 5-15 5h-1q-12 0-20-6.5t-8-19.5v-70H25q-10 0-17.5-7.5T0 330V176q0-10 7.5-17.5T25 151h188V80q0-11 7.5-18.5T239 54q5 0 10 1.5t8 4.5z";
const ltr = false;
const accData = null;
const collection = "tnt-v2";
const packageName = "@ui5/webcomponents-icons-tnt";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "tnt-v2/data-input-arrow";
export { pathData, ltr, accData };