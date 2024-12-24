import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "data-input-arrow";
const pathData = "M0 350V192c0-5 2-7 7-7h201c5 0 7-2 7-7V69c0-4 2-6 7-6 2 0 3 0 4 1l282 200c3 2 4 4 4 6s-1 4-4 6L226 478c-1 1-3 2-4 2-5 0-7-2-7-7V364c0-5-2-7-7-7H7c-5 0-7-2-7-7zm38-120v82c0 5 2 7 7 7h201c5 0 7 2 7 7v72c0 5 2 7 7 7 1 0 3-1 4-2l177-127c3-2 4-4 4-6s-1-4-4-6L264 138c-1-1-2-1-4-1-5 0-7 2-7 6v73c0 5-2 7-7 7H45c-5 0-7 2-7 7z";
const ltr = false;
const accData = null;
const collection = "tnt-v3";
const packageName = "@ui5/webcomponents-icons-tnt";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "tnt-v3/data-input-arrow";
export { pathData, ltr, accData };