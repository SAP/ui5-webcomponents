import { isLegacyThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav4, ltr, accData } from "./v4/account.js";
import { pathData as pathDatav5 } from "./v5/account.js";

const pathData = isLegacyThemeFamily() ? pathDatav4 : pathDatav5;

export default "account";
export { pathData, ltr, accData };