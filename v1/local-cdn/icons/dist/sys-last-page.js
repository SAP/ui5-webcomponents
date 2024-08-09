import { isLegacyThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav4, ltr, accData } from "./v4/sys-last-page.js";
import { pathData as pathDatav5 } from "./v5/sys-last-page.js";

const pathData = isLegacyThemeFamily() ? pathDatav4 : pathDatav5;

export default "sys-last-page";
export { pathData, ltr, accData };