import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "cell-lock";
const pathData = "M379.5 183c41 0 75 34 75 74v148c0 42-34 75-75 75h-247c-42 0-75-33-75-75V257c0-40 33-74 75-74v-75c0-68 55-124 123-124s124 56 124 124v75zm-198-75v75h149v-75c0-40-34-74-75-74s-74 34-74 74zm226 266v-83c0-37-31-67-67-67h-169c-38 0-68 30-68 67v83c0 36 30 67 68 67h169c36 0 67-31 67-67z";
const ltr = false;
const accData = null;
const collection = "business-suite-v2";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v2/cell-lock";
export { pathData, ltr, accData };