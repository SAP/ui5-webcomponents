import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "database-consistency";
const pathData = "M487 0c14 0 25 11 25 26v461c0 14-11 25-25 25H26c-15 0-26-11-26-25V26C0 11 11 0 26 0h461zm-26 461V51H51v410h410zM187 297c-11-10-11-25 0-36l58-58-58-58c-10-10-10-26 0-36 5-5 12-8 18-8 7 0 13 3 18 8l76 76c10 10 10 26 0 36l-58 58 41 42v-15c0-15 12-26 26-26s25 11 25 26v80c0 14-11 25-25 25h-80c-14 0-26-11-26-25 0-15 12-26 26-26h21l-60-60c0-1 0-1-2-3z";
const ltr = false;
const accData = null;
const collection = "tnt-v3";
const packageName = "@ui5/webcomponents-icons-tnt";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "tnt-v3/database-consistency";
export { pathData, ltr, accData };