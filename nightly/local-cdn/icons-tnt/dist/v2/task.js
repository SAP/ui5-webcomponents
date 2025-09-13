import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "task";
const pathData = "M458 82q23 0 38.5 16t15.5 38v247q0 23-15.5 37T458 434H54q-23 0-38.5-14T0 383V136q0-22 15.5-38T54 82h404zm22 68q0-15-10.5-25.5T444 114H67q-15 0-25 10.5T32 150v220q0 15 10 23.5t25 8.5h377q15 0 25.5-8.5T480 370V150z";
const ltr = false;
const accData = null;
const collection = "tnt-v2";
const packageName = "@ui5/webcomponents-icons-tnt";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "tnt-v2/task";
export { pathData, ltr, accData };