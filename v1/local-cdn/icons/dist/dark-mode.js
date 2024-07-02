import { isLegacyThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav4, ltr, accData } from "./v4/dark-mode.js";
import { pathData as pathDatav5 } from "./v5/dark-mode.js";

const pathData = isLegacyThemeFamily() ? pathDatav4 : pathDatav5;

export default "dark-mode";
export { pathData, ltr, accData };