import { isLegacyThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav4, ltr, accData } from "./v4/background.js";
import { pathData as pathDatav5 } from "./v5/background.js";

const pathData = isLegacyThemeFamily() ? pathDatav4 : pathDatav5;

export default "background";
export { pathData, ltr, accData };