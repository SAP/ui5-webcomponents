import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "female";
const pathData = "M280.5 345h74c14 0 24 11 24 25s-10 25-24 25h-74v73c0 14-11 25-25 25s-24-11-24-25v-73h-74c-14 0-24-11-24-25s10-25 24-25h74v-51c-70-12-123-72-123-145 0-81 66-148 147-148s148 67 148 148c0 73-53 133-123 145v51zm-25-98c54 0 99-44 99-98s-45-98-99-98-98 44-98 98 44 98 98 98z";
const ltr = false;
const accData = null;
const collection = "business-suite-v2";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v2/female";
export { pathData, ltr, accData };