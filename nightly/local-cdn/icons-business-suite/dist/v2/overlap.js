import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "overlap";
const pathData = "M403.5 234l24 1c41 0 74 32 74 73v98c0 41-33 74-74 74h-245c-41 0-74-33-74-74v-24h-24c-41 0-74-33-74-74v-98c0-41 33-74 74-74h245c41 0 74 33 74 74v24zm-295 74c0-41 33-74 74-74h172v-24c0-14-11-25-25-25h-245c-14 0-25 11-25 25v98c0 14 11 25 25 25h24v-25zm344 98v-98c0-14-11-24-25-24h-245c-14 0-25 10-25 24v98c0 13 11 25 25 25h245c14 0 25-12 25-25z";
const ltr = false;
const accData = null;
const collection = "business-suite-v2";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v2/overlap";
export { pathData, ltr, accData };